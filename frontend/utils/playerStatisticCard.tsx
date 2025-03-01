'use client'
import { EventAPIJson } from '@/interface/api/event';
import { Card } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import SvgIcons from './svgIcons';
import Image from 'next/image';
import DisplayImage from './displayImage';
import DisplayRating from './displayRating';
import Link from 'next/link';
import moment from 'moment';
import { CustomScroll } from 'react-custom-scroll';
import { IPlayer } from '@/interface/api/lineups';
import { usePlayersStatisticCards } from '@/context/playersStatisticCardsContext';
import { Sheet } from 'react-modal-sheet';
import { useWindowAttributes } from '@/context/windowAttributes';
interface ICardLayoutProps {
    index: number
    user: { player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }
    animatedOut: boolean
    windowWidth: number
    length: number
}

const CardLayout = ({ length, user, index, animatedOut, windowWidth }: ICardLayoutProps) => {
    const [close, setClose] = useState('display')
    const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()

    const [rating, setRaintg] = useState('')
    const [playerStatis, setPlayerStatis] = useState<{ [typeName: string]: { [statisName: string]: string | number } } | null>(null)
    const [isOpen, setOpen] = useState(!false);

    const handelRemovePlayer = () => {
        setTimeout(() => {
            setPlayersOverview(playersOverview.filter((_user) => !(_user.player.id == user.player.id && _user.event.id == user.event.id)))
        }, 300);
        setClose((prv) => prv == 'display' ? 'hide' : 'hideFromHlaf')
    }
    const handelDisplayPlayer = ({ e }: { e: any }) => {
        e.preventDefault();
        setPlayersOverview((prev: any[]) => {
            if (prev.find((item) => item.playerSub?.id == user.player.id && item.event.id == user.event.id)) {
                return [...prev];
            }
            return [
                ...prev,
                {
                    player: user.playerSub,
                    event: user.event,
                    playerSub: user.player,
                    subTime: user.subTime,
                    subType: user.subType === 'Substitutedoff by:' ? 'Substituted on for:' : 'Substitutedoff by:'
                }
            ];
        });
    };
    useEffect(() => {
        const getTheStatis = async () => {
            try {
                const resposne = await fetch(`https://sofascore.com/api/v1/event/${user.event.id}/player/${user.player.id}/statistics`, {})
                if (resposne.ok) {
                    const data = await resposne.json()
                    const playerStatistics: { [typeName: string]: { [statisName: string]: string | number } } =
                    {
                        "1": {
                            "Minutes played": `${(data.statistics.minutesPlayed || 0)}'`,
                            "Goals": (data.statistics.goals || 0),
                            "Expected Goals (xG)": Number((data.statistics.expectedGoals || 0)).toFixed(2),
                            "Assists": (data.statistics.goalAssist || 0),
                            "Expected Assists (xA)": Number((data.statistics.expectedAssists || 0)).toFixed(2),
                        },
                        '2': {
                            "Shots on target": (data.statistics.onTargetScoringAttempt || 0),
                            "Shots off target": (data.statistics.shotOffTarget || 0),
                            "Shots blocked": (data.statistics.outfielderBlock || 0),
                            "Dribble attempts (succ.)": `${(data.statistics.totalContest || 0)} (${(data.statistics.wonContest || 0)})`,
                        },
                        '3': {
                            "Touches": (data.statistics.touches || 0),
                            "Accurate passes": `${(data.statistics.accuratePass || 0)}/${(data.statistics.totalPass || 0)} (${(((data.statistics.accuratePass || 0) / (data.statistics.totalPass || 1)) * 100).toFixed(0)}%)`,
                            "Key passes": (data.statistics.keyPass || 0),
                            "Crosses (acc.)": `${(data.statistics.totalCross || 0)} (${(data.statistics.accurateCross || 0)})`,
                            "Long balls (acc.)": `${data.statistics.totalLongBalls} (${data.statistics.accurateLongBalls})`,
                        },
                        '4': {
                            "Ground duels (won)": `${(data.statistics.duelLost || 0) + (data.statistics.duelWon || 0)} (${(data.statistics.duelWon || 0)})`,
                            "Aerial duels (won)": `${(data.statistics.aerialLost || 0) + (data.statistics.aerialWon || 0)} (${(data.statistics.aerialWon || 0)})`,
                            "Possession lost": (data.statistics.possessionLostCtrl || 0),
                            "Was fouled": (data.statistics.wasFouled || 0),
                            "Fouls": (data.statistics.fouls || 0),
                        },
                        '5': {
                            "Clearances": `${(data.statistics.duelWon || 0)}`,
                            "Blocked shots": `${(data.statistics.duelWon || 0)}`,
                            "Interceptions": `${(data.statistics.interceptionWon || 0)}`,
                            "Total tackles": (data.statistics.totalTackle || 0),
                        },

                    };
                    setRaintg(data.statistics.ratingVersions?.original)
                    setPlayerStatis(playerStatistics)

                }
            } catch (error) {

            }
        }
        getTheStatis()
    }, [])



    const CardContante = ({ type }: { type: string }) => <div className='' >
        <div className='flex justify-between items-start border-b-1 p-2'>
            <div className="flex items-center space-x-2">
                <Link href={`/ma/player/${user.player.slug}/${user.player.id}`}>
                    <DisplayImage onErrorImage='player' width={1000} height={1000} className='rounded-full border-1 border-slate-300 w-14 h-14' alt='player' src={`https://api.sofascore.app/api/v1/player/${user.player.id}/image`} />
                </Link>
                <div>
                    <Link href={`/ma/player/${user.player.slug}/${user.player.id}`} className='truncate hover:text-primary-600 font-semibold'>{user.player.name}</Link>
                    <div className="flex items-center scale- space-x-1">
                        <div className="scale-85">
                            <DisplayRating rating={rating} type='in' />
                        </div>
                        <div className="text-xs">Sofascore Rating</div>
                    </div>
                </div>
            </div>
            {type != 'mobil' && <div className="flex  h-full">
                <button className=" h-7 w-7 flex justify-center items-center hover:bg-blue-100 rounded-lg  transition-colors duration-100" onClick={() => setClose((prv) => prv == 'half' ? 'displayFromHlaf' : 'half')}>
                    {close == 'half' ? <SvgIcons iconName='expand' /> : <SvgIcons iconName='-' />}
                </button>
                <button className=" h-7 w-7 flex justify-center items-center  hover:bg-blue-100 rounded-lg  transition-colors duration-200" onClick={handelRemovePlayer}>
                    <SvgIcons iconName='x' />
                </button>
            </div>}
        </div>

        <CustomScroll className='w-full' allowOuterScroll={true} heightRelativeToParent="100%" >
            <div className=" h-[500px]">
                <div className=" border-b-1 ">
                    <div className="flex justify-between items-center py-2 px-3">
                        <Link href={`/ma/${user.event.slug}/${user.event.customId}#id:${user.event.id}`} className="text-sm font-semibold truncate hover:text-primary-600">
                            <div  >
                                {user.event.homeTeam.shortName} {user.event.homeScore.display} - {user.event.awayScore.display} {user.event.awayTeam.shortName}
                            </div>
                        </Link>
                        <div className="truncate  text-xs">{moment(user.event.startTimestamp * 1000).format('ll')}</div>
                    </div>
                    {user.playerSub && <Link
                        onClick={(e) => handelDisplayPlayer({ e: e })}
                        href={`/ma/player/${user.playerSub.slug}/${user.playerSub.id}`} className='w-full border-b-1 hover:bg-surface-s2 flex justify-between px-3 '>
                        <div className="flex items-center space-x-2">
                            <div className="h-full flex justify-center items-center flex-col">
                                <Image width={400} height={400} className="rounded-full w-5 h-5" src={`/image/repost.png`} alt="" />
                                <div className="text-sm">{user.subTime}'</div>
                            </div>
                            <div className="">
                                <div className="text-on-surface-nLv3 text-sm">
                                    {user.subType}
                                </div>
                                <div className="h-full text-md">
                                    {user.playerSub?.name}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <DisplayImage onErrorImage='player' width={1000} height={1000} className='rounded-full border-1 border-slate-300 w-10 h-10' alt='player' src={`https://api.sofascore.app/api/v1/player/${user.playerSub.id}/image`} />
                        </div>
                    </Link>
                    }
                    <div className="flex justify-center items-center bg-[#cbedbf] ">
                        <div className="p-2 ">
                            <DisplayImage
                                width={2000}
                                height={2000}
                                className=" h-40 object-contain rounded-xl"
                                src="/image/map-sofascore.jpeg"
                                alt=""
                            />
                        </div>
                    </div>

                </div>
                {playerStatis &&
                    Object.entries(playerStatis).map(([typeName, index], _index) => (
                        <div key={_index} className='border-b-1 px-4 py-2'>

                            {Object.getOwnPropertyDescriptor(playerStatis, typeName) && Object.entries(Object.getOwnPropertyDescriptor(playerStatis, typeName)?.value).map(([statisName, value], index) =>
                                <div key={index} className='w-full flex justify-between text-sm leading-8'>
                                    <div className="">
                                        {statisName}
                                    </div>
                                    <div className="">
                                        {(value as string)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </CustomScroll>

    </div>
    return (

        windowWidth < 992 ? (
            <Sheet
                isOpen={isOpen}
                onClose={() => {
                    setPlayersOverview(playersOverview.filter((_user) => !(_user.player.id == user.player.id && _user.event.id == user.event.id)))
                    setOpen(false)
                }}
                snapPoints={[750, 600, 450, 150]}
                initialSnap={index}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <CardContante type='mobil' />
                    </Sheet.Content>
                </Sheet.Container>
                {/* <Sheet.Backdrop ={() => {
                    setPlayersOverview(playersOverview.filter((_user) => !(_user.player.id == user.player.id && _user.event.id == user.event.id)))
                    setOpen(false)
                }} /> */}
            </Sheet >) :
            (<Card className={` mx-2 z-50 relative  bg-white  ${close == 'hide' || animatedOut ? ' disappear ' : close == 'half' ? ' halfDisappear ' : close == 'hideFromHlaf' ? 'hideFromHlaf' : close == 'displayFromHlaf' ? 'displayFromHlaf' : 'expand'}`} key={user.player.id}>
                <CardContante type='' />
            </Card>)
    );
};


interface IPlayerStatisticCardProps {
    playersOverview: Array<{ player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }>
    setPlayersOverview: (playersOverview: Array<{ player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }>) => void
}

const PlayerStatisticCard = () => {

    const { windowAttributes, setWindowAttributes } = useWindowAttributes()
    useEffect(() => {
        setWindowAttributes({ width: window.innerWidth, height: window.innerHeight })
        const handleResize = () => {
            setWindowAttributes({ width: window.innerWidth, height: window.innerHeight })
        }
        addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()
    const [animatedOut, setAnimatedOut] = useState<string | null>(null);

    useEffect(() => {

        const handleRemove = (playerId: number, eventId: number) => {
            setAnimatedOut(`${playerId}:${eventId}`);
            setTimeout(() => {
                setPlayersOverview(prev => prev.filter(user => user.player.id !== playerId && user.event.id == eventId));
                setAnimatedOut(null);
            }, 300);
        };

        if (playersOverview.length > 3)
            handleRemove(playersOverview[0].player.id, playersOverview[0].event.id)
    }, [playersOverview])

    return (
        <div className='w-full flex justify-end'>
            <div style={{ alignItems: 'end', }} className='  fixed flex   flex-row-reverse bottom-0  z-30'
            >
                {playersOverview.reverse().map((user, index) => (

                    <CardLayout
                        length={playersOverview.length}
                        windowWidth={windowAttributes.width}
                        user={user}
                        index={index}
                        key={`${user.player.id}:${user.event.id}`}
                        animatedOut={animatedOut == `${user.player.id}:${user.event.id}`}
                    />
                ))}
            </div>
        </div >
    );
};



export default PlayerStatisticCard