import { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Shimmer1 from '../shimmer/shi1'
import Link from 'next/link'
import moment from 'moment'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { CircularProgress } from '@nextui-org/react'
import { extractFormDate } from '@/utils/function'
import DisplayImage from '@/utils/displayImage'
import { useWindowAttributes } from '@/context/windowAttributes'
import DisplayEventDate from '@/utils/displayEventDate'

export interface AllMatchProps {

    matchs: Array<MatchDetailsAPIJson>,
    currentMatch: MatchDetailsAPIJson | null,
    matchesDate: Dayjs | null, waitdata: boolean
    setMatchs: (matchs: Array<MatchDetailsAPIJson>) => void,
    setCurrentMatch: (currentMatch: MatchDetailsAPIJson | null) => void,
}


const AllMatch = ({ matchs, setMatchs, currentMatch, setCurrentMatch, matchesDate, waitdata }: AllMatchProps) => {

    const [showAll, setSowAll] = useState(false)
    const [waitdataForMoreMatches, setwaitdataForMoreMatches] = useState(false)
    const [numberofmatch, setnumberofmatch] = useState(0)

    const { windowAttributes } = useWindowAttributes()

    const handelShowMoreEvents = async () => {
        try {
            if (matchesDate == null)
                return
            setSowAll((prv) => !prv)
            if (showAll) {
                setMatchs(matchs.slice(0, matchs.length - numberofmatch))
                return
            }
            setwaitdataForMoreMatches(true)
            const response = await fetch(`https://sofascore.com/api/v1/sport/football/scheduled-events/${extractFormDate(matchesDate.toDate())}/inverse`, {});
            if (response.ok) {
                const data = await response.json()
                const result = matchs.concat((data.events as MatchDetailsAPIJson[]).filter(item => moment((item.startTimestamp + (moment().utcOffset() * 60)) * 1000).isSame(matchesDate.toString(), 'day')));
                setnumberofmatch(result.length)
                setwaitdataForMoreMatches(false)
                setMatchs(result)

            }
        } catch (error) {

        }
    }

    return (
        <div className="w-full  bg-white ">
            <div className="p-4 font-bold opacity-65">
                Pinned Leagues
            </div>
            {
                !waitdata && <Shimmer1 />
            }
            {
                waitdata && matchs.map((item, index) => (
                    item.tournament.category.name != 'Israel' && <div key={index} className={` ${matchs[index].tournament.name == matchs[index + 1]?.tournament.name ? 'border-b-0' : 'border-b-[1px] border-[#b8b9bda7]'} py-1 w-full space-y-1 text-[14px]`}>
                        {
                            matchs[index].tournament.name != matchs[index - 1]?.tournament.name &&
                            <div className="w-full flex">
                                <div className="w-[20%] flex justify-center items-center ">
                                    {
                                        item.tournament.category.alpha2 ?
                                            <DisplayImage onErrorImage='flag' className="w-7 h-7" alt='' width={500} height={500} src={`https://cdn.alkora.app/static/images/flags/${item.tournament.category.alpha2?.toLowerCase()}.png`} />
                                            : <DisplayImage onErrorImage='tournament' className="w-7 h-7" alt='' width={500} height={500} src={`https://sofascore.com/api/v1/unique-tournament/${item.tournament.uniqueTournament?.id}/image`} />
                                    }
                                </div>
                                <div className=" relative w-full flex justify-between pr-[60px] items-center">
                                    <div className="">
                                        <Link href={`/ma/tournament/soccer/${item.tournament.category.name}/${item.tournament.uniqueTournament.slug}/${item.tournament.uniqueTournament.id}`} className=" text-gray-400  hover:text-blue-600 text-[12px]"> {item.tournament.name}</Link>
                                        <Link href={'/'} className=" text-gray-600  font-semibold hover:text-blue-600 text-[13px]"> {item.tournament.category.name}</Link>
                                    </div>
                                    <button className=" absolute w-[50px] right-0 top-0 pl-1 flex  justify-center items-center  h-full  border-l-[1px] border-[#b8b9bda7] ">
                                        <Image alt='' width={500} height={500} className="p-0.5 hover:bg-blue-100 w-8 h-8  rounded-md" src='/image/push-pin2.png' />
                                    </button>
                                </div>
                            </div>
                        }
                        <Link
                            href={`/ma/${item.slug}/${item.customId}#id:${item.id}`}
                            onClick={(e) => {
                                if (windowAttributes.width > 992) {
                                    e.preventDefault();
                                    setCurrentMatch(item)
                                }
                            }}
                            className={`  w-full flex items-center space-x-3  ${currentMatch?.id == item.id ? 'bg-slate-200' : 'hover:bg-custom-default-hover'}`}>
                            <div className="w-[20%] text-[12px]   items-center border-r-[1px] border-[#b8b9bda7] opacity-50  ">
                                <DisplayEventDate event={item} />
                            </div>
                            <div className=" relative w-full   flex  justify-between  items-center border--[1px]  pr-[60px] border-[#b8b9bda7]  text-[14px]">
                                <div className="">
                                    <div className="flex space-x-1 items-center ">
                                        <DisplayImage onErrorImage='team' className='w-4 h-4' alt='' width={500} height={500} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image`} />
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display > item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.homeTeam.shortName}
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <DisplayImage onErrorImage='team' className='w-4 h-4' alt='' width={500} height={500} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image`} />
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display < item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.awayTeam.shortName}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-5">
                                    <div className={`${item.status.type == 'inprogress' ? 'text-red-400' : ''}`}>
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display > item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.homeScore.display}
                                        </div>
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display < item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.awayScore.display}
                                        </div>
                                        {/* <div className="">{item.homeScore.display}</div>
                                        <div className="">{item.awayScore.display}</div> */}
                                    </div>
                                </div>
                                <button className=" absolute w-[50px] right-0 top-0 pl-1 flex  justify-center items-center  h-full  border-l-[1px] border-[#b8b9bda7] ">
                                    <Image alt='' width={30} height={30} className="p-0.5 hover:bg-blue-100  rounded-md" src='/image/notifications-none.svg' />
                                </button>
                            </div>
                        </Link>
                        <div>

                        </div>

                    </div >
                ))
            }

            {
                waitdataForMoreMatches && <div className="flex justify-center  my-3">
                    <CircularProgress aria-label="Loading..." />
                </div>
            }

            {
                !waitdataForMoreMatches && waitdata && <button onClick={() => handelShowMoreEvents()} className="w-full flex justify-center p-4">
                    {
                        showAll ? <div className="py-1 px-2 bg-blue-700 rounded-xl text-white font-semibold text-[14px] flex space-x-2 items-center">
                            <div className="">
                                Show less Matches
                            </div>
                            <Image className=' rotate-90' src={'/image/arraw-white.svg'} height={30} width={30} alt='/' />
                        </div> :
                            <div className="py-1 px-2 bg-blue-700 rounded-xl text-white font-semibold text-[14px] flex space-x-2 items-center">
                                <div className="">
                                    Show All Matches
                                </div>
                                <Image className='-rotate-90' src={'/image/arraw-white.svg'} height={30} width={30} alt='/' />
                            </div>
                    }
                </button>
            }
        </div >
    )
}

export default AllMatch