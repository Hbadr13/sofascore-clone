import { IBestPlayersAPIJson } from '@/interface/api/bestPlayers'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { EventAPIJson } from '@/interface/api/event'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'
import { usePlayersStatisticCards } from '@/context/playersStatisticCardsContext'
import { IPlayer } from '@/interface/api/lineups'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Sheet } from 'react-modal-sheet'

interface IIncidentsCompProps {
    event: EventAPIJson | null | MatchDetailsAPIJson
    incidents: IIncidentsAPIJson[]
    setIncidents: (incidents: IIncidentsAPIJson[]) => void
}

interface ITakeOverviewProps {
    event: EventAPIJson | null | MatchDetailsAPIJson
    incidents: IIncidentsAPIJson[]
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    player1: IPlayer
    player2: IPlayer
}

export const TakeOverview = ({ isOpen, setIsOpen, incidents, event, player1, player2 }: ITakeOverviewProps) => {
    const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()
    const [windowWidth, setWindowWidth] = useState(window?.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    const closeModal = () => setIsOpen(false);

    const handleDisplayPlayerStatis = ({ e, player, type }: { e: any, player: IPlayer, type: string }) => {
        if (!event)
            return
        const subTime = incidents.find((itm) => itm?.playerOut?.id == player1.id)?.time
        e.preventDefault();

        const playerSub = type == 'on' ? incidents.find((itm) => itm?.playerIn?.id == player.id)?.playerOut : incidents.find((itm) => itm?.playerOut?.id == player.id)?.playerIn
        setPlayersOverview((prev: any[]) => {
            if (prev.find((item) => item.player.id == player.id && item.event.id == event.id))
                return [...prev]
            return [...prev, {
                player, event, playerSub, subTime, subType: type == 'on' ? 'Substituted off by:' : 'Substituted on by:'
            }]
        });
        setIsOpen(false)
    };

    return (
        windowWidth < 992 ? (
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content className='px-6 pb-10 font-light'>
                        <div className='flex flex-col space-y-4'>
                            <Link
                                onClick={(e) => handleDisplayPlayerStatis({ e, player: player2, type: 'on' })}
                                href={`/ma/player/${player2.slug}/${player2.id}`}
                                className="">
                                {player2?.name}
                            </Link>
                            <Link
                                onClick={(e) => handleDisplayPlayerStatis({ e, player: player1, type: 'of' })}
                                href={`/ma/player/${player1.slug}/${player1.id}`}
                                className="">
                                {player1?.name}
                            </Link>
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>

        ) :
            (<Modal
                backdrop='opaque'
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement="top-center"
            >
                <ModalContent className='w-[350px]'>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody className='p-4  text-on-surface-nLv1 whitespace-nowrap'>
                                <Link
                                    onClick={(e) => handleDisplayPlayerStatis({ e: e, player: player2, type: 'on' })} href={`/ma/player/${player2.slug}/${player2.id}`}
                                    className="">
                                    {player2?.name}
                                </Link>
                                <Link
                                    onClick={(e) => handleDisplayPlayerStatis({ e: e, player: player1, type: 'of' })} href={`/ma/player/${player1.slug}/${player1.id}`}
                                    className="">
                                    {player1?.name}
                                </Link>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={closeModal}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>)
    );
}

const IncidentsComp = ({ event, incidents, setIncidents }: IIncidentsCompProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [player1, setPlayer1] = useState<IPlayer | null>(null);
    const [player2, setPlayer2] = useState<IPlayer | null>(null);
    const openModal = () => setIsOpen(true);

    const [bestPlayers, setbestPlayers] = useState<IBestPlayersAPIJson>({ bestAwayTeamPlayers: [], bestHomeTeamPlayers: [] })
    const [waitBestPlayers, setwaitBestPlayers] = useState('wait')
    const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()

    const handleDisplayPlayerStatis = ({ e, player }: { e: any, player: IPlayer }) => {
        if (!event)
            return
        e.preventDefault();

        const subTime = incidents.find((itm) => itm?.playerOut?.id == player.id)?.time
        const playerSub = incidents.find((itm) => itm?.playerOut?.id == player.id)?.playerIn
        setPlayersOverview((prev: any[]) => {
            if (prev.find((item) => item.player.id == player.id && item.event.id == event.id))
                return [...prev]
            return [...prev, { player, event, playerSub, subTime, subType: 'Substituted on by:' }]
        });
    };

    useEffect(() => {
        const getTheIncidents = async () => {
            try {
                if (!event)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${event.id}/incidents`, {})
                if (response.ok) {
                    const data = await response.json()
                    setIncidents(data.incidents)
                }
            } catch (error) {
                setIncidents([])
            }
        }
        const getTheBestPlayersSummary = async () => {
            try {
                if (!event)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${event.id}/best-players/summary`, {})
                if (response.ok) {
                    const data = await response.json()
                    setwaitBestPlayers('done')
                    setbestPlayers(data)
                }
            } catch (error) {
                setwaitBestPlayers('error')

            }
        }
        getTheIncidents()
        getTheBestPlayersSummary()
    }, [event, setIncidents])

    return (
        <div>
            {
                event && event.status.description != 'Not started' &&
                <div className=" h-[150px] w-full overflow-hidden  mt-3">
                    <iframe
                        className='border-0 scale-105'
                        width="100%"
                        height="286"
                        src={`https://widgets.sofascore.com/en-US/embed/attackMomentum?id=${event.id}&widgetTheme=light`}
                        scrolling="no"
                    />
                </div>
            }
            <div hidden={waitBestPlayers == 'error'} className="w-full bg-slate-200/40  mt-3">
                <div className="text-center font-semibold rounded-2xl p-2">Highest Rated Players</div>
                {waitBestPlayers == 'wait' && <div className=' w-full h-40 ' />}
                <div className="w-full flex p-2 space-x-3">
                    <div className=" space-y-2 w-1/2">
                        {
                            bestPlayers.bestHomeTeamPlayers.map((player, index) => <Link
                                onClick={(e) => handleDisplayPlayerStatis({ e: e, player: (player.player as IPlayer) })}
                                href={`/ma/player/${player.player.slug}/${player.player.id}`}
                                key={index}
                                className='flex bg-slate-200/50 hover:bg-slate-50 p-1 rounded-[4px] items-center justify-between space-x-1'>
                                <div className="flex items-center space-x-1">
                                    <div className="w-7 h-7 rounded-full">
                                        <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`} width={400} height={400} alt={`player${player.player.shortName}`} />
                                    </div>
                                    <div className=" text-sm   whitespace-pre-line opacity-80 w-full">{player.player.name}</div>
                                </div>
                                <div className=" scale-90">
                                    <DisplayRating rating={player.value} type='in' />
                                </div>

                            </Link>
                            )
                        }
                    </div>
                    <div className=" space-y-2 w-1/2">
                        {
                            bestPlayers.bestAwayTeamPlayers.map((player, index) => <Link
                                onClick={(e) => handleDisplayPlayerStatis({ e: e, player: (player.player as IPlayer) })} href={`/ma/player/${player.player.slug}/${player.player.id}`}
                                key={index}
                                className='flex hover:bg-slate-50 bg-slate-200/50  p-1 rounded-[4px] items-center justify-between space-x-1'>
                                <div className="flex items-center space-x-1">
                                    <div className="w-7 h-7 rounded-full">
                                        <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`} width={400} height={400} alt={`player${player.player.shortName}`} />
                                    </div>
                                    <div className=" text-sm  whitespace-pre-line w-full opacity-80">{player.player.name}</div>
                                </div>
                                <div className=" scale-90">
                                    <DisplayRating rating={player.value} type='in' />
                                </div>
                            </Link>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="">
                {
                    incidents.map((incident, index) =>
                        <div
                            className=''
                            key={index}
                        >
                            {incident.incidentType == 'period' && <div className=" w-full text-center bg-slate-200/40 p-1 my-2 rounded-xl font-semibold">{incident.text} {incident.homeScore} - {incident.awayScore}</div>}
                            {incident.incidentType == 'injuryTime' && incident.length != 0 && <div className="w-full text-center text-sm opacity-80 p-1 my-2 rounded-xl font-semibold" >Additional time {incident.length}{`'`}</div>}
                            {incident.time < 0 && incident.length != 0 && <div className="w-full text-center bg-slate-200/40 p-1 my-2 rounded-xl font-semibold  text-gray-400" >On Bench</div>}
                            {
                                incident.incidentType == 'card' && incident.player &&
                                <Link
                                    onClick={(e) => handleDisplayPlayerStatis({ e: e, player: (incident.player as IPlayer) })} href={`/ma/player/${incident.player.slug}/${incident.player.id}`}
                                    className={`hover:bg-slate-200/30 rounded-xl w-full p-1 my-2  space-x-3 flex items-center ${incident.isHome ? 'flex-row' : ' flex-row-reverse'} text-[14px]`} >
                                    <div className={`w-5 h-6 ${incident.incidentClass == 'red' ? 'bg-red-500' : 'bg-yellow-500/50'}  rounded-[2px]`} />

                                    <div className="flex items-start opacity-50 w-9">
                                        <div className="">
                                            {incident.time >= 0 ? `${incident.time}'` : '-'}
                                        </div>
                                        {
                                            incident.addedTime && <div className="text-[8px]">
                                                +{incident.addedTime}
                                            </div>
                                        }
                                    </div>
                                    <div className={`flex ${incident.isHome ? 'border-l-1' : 'justify-end border-r-1'} w-full space-x-2  p-1`}>
                                        <div className=" opacity-40">{incident.reason}</div>
                                        <div className="">{incident.player ? incident.player.shortName : incident.manager ? incident.manager.name : ''}</div>
                                    </div>
                                </Link>
                            }
                            {
                                incident.incidentType == 'substitution' &&
                                <button
                                    onClick={() => { setPlayer1(incident.playerOut), setPlayer2(incident.playerIn), openModal() }}
                                    className={`hover:bg-slate-200/30 rounded-xl w-full p-1 my-2  space-x-3 flex items-center ${incident.isHome ? 'flex-row' : ' flex-row-reverse'} text-[14px]`} >
                                    <div className="w-5 h-4">
                                        <Image src={'/image/repost.png'} alt='repost' width={400} height={400} />
                                    </div>
                                    <div className="flex items-start opacity-50 w-9">
                                        <div className="">
                                            {incident.time >= 0 ? `${incident.time}'` : '-'}
                                        </div>
                                        {
                                            incident.addedTime && <div className="text-[8px]">
                                                +{incident.addedTime}
                                            </div>
                                        }
                                    </div>
                                    <div className={`flex ${incident.isHome ? 'border-l-1' : 'justify-end border-r-1'} w-full space-x-2  p-1`}>
                                        <div className=" opacity-40">Out : {incident.playerOut.shortName}</div>
                                        <div className="">In : {incident.playerIn.shortName}</div>
                                    </div>
                                </button>
                            }
                            {
                                incident.incidentType == 'goal' &&
                                <button
                                    onClick={() => { setPlayer1(incident.player), setPlayer2(incident.assist1), openModal() }}
                                    className={`hover:bg-slate-200/30 rounded-xl w-full p-1 my-2  space-x-3 flex items-center ${incident.isHome ? 'flex-row' : ' flex-row-reverse'} text-[14px]`} >
                                    <div className="w-5 h-4">
                                        <Image src={'/image/ball.svg'} alt='ball' width={400} height={400} />
                                    </div>
                                    <div className="flex items-start opacity-50 w-9">
                                        <div className="">
                                            {incident.time >= 0 ? `${incident.time}'` : '-'}
                                        </div>
                                        {
                                            incident.addedTime && <div className="text-[8px]">
                                                +{incident.addedTime}
                                            </div>
                                        }
                                    </div>
                                    <div className={`flex items-center ${incident.isHome ? 'border-l-1' : 'justify-end border-r-1'} w-full space-x-2  p-1`}>
                                        <div className=""><span className=' font-semibold text-[16px]'>{incident.homeScore} - {incident.awayScore}</span> {incident.player.shortName}</div>
                                        {incident.assist1 && <div className=" opacity-40">Assist : {incident.assist1?.shortName}</div>}
                                    </div>
                                </button>
                            }
                        </div>
                    )
                }
            </div>
            {
                player1 && player2 && <TakeOverview incidents={incidents} event={event} player1={player1} player2={player2} isOpen={isOpen} setIsOpen={setIsOpen} />
            }

        </div>
    )
}

export default IncidentsComp