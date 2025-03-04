import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import Link from 'next/link'
import MatchOverview from '../homePage/matchOverview'
import { useCurrentMatch } from '@/context/EventDateContext'
import { CustomScroll } from 'react-custom-scroll'
import { getRatingColor, TimestampConverter } from '@/utils/function'
import { PlayerAPIJson } from '@/interface/api/player'
import { IMatchesOfplayerAPIJson } from '@/interface/api/matchesOfplayer'
import SvgIcons from '@/utils/svgIcons'
import DisplayImage from '@/utils/displayImage'
import { useWindowAttributes } from '@/context/windowAttributes'
import DisplayEventDate from '@/utils/displayEventDate'

interface StandingsProps {
    team: ITeamAPIJson | null
}

const MatchesOfTeam = ({ team }: StandingsProps) => {
    const [navigationOption, setNavigationOption] = useState<string>('');
    const [matches, setmatches] = useState<IMatchesOfplayerAPIJson | null>(null);
    const [lastMatches, setLastmatches] = useState<IMatchesOfplayerAPIJson | null>(null);
    const [data, setdata] = useState<any>()
    const [waitdata, setWaitdata] = React.useState(true);
    const { currentMatch, setCurrentMatch } = useCurrentMatch();
    const [page, setPage] = useState<number>(0)
    const [lastMatchesInfo, setLastMatchesInfo] = useState<{ index: number, lengh: number, hasNextPage: boolean, eventLength: number }>({ index: 0, lengh: 0, hasNextPage: true, eventLength: 0 })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { windowAttributes, setWindowAttributes } = useWindowAttributes()

    useEffect(() => {
        const getEvenstOfThePlayer = async () => {
            try {
                if (team == null)
                    return
                setWaitdata(true)

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/events/last/${page}`, {})
                if (response.ok) {
                    const data = await response.json()
                    setdata(data)
                    const events: any[] = Array.from(data.events).reverse()
                    const prIndex = lastMatches ? lastMatches.events.length : 0
                    const _lstmatch = lastMatches ? lastMatches.events.concat(events) : events
                    setmatches({ ...data, events: Array.from(_lstmatch.slice(prIndex, prIndex + 10)).reverse() })
                    setLastmatches({ ...data, events: _lstmatch })
                    setLastMatchesInfo({ index: prIndex, lengh: _lstmatch.length, hasNextPage: true, eventLength: events.length })

                }
            } catch (error) {
                setLastMatchesInfo({ index: lastMatchesInfo.index, lengh: lastMatchesInfo.lengh, hasNextPage: false, eventLength: lastMatchesInfo.eventLength })
            }
        }
        getEvenstOfThePlayer()
    }, [lastMatches, lastMatchesInfo, team, page])

    const handelClickPreviousRoundButton = () => {
        if (!lastMatches)
            return
        setNavigationOption('previous')
        if (lastMatchesInfo.index + 10 >= lastMatchesInfo.lengh)
            setPage(page + 1)
        else {
            setmatches({ ...data, events: Array.from(lastMatches.events.slice(lastMatchesInfo.index + 10, lastMatchesInfo.index + 20)).reverse() })
            setLastMatchesInfo({ index: lastMatchesInfo.index + 10, lengh: lastMatchesInfo.lengh, hasNextPage: lastMatchesInfo.hasNextPage, eventLength: lastMatchesInfo.eventLength })
        }
    }

    const handelClickNextRoundButton = () => {
        if (!lastMatches)
            return
        setNavigationOption('next')
        setmatches({ ...data, events: Array.from(lastMatches.events.slice(lastMatchesInfo.index - 10, lastMatchesInfo.index).reverse()) })
        setLastMatchesInfo({ index: lastMatchesInfo.index - 10, lengh: lastMatchesInfo.lengh, hasNextPage: lastMatchesInfo.hasNextPage, eventLength: lastMatchesInfo.eventLength })
    }

    return (
        <div className="bg-[#ffffff] bg-green- MYDeg rounded-2xl min-h-[740px] flex flex-col">
            <div className=" flex flex-col   border-b-1 py-2  justify-between">
                <div className="w-full text-center text-lg font-semibold  pt-2">Matches</div>
            </div>
            <div className="flex-1 flex  rounded-2xl   w-full ">
                <div className=" w-full tablet:w-1/2 h-full  border-r-0 tablet:border-r-1">
                    <div className="flex justify-between border-b-1 py-2 px-4 text-sm">
                        <button onClick={lastMatchesInfo.hasNextPage ? handelClickPreviousRoundButton : undefined} className={`${lastMatchesInfo.hasNextPage ? '' : 'opacity-30 cursor-not-allowed'} rounded-md ${navigationOption == 'previous' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                            <div className="m-[3px]  space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                <Image src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                <div className="">
                                    Previous
                                </div>
                            </div>
                        </button>

                        <button onClick={lastMatchesInfo.index > 0 ? handelClickNextRoundButton : undefined} className={`${lastMatchesInfo.index > 0 ? '' : 'opacity-30 cursor-not-allowed'} rounded-md ${navigationOption == 'next' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                            <div className="m-[3px] space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                <div className="">
                                    Next
                                </div>
                                <Image className=' rotate-180' src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                            </div>
                        </button>
                    </div>
                    <div className="">
                        {
                            matches && matches.events.map((item, _index) => (
                                <div key={_index} className={`   w-full space-y- text-[14px]`}>
                                    {
                                        matches.events[_index].tournament.name != matches.events[_index - 1]?.tournament.name &&
                                        <div className="w-full flex">
                                            <div className="w-[20%] flex justify-center items-center ">
                                                <DisplayImage onErrorImage='tournament' alt='' width={25} height={25} src={`https://sofascore.com/api/v1/unique-tournament/${item.tournament.uniqueTournament.id}/image`} />
                                            </div>
                                            <div className=" relative w-full flex justify-between pr-[60px] items-center">
                                                <div className="">
                                                    <p>
                                                        <Link href={`/ma/tournament/soccer/${item.tournament.category.name}/${item.tournament.uniqueTournament.slug}/${item.tournament.uniqueTournament.id}`} className=" text-gray-400  hover:text-blue-600 text-[12px]"> {item.tournament.name}</Link>
                                                    </p>
                                                    <p>
                                                        <Link href={'/'} className=" text-gray-600  font-semibold hover:text-blue-600 text-[13px]"> {item.tournament.category.name}</Link>
                                                    </p>
                                                </div>
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
                                        className={` w-full flex items-center space-x-3  py-1 hover:bg-custom-default-hover ${currentMatch?.id == item.id ? 'bg-custom-default-hover' : ''}`}>

                                        <div className="w-[20%] text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
                                            <DisplayEventDate event={item} />
                                        </div>
                                        <div className=" relative w-full   flex  justify-between  items-center  border-[#b8b9bda7]  text-[14px]">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="">
                                                    <div className="flex space-x-1 items-center ">
                                                        <div className="w-5 h-5">
                                                            <DisplayImage onErrorImage='team' alt='' width={400} height={400} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image`} />
                                                        </div>
                                                        <div className="opacity-80">
                                                            {item.homeTeam.shortName}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-1 items-center">
                                                        <div className="w-5 h-5">
                                                            <DisplayImage onErrorImage='team' alt='' width={400} height={400} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image`} />
                                                        </div>
                                                        <div className=" opacity-80">
                                                            {item.awayTeam.shortName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-5 mr-3">

                                                <div className="">
                                                    <div className="">{item.homeScore.display}</div>
                                                    <div className="">{item.awayScore.display}</div>
                                                </div>
                                            </div>
                                            <div className="w-20  flex items-center justify-center border-l-[1px] border-[#b8b9bda7]">
                                                {
                                                    item.status.description == 'Ended' &&
                                                    <div className={`w-7 h-7  rounded-full ${item.homeScore.display > item.awayScore.display ?
                                                        'bg-green-500' : item.homeScore.display < item.awayScore.display ? 'bg-red-600' : 'bg-neutral-400'} flex items-center justify-center text-white font-semibold `}>
                                                        {
                                                            item.homeScore.display > item.awayScore.display ?
                                                                'W' : item.homeScore.display < item.awayScore.display ? 'L' : 'D'
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                    <div>

                                    </div>

                                </div >
                            ))
                        }

                    </div>
                </div>
                {
                    windowWidth > 992 && <div className="w-1/2       overflow-hidden ">
                        <CustomScroll className='w-full' allowOuterScroll={true} heightRelativeToParent="100%" >
                            {
                                currentMatch &&
                                <MatchOverview scrollType={'2'} />
                            }
                        </CustomScroll>
                    </div>
                }
            </div >
        </div >
    )
}

export default MatchesOfTeam
