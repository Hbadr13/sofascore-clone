import React, { ReactNode, useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { EventAPIJson } from '@/interface/api/event'
import { LeagueInfoAPIJson } from '@/interface/api/LeagueInfo'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, CircularProgress } from "@nextui-org/react";
import { _IPlyer, AllPlayersAPIJson } from '@/interface/api/allPlayers'
import { CustomScroll } from 'react-custom-scroll'
import { red } from '@mui/material/colors'
import { ITeamTransfersAPIJson } from '@/interface/api/TeamTransfers'
import { ITransferHistoryAPIJson } from '@/interface/api/transferHistory'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'

interface LeagueInfoProps {
    tournamentId: number
    featuredEvent: EventAPIJson | undefined
    seasonId: string | null
}

interface ITeamStatsItemAndLatestTransfersProps {
    type: string,
    players?: _IPlyer[],
    transfer?: ITransferHistoryAPIJson[],
    modalHeaderName?: string,
    handelClick: boolean,
    name: string,
    value: number,
    comp?: ReactNode
}

const TeamStatsItemAndLatestTransfers = ({ type, players, transfer, handelClick, name, value, comp, modalHeaderName }: ITeamStatsItemAndLatestTransfersProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);



    return (
        <div className='w-[130px] '>
            {type == 'TeamStatsItem' ? <div className='flex flex-col items-center  text-sm font-medium  -space-y-1 '>
                <div className="">{comp}</div>
                {
                    !handelClick ? <div>{value}</div> :
                        <button onClick={openModal} className="text-blue-600 flex items-center space-x-1">
                            <div className="">
                                {value}
                            </div>
                            <SvgIcons iconName='information' color={'blue'} />
                        </button>
                }
                <div className=" text-on-surface-nLv3 text-xs">{name}</div>
            </div> :
                <div className='w-full'>
                    <button onClick={openModal} className={`flex space-x-1 items-center ${name == 'Arrivals' ? 'text-green-600' : 'text-red-500'}`}>
                        <div className="">
                            {name}
                        </div>
                        <SvgIcons iconName='information' color={name == 'Arrivals' ? 'green' : 'red'} />
                    </button>
                    <div className=" truncate">
                        {
                            transfer?.slice(0, 3).map((player, index) =>
                                <div key={index} className="">{player.player.name}</div>
                            )
                        }
                    </div>
                </div >
            }
            <Modal
                backdrop='opaque'
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement="top-center"
                // scrollBehavior='inside'
                className=' overflow-y-hidden'
            >
                <ModalContent className='w-[400px]'>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalHeaderName}</ModalHeader>
                            <ModalBody className='p-0'>
                                {type == 'TeamStatsItem' ?
                                    <div style={{ height: `${!players ? 140 : players.length * 80 > 700 ? 700 : players.length * 80}px` }} className=" divide-y-1.5   hideScroll overflow-scroll">
                                        <CustomScroll allowOuterScroll={true} heightRelativeToParent="100%" className=''>
                                            <div className="p-5">
                                                {players?.map((player, index) =>
                                                    <Link key={index} href={`/ma/player/${player.player.slug}/${player.player.id}`} className='py-2 flex justify-between items-center'>
                                                        <div className="flex space-x-4">
                                                            <DisplayImage onErrorImage='player' className='w-11 h-11 rounded-full border-1.5' src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`} width={500} height={500} alt='player' />
                                                            <div className="">{player.player.name}</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <DisplayImage onErrorImage='flag' className='w-5 h-5' src={`https://api.sofascore.app/static/images/flags/${player.player.country.alpha2.toLowerCase()}.png`} width={500} height={500} alt='player' />
                                                            <div className="text-on-surface-nLv2">{player.player.country.alpha2}</div>
                                                        </div>
                                                    </Link>)}
                                            </div>
                                        </CustomScroll>
                                    </div> :
                                    <div style={{ height: `${!transfer ? 140 : transfer.length * 80 > 700 ? 700 : transfer.length * 80}px` }} className=" divide-y-1.5   hideScroll overflow-scroll">
                                        <CustomScroll allowOuterScroll={true} heightRelativeToParent="100%" className=''>
                                            <div className="p-5">
                                                {transfer?.map((player, index) =>
                                                    <Link key={index} href={`/ma/player/${player.player.slug}/${player.player.id}`} className='py-2 flex justify-between items-center'>
                                                        <div className="flex space-x-4">
                                                            <DisplayImage onErrorImage='player' className='w-11 h-11 rounded-full border-1.5' src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`} width={500} height={500} alt='player' />
                                                            <div className="">
                                                                <div className="">{player.player.name}</div>
                                                                <div className="flex items-center space-x-1">
                                                                    <div className="text-on-surface-nLv2 text-xs ">
                                                                        {player.type == 1 ? 'End of loan' : player.type == 2 ? 'Loan' : player.type == 3 ? 'Transfer' : ''}
                                                                    </div>
                                                                    <div className="text-green-400">
                                                                        {player.transferFee ? `${player.transferFee / 100000}M €` : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            player.transferTo && player.transferFrom && <div className=" relative   ">
                                                                <div className="w-full flex justify-end">
                                                                    <DisplayImage onErrorImage='team' className='w-5 h-5 ' src={`https://sofascore.com/api/v1/team/${name == 'Arrivals' ? player.transferFrom.id : player.transferTo.id}/image`} width={500} height={500} alt='player' />
                                                                </div>
                                                                <div className="w-full flex justify-end">
                                                                    <div className="text-on-surface-nLv2 text-xs truncate relative right-0">{moment(player.transferDateTimestamp * 1000).format('MMM D YY')}</div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </Link>)}
                                            </div>
                                        </CustomScroll>
                                    </div>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={closeModal}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}


interface ITeamInfoProps {
    allPlayers: AllPlayersAPIJson | null
    team: ITeamAPIJson | null
}
const TeamInfo = ({ team, allPlayers }: ITeamInfoProps) => {
    const [waitdata, setWaitdata] = React.useState(true);
    const [transfers, setTransfers] = useState<ITeamTransfersAPIJson | null>(null);
    useEffect(() => {
        const getTeamTransfers = async () => {
            try {
                if (!team)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/transfers`, {})
                if (response.ok) {
                    const data = await response.json()
                    setTransfers(data)
                }
            } catch (error) {

            }
        }
        getTeamTransfers()
    }, [team])
    if (!team || !allPlayers)
        return <div className="w-full h-20  bg-white animate-pulse "></div>
    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl flex flex-col">
            {
            }
            <div className="w-full text-center text-lg font-semibold  py-4  border-b-1 ">Team info</div>
            <div className="flex-1 flex  flex-col tablet:flex-row  bg-red-40 rounded-2xl   w-full ">
                <div className=" w-full target:w-1/2  h-full border-r-1 ">
                    <div className="p-2">
                        <div className=" space-y-5 p-3 w-full  bg-surface-s2 rounded-xl">
                            <div className="flex justify-around">
                                <TeamStatsItemAndLatestTransfers
                                    type='TeamStatsItem'
                                    handelClick={false}
                                    name='Total players'
                                    value={allPlayers.players.length}
                                    comp={<SvgIcons iconName='friends' width='44' height='44' />} />
                                <TeamStatsItemAndLatestTransfers
                                    type='TeamStatsItem'
                                    handelClick={false}
                                    name='Average player age'
                                    value={Math.ceil((allPlayers.players.reduce((a, b) => a + (new Date().getFullYear() - new Date(b.player.dateOfBirthTimestamp * 1000).getFullYear()), 0) / allPlayers.players.length) * 10) / 10}
                                    comp={<SvgIcons iconName='rect1' width='44' height='44' />} />
                            </div>
                            {
                                team.category.name != 'International' && <div className="flex justify-around">
                                    <TeamStatsItemAndLatestTransfers
                                        type='TeamStatsItem'
                                        handelClick={true}
                                        modalHeaderName={'Foreign players'}
                                        players={allPlayers.foreignPlayers}
                                        name='Foreign players'
                                        value={allPlayers.foreignPlayers.length}
                                        comp={
                                            <CircularProgress
                                                size="lg"
                                                value={(allPlayers.foreignPlayers.length / allPlayers.players.length) * 100}
                                                color='primary'
                                            />} />
                                    <TeamStatsItemAndLatestTransfers
                                        type='TeamStatsItem'
                                        handelClick={true}
                                        modalHeaderName={'National team players'}
                                        players={allPlayers.nationalPlayers}
                                        name='Total players'
                                        value={allPlayers.nationalPlayers.length}
                                        comp={
                                            <CircularProgress
                                                size="lg"
                                                value={(allPlayers.nationalPlayers.length / allPlayers.players.length) * 100}
                                                color='primary'
                                            />} />
                                </div>
                            }
                        </div>
                    </div>
                    <div className=" border-b-1 p-3 space-y-3  border-t-1">
                        <div className="text-xl font-semibold">Info</div>
                        <div className="flex items-center justify-between text-sm space-y-3">
                            <div className=" space-y-2">
                                <div className="">
                                    Coach
                                </div>
                                <div className="">
                                    Foundation date
                                </div>
                                <div className="">
                                    Country
                                </div>
                            </div>
                            <div className="text-end space-y-2">
                                <div className="">
                                    {team.manager.name}
                                </div>
                                <div className="">
                                    {moment(team.foundationDateTimestamp * 1000).format('ll')}
                                </div>
                                <div className="flex justify-end items-center space-x-1">
                                    <DisplayImage onErrorImage='flag' className='w-5 h-5' alt='' src={`https://api.sofascore.app/static/images/flags/${team.tournament.category.alpha2?.toLowerCase()}.png`} width={500} height={500} />
                                    <div className="">
                                        {team?.venue?.country.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b-1  p-3 space-y-3">
                        <div className="text-xl font-semibold mt-3 space-y-3">Venue</div>
                        <div className="flex items-center justify-between text-sm">
                            <div className=" space-y-2">
                                <div className="">
                                    Stadium
                                </div>
                                <div className="">
                                    Capacity
                                </div>
                                <div className="">
                                    City
                                </div>
                            </div>
                            <div className="text-end space-y-2">
                                <div className="">
                                    {team.venue.stadium.name}
                                </div>
                                <div className="">
                                    {team.venue.stadium.capacity}
                                </div>
                                <div className="flex justify-end items-center space-x-1">
                                    {team?.venue?.country.name},{team?.venue?.city.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {transfers && <div className="w-full target:w-1/2  h-full ">
                    <div className="border-b-1 p-4 ">
                        <div className="font-semibold">Latest transfers</div>
                        <div className="flex w-full  justify-around">
                            <TeamStatsItemAndLatestTransfers
                                transfer={transfers.transfersIn}
                                type='LatestTransfers'
                                name='Arrivals'
                                modalHeaderName='Latest arrivals'
                                comp={<SvgIcons iconName='friends' width='44' height='44' />}
                                handelClick={false}
                                value={0} />
                            <TeamStatsItemAndLatestTransfers
                                transfer={transfers.transfersOut}
                                type='LatestTransfers'
                                name='departures'
                                modalHeaderName='Latest departures'
                                comp={<SvgIcons iconName='friends' width='44' height='44' />}
                                handelClick={false} value={0} />

                        </div>
                    </div>
                </div>}
            </div>
        </div >
    )
}

export default TeamInfo