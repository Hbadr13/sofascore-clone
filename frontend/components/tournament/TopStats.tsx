import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import Shimmer_topPlayer from '../shimmer/shi2_topPlayer'
import { CustomScroll } from 'react-custom-scroll'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { addSpaceBeforeUppercase } from '@/utils/function'
import { EventAPIJson } from '@/interface/api/event'
import DisplayRating from '@/utils/displayRating'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'
import DisplayImage from '@/utils/displayImage'
interface TopStatsProps {
    tournamentId: number
    featuredEvent: EventAPIJson | null
    seasonId: string | null
}

const TopStats = ({ featuredEvent, seasonId, tournamentId }: TopStatsProps) => {
    const [topPlayersKeys, setTopPlayersKeys] = useState<Array<string>>([])

    const [waitdata, setWaitdata] = useState('wait')
    const [topPlayers, settopPlayers] = useState()
    const [topPlayersFilter, settopPlayersFilter] = useState<string>('rating')
    useEffect(() => {
        const getTopStats = async () => {
            try {
                if (!featuredEvent)
                    return
                let api = ''
                api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/top-players-per-game/all/overall`
                const response = await fetch(api, {})

                if (response.ok) {
                    const data = await response.json()
                    settopPlayers(data.topPlayers)
                    const keys = Object.keys(data.topPlayers).map((item: string, index: number) => item);
                    setTopPlayersKeys(keys)
                    setWaitdata('done')
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getTopStats()
    }, [featuredEvent])

    if (waitdata == 'error')
        return <div />
    return (
        <div className="MYDeg  w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
            <div className="border-b-[1px] border-gray-300 pb-4">
                <div className=" text-slate-800 p-3 ">
                    <p className=" text-[20px] font-[500]">Top stats</p>
                </div>
                <div className="pl-10">
                    <div className="pl-10">
                        <CustomDropdown
                            buttonStyle=' w-44'
                            buttonContent={
                                <div className="  w-28 truncate ">
                                    {addSpaceBeforeUppercase(topPlayersFilter)}
                                </div>
                            }
                            CustomDropdownContent={
                                topPlayersKeys.map((item, index) => (
                                    <button key={index} onClick={() => { settopPlayersFilter(item) }} className={`  ${topPlayersFilter == item ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
                                        <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
                                            {addSpaceBeforeUppercase(item)}
                                        </div>
                                        {
                                            topPlayersFilter == item &&
                                            <div className="w-[20px] h-[20px] ">
                                                <SvgIcons iconName='OKy' />
                                            </div>
                                        }
                                    </button>
                                ))
                            } />
                    </div>
                </div>
            </div>
            <div className="">
                <div className={`w-full flex   text-gray-400 font-extralight justify-between items-center p-2 `}>
                    <div className=" flex flex-col justify-center ">
                        #
                    </div>
                    <div className="pr-3  truncate capitalize">
                        {addSpaceBeforeUppercase(topPlayersFilter)}
                    </div>
                </div>
                {
                    topPlayers && Object.getOwnPropertyDescriptor(topPlayers, topPlayersFilter)?.value?.map((item: any, index: number) =>
                        <div key={index} >
                            <Link href={`/ma/${item.event.slug}/${item.event.customId}#id:${item.event.id}`} className="flex space-x-2 items-center  px-2 text-gray-900 text-opacity-75 hover:bg-custom-default-hover">
                                <div className="text-[12px] w-5 text-black  font-normal">{index + 1}</div>
                                <div className=" w-14  relative">
                                    <DisplayImage onErrorImage='player' width={40} height={40} className=" border-[1px]  border-gray-300 object-contain rounded-full" src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} alt="" />
                                </div>
                                <div className={`w-full flex   justify-between items-center p-2 ${index == 0 ? '' : 'border-b-1 '}`}>
                                    <div className=" flex flex-col justify-center text-black  font-normal">
                                        <p>{item.player.name}</p>
                                        <div className="flex space-x-1">
                                            <div className="w-5 h-5">
                                                <DisplayImage onErrorImage='team' width={408} height={408} className=" border-[1px]  border-gray-300 object-contain rounded-full" src={`https://sofascore.com/api/v1/team/${item.event.homeTeam.id}/image`} alt="" />
                                            </div>
                                            <div className="text-sm opacity-55">{item.event.homeScore.display} - {item.event.awayScore.display}</div>
                                            <div className="w-5 h-5">
                                                <DisplayImage onErrorImage='team' width={408} height={408} className=" border-[1px]  border-gray-300 object-contain rounded-full" src={`https://sofascore.com/api/v1/team/${item.event.awayTeam.id}/image`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-end items-center w-12 h-full">
                                        {
                                            topPlayersFilter == 'rating' ?
                                                <DisplayRating rating={item.statistic} type='in' />
                                                :
                                                <div className={`h-full min-w-6 font-semibold    p-0.5 rounded-[4px] text-[14px]  text-center `}>
                                                    {String(item.statistic).split('.').length != 1 ? Number(item.statistic).toFixed(2) : item.statistic}
                                                </div>
                                        }
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                }
            </div >
            {

                waitdata == 'wait' && <Shimmer_topPlayer />
            }
        </div >
    )
}

export default TopStats
