import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { TeamStreaksApiJson } from '@/interface/api/teamStreaks'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import moment from 'moment'
import { displayDateOfMatch } from '@/utils/function'
import DisplayImage from '@/utils/displayImage'

const DisplayMatches = ({ event, type }: { event: EventAPIJson | null, type: string }) => {
    const [waitdata, setWaitdata] = useState('wait')
    const [h2hEvent, setH2hEvent] = useState<MatchDetailsAPIJson[]>([])
    const [teamStreaks, setTeamStreaks] = useState<TeamStreaksApiJson | null>(null)
    const [isSelected1, setisSelected1] = React.useState(false);
    const [isSelected_tournament, setisSelected_tournament] = React.useState(false);


    useEffect(() => {
        (
            async () => {
                if (event == null)
                    return
                if (type == 'h2h') {
                    try {

                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${event.customId}/h2h/events`, {})
                        if (response.ok) {
                            const data = await response.json()
                            setH2hEvent(data.events)
                            setWaitdata('done')
                        }
                    } catch (error) {
                        setWaitdata('done')
                    }
                }
                else if (type == 'home' || type == 'away') {
                    let events: MatchDetailsAPIJson[] = []
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${type == 'home' ? event.homeTeam.id : event.awayTeam.id}/events/next/0`, {})
                        if (response.ok) {
                            const data = await response.json()
                            events = data.events
                            setWaitdata('done')

                        }
                        if (events.length) {
                            setH2hEvent(events)
                            setWaitdata('done')

                        }
                    } catch (error) {
                        setWaitdata('error')

                    }
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${type == 'home' ? event.homeTeam.id : event.awayTeam.id}/events/last/0`, {})
                        if (response.ok) {
                            const data = await response.json()
                            events = events.concat(data.events)
                            setWaitdata('done')
                        }
                        if (events.length) {
                            setH2hEvent(events)
                            setWaitdata('done')
                        }
                    } catch (error) {
                        setWaitdata('error')

                    }
                }
            }
        )()
    }, [type, event])
    const checkTypeOfmatch = ({ match }: { match: MatchDetailsAPIJson }): boolean => {
        if (!event)
            return true
        if ((type == 'home' || type == 'h2h') && isSelected1)
            return match.homeTeam.shortName == event.homeTeam.shortName
        if (type == 'away' && isSelected1)
            return match.awayTeam.shortName == event.awayTeam.shortName
        return true
    }

    if (waitdata == 'wait')
        return <div className='w-full h-40' />
    return (
        <div className=' font-normal '>
            {
                type != 'h2h' &&
                <div className=" flex items-center space-x-4 pl-4 font-medium">
                    <div className="w-8 h-8">
                        <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${type == 'home' ? event?.homeTeam.id : event?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                    </div>
                    <div className="">{type == 'home' ? event?.homeTeam.shortName : event?.awayTeam.shortName}</div>
                </div>
            }
            {
                type == 'home' ?
                    <div className="flex justify-around my-4">
                        <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >Home</Checkbox>
                        <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
                    </div>
                    : type == 'away' ?
                        <div className="flex justify-around my-4">
                            <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >Away</Checkbox>
                            <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
                        </div> :
                        <div className="flex  justify-around my-4">
                            <Checkbox isSelected={isSelected1} onValueChange={setisSelected1} >At {event?.homeTeam.shortName}</Checkbox>
                            <Checkbox isSelected={isSelected_tournament} onValueChange={setisSelected_tournament}>This Tournament</Checkbox>
                        </div>

            }
            {
                h2hEvent.map((item, index) => (
                    (!isSelected_tournament || event?.tournament.uniqueTournament.name == item.tournament.uniqueTournament.name) && checkTypeOfmatch({ match: item }) &&
                    <div key={index} className={`  py-1 w-full space-y-1 text-[14px]`}>
                        {
                            !(isSelected1 && type == 'h2h') && !isSelected_tournament && h2hEvent[index].tournament.uniqueTournament?.name != h2hEvent[index - 1]?.tournament.uniqueTournament?.name &&
                            <div className={`w-full flex `}>
                                <div className="w-[20%] flex justify-center items-center ">
                                    <DisplayImage onErrorImage='tournament' alt='' width={25} height={25} src={`https://sofascore.com/api/v1/unique-tournament/${item.tournament.uniqueTournament?.id}/image`} />
                                </div>
                                <div className=" relative w-full flex justify-between pr-[60px] items-center">
                                    <div className="">
                                        <p>
                                            <Link href={'/'} className=" text-gray-400  hover:text-blue-600 text-[12px]"> {item.tournament.uniqueTournament.name}</Link>
                                        </p>
                                        {/* <p>
                                            <Link href={'/'} className=" text-gray-600  font-semibold hover:text-blue-600 text-[13px]"> {item.tournament.category.name}</Link>
                                        </p> */}
                                    </div>

                                </div>
                            </div>
                        }
                        <Link href={`/ma/${item.slug}/${item.customId}#id:${item.id}`} className={` w-full flex items-center space-x-3  hover:bg-custom-default-hover`}>
                            <div className="w-24 text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
                                {
                                    <p className="whitespace-nowrap">{displayDateOfMatch({ startTimestamp: item.startTimestamp })}</p>
                                }
                                <p className={`${(item.status.description == 'Postponed' || item.status.description == 'Canceled') ? 'text-red-700  font-bold ' : ''}`}>{item.status.description == 'Ended' ? 'FT' : item.status.description == 'Not started' ? '-' : item.status.description}</p>
                            </div>
                            <div className=" relative w-full  flex justify-between  space-x-2   items-center border--[1px]  border-[#b8b9bda7]  text-[14px]">
                                <div className="  w-full">
                                    <div className="flex space-x-1 items-center ">
                                        <DisplayImage onErrorImage='team' alt='' width={18} height={18} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image/small`} />
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display > item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.homeTeam.shortName}
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <DisplayImage onErrorImage='team' alt='' width={18} height={18} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image/small`} />
                                        <div className={`${item.status.description == 'Ended' ? `${(item.homeScore.display < item.awayScore.display) ? 'opacity-85' : 'opacity-50'}` : ``}`}>
                                            {item.awayTeam.shortName}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-5">

                                    <div className="">
                                        <div className="">{item.homeScore.display}</div>
                                        <div className="">{item.awayScore.display}</div>
                                    </div>
                                </div>

                                <div className="w-20  flex items-center justify-center border-l-[1px] border-[#b8b9bda7]">
                                    {item.status.description == 'Ended' && type != 'h2h' &&
                                        <div className={`w-7 h-7  rounded-full ${item.homeScore.display > item.awayScore.display ?
                                            'bg-green-500' : item.homeScore.display < item.awayScore.display ? 'bg-red-600' : 'bg-neutral-400'} flex items-center justify-center text-white font-semibold `}>
                                            {
                                                item.homeScore.display > item.awayScore.display ?
                                                    'W' : item.homeScore.display < item.awayScore.display ? 'L' : 'D'
                                            }
                                        </div>
                                    }
                                    {
                                        type == 'h2h' && <Image alt='' width={30} height={30} className="p-0.5 hover:bg-blue-100  rounded-md" src='/image/notifications-none.svg' />
                                    }
                                </div>
                            </div>
                        </Link>
                        <div>

                        </div>

                    </div >
                ))
            }
        </div >
    )
}


const Matches = ({ event }: { event: EventAPIJson | null }) => {
    return (
        <div className="  space-y-5">
            <div className='bg-[#ffffff] MYDeg rounded-2xl'>
                <div className="text-center  text-xl text-black font-medium p-2">Matches</div>
                <div className='flex h-full flex-1 '>
                    <div className="w-1/2  border-r-[2px] border-gray-300/90 p-2">
                        <DisplayMatches event={event} type='home' />
                    </div>
                    <div className="h-full w-[1px] bg-slate-500"></div>
                    <div className="w-1/2 p-2">
                        <DisplayMatches event={event} type='away' />
                    </div>
                </div>
            </div>
            <div className='bg-[#ffffff] MYDeg rounded-2xl w-1/2 p-1'>
                <div className="text-center  text-xl text-black font-medium p-2">Head-to-Head</div>
                <DisplayMatches event={event} type='h2h' />
            </div>
        </div>
    )
}

export default Matches