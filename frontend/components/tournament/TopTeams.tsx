import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import Shimmer_topPlayer from '../shimmer/shi2_topPlayer'
import { CustomScroll } from 'react-custom-scroll'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { addSpaceBeforeUppercase } from '@/utils/function'
import { EventAPIJson } from '@/interface/api/event'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
interface TopTeamsProps {
    tournamentId: number
    featuredEvent: EventAPIJson | null
    seasonId: string | null
}
const TopTeams = ({ featuredEvent, tournamentId, seasonId }: TopTeamsProps) => {
    const [channelId, setChannelId] = useState<string>('MA')
    const [TopTeamsKeys, setTopTeamsKeys] = useState<Array<string>>([])

    const [waitdata, setWaitdata] = useState('wait')
    const [TopTeams, setTopTeams] = useState()
    const [TopTeamsFilter, setTopTeamsFilter] = useState<string>('avgRating')
    const [ShowMore, setShowMore] = useState(false)
    useEffect(() => {
        const getThetopTeams = async () => {
            try {
                if (!featuredEvent)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/top-teams/overall`, {})
                if (response.ok) {
                    const data = await response.json()
                    setTopTeams(data.topTeams)
                    const keys = Object.keys(data.topTeams).map((item: string, index: number) => item);
                    setTopTeamsKeys(keys)
                    setWaitdata('done')
                }

            } catch (error) {
                setWaitdata('error')
            }
        }
        getThetopTeams()
    }, [featuredEvent, seasonId])
    if (waitdata == 'error')
        return <div />
    return (
        <div className="MYDeg  w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
            <div className="border-b-[1px] border-gray-300 pb-4">
                <div className=" text-slate-800 p-3 ">
                    <p className=" text-[20px]">Top teams</p>
                </div>
                <div className="pl-10">
                    <div className="pl-10">
                        <CustomDropdown
                            buttonStyle=' w-44'
                            buttonContent={
                                <div className="  w-28 truncate ">
                                    {addSpaceBeforeUppercase(TopTeamsFilter)}
                                </div>
                            }
                            CustomDropdownContent={
                                TopTeamsKeys.map((item, index) => (
                                    <button key={index} onClick={() => { setTopTeamsFilter(item) }} className={`  ${TopTeamsFilter == item ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
                                        <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
                                            {addSpaceBeforeUppercase(item)}
                                        </div>
                                        {
                                            TopTeamsFilter == item &&
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
                    <div className="pr-3  truncate  capitalize">
                        {addSpaceBeforeUppercase(TopTeamsFilter)}
                    </div>
                </div>
                <div className=" 1">

                    {

                        TopTeams && Object.getOwnPropertyDescriptor(TopTeams, TopTeamsFilter)?.value?.slice(0, ShowMore ? Object.getOwnPropertyDescriptor(TopTeams, TopTeamsFilter)?.value?.length : 10).map((item: any, index: number) =>
                            <div key={index}
                                className='' >
                                <Link href={`/ma/team/${item.team.slug}/${item.team.id}`} className="flex space-x-2 items-center  py-3 px-2 text-gray-900 text-opacity-75 hover:bg-custom-default-hover">
                                    <div className="text-[12px] w-5 text-black  font-normal">{index + 1}</div>
                                    <div className=" w-12  relative">
                                        <DisplayImage onErrorImage='team' width={600} height={600} src={`https://sofascore.com/api/v1/team/${item.team.id}/image`} alt="" />
                                    </div>
                                    <div className={`w-full flex   justify-between items-center p-2`}>
                                        <div className=" flex flex-col justify-center  items-center text-black  font-normal">
                                            <p>{item.team.shortName}</p>
                                        </div>
                                        <div className=" flex justify-end items-center w-12 h-full">
                                            {
                                                (
                                                    () => {
                                                        const value: string = String(Object.getOwnPropertyDescriptor(item.statistics, TopTeamsFilter == 'leastConceded' ? 'goalsConceded' : TopTeamsFilter == 'mostConceded' ? 'goalsConceded' : TopTeamsFilter)?.value)
                                                        return <div className="">
                                                            {
                                                                TopTeamsFilter == 'avgRating' ?
                                                                    <DisplayRating rating={value} type='in' />
                                                                    :
                                                                    <div className={`h-full min-w-6 font-semibold    p-0.5 rounded-[4px] text-[14px]  text-center `}>
                                                                        {
                                                                            value.length != 1 ? Number(value).toFixed(2) : value
                                                                        }
                                                                    </div>
                                                            }
                                                        </div>
                                                    }
                                                )()
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div >
            <div className={`${waitdata == 'wait' ? 'hidden' : 'block'} w-full p-3 flex space-x-2  justify-end items-center`}>
                <button onClick={() => setShowMore((prv) => !prv)} className=" flex space-x-2 items-center">
                    <div className=" font-medium text-blue-600 ">
                        {ShowMore ? 'Show less' : 'Show more'}
                    </div>
                    <Image width={200} height={200} className={` w-4 ${ShowMore ? 'rotate-90 ' : '-rotate-90'}`} src="/image/blue-arraw.svg" alt="" />
                </button>
            </div>
            {

                waitdata == 'wait' && <Shimmer_topPlayer />
            }
        </div >
    )
}

export default TopTeams
