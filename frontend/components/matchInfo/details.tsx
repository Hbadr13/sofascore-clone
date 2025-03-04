import React, { useEffect, useState } from 'react'
import { CustomScroll } from 'react-custom-scroll'
import Link from 'next/link'
import { Image } from '@nextui-org/react';

import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { PregameFormdProps, pregameFormAPIJson } from '@/interface/api/pregameForm'
import { ManagerAPIJson } from '@/interface/api/managers'
import { DuelH2HAPIJson, DuelProps } from '@/interface/api/duelH2H'
import { CountryChannelsAPIJson, TvChannelApi } from '@/interface/api/countryChannels'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import TvChannels from '../events/TvChannels'
import IncidentsComp from './incidents'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import DisplayImage from '@/utils/displayImage'

export interface currentMatchProps {
    incidents: IIncidentsAPIJson[]
    setIncidents: (incident: IIncidentsAPIJson[]) => void
    currentMatch: MatchDetailsAPIJson | null
}

export interface TeamStanding {
    team: PregameFormdProps | undefined
    currentMatch: MatchDetailsAPIJson | null
    status: string
}


const TeamStanding = ({ team, currentMatch, status }: TeamStanding) => {
    if (!team)
        return

    return <div className="flex items-centerjustify-between items-center">
        <div className="w-[5%] text-center">{team.position}</div>
        <div className="w-[15%] h-10 flex justify-center">
            <div className="w-8 h-8">
                <DisplayImage onErrorImage='team' className='' width={400} height={400} alt='' src={`https://sofascore.com/api/v1/team/${status == 'home' ? currentMatch?.homeTeam.id : currentMatch?.awayTeam.id}/image`} />
            </div>
        </div>
        <div className="flex w-[50%]  ">
            {
                team.form.map((item, index) =>
                    <div
                        key={index}
                        className={`w-10 h-6  text-white  text-center 
                                            ${index == 0 ? 'rounded-l-lg' : index == 5 ? 'rounded-r-lg' : ''}
                                            ${item == 'L' ? 'bg-red-500' : item == 'W' ? ' bg-green-500' : item == 'D' ? 'bg-slate-300' : 'bg-gray-200'}
                                            `}>
                        {item != '-' ? item : ''}
                    </div>
                )
            }
        </div>

        <div className="flex justify-center w-[25%]">
            <div className="w-5 h-5 bg-yellow-500 border-2" />
            <div className="">{team.avgRating}</div>
        </div>
        <div className=" text-center w-[5%]">
            {team.value}
        </div>
    </div>
}
export interface DuelComponentProps {
    duelName: string
    history: DuelProps | null
    currentMatch: MatchDetailsAPIJson | null
    managers: ManagerAPIJson
}

const Duel = ({ duelName, history, currentMatch, managers }: DuelComponentProps) => {
    if (!currentMatch || !history || !managers)
        return
    return (
        < div className="" >
            <div className="flex justify-center">
                <div className=" font-semibold">{duelName}</div>
            </div>
            <div className="flex   items-start p-2 justify-between">
                <div className="flex   w-1/2 items-start  space-x-4">
                    <Link
                        href={duelName == 'Manager head 2 head' ? `/ma/manager/${managers.homeManager.slug}/${managers.homeManager.id}` : `/ma/team/${currentMatch.homeTeam.slug}/${currentMatch.homeTeam.id}`}
                        className="w-11 h-10">
                        <DisplayImage onErrorImage='manager'
                            className={` relative ${duelName == 'Manager head 2 head' ? 'rounded-full' : ''}`}
                            alt=''
                            width={400} height={400}
                            src={`${duelName == 'Manager head 2 head' ? `https://sofascore.com/api/v1/manager/${managers.homeManager.id}/image` : `https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image`}`}
                        />
                    </Link>
                    <div className="">
                        <div className=" text-md  text-green-400">{history.homeWins}</div>
                        <Link
                            href={duelName == 'Manager head 2 head' ? `/ma/manager/${managers.homeManager.slug}/${managers.homeManager.id}` : `/ma/team/${currentMatch.homeTeam.slug}/${currentMatch.homeTeam.id}`}
                            className=" text-md font-normal text-gray-500">{duelName == 'Manager head 2 head' ? managers.homeManager.shortName : currentMatch.homeTeam.shortName}</Link>
                    </div>
                </div>
                <div className=" text-gray-500">{history.draws}</div>
                <div className="flex  w-1/2 items-start  justify-end  space-x-4">
                    <div className="flex flex-col  items-end">
                        <div className=" text-md  text-blue-500">{history.awayWins}</div>
                        <Link
                            href={duelName == 'Manager head 2 head' ? `/ma/manager/${managers.awayManager.slug}/${managers.awayManager.id}` : `/ma/team/${currentMatch.awayTeam.slug}/${currentMatch.awayTeam.id}`}
                            className=" text-md font-normal text-gray-500">
                            {duelName == 'Manager head 2 head' ? managers.awayManager.shortName : currentMatch.awayTeam.shortName}
                        </Link>
                    </div>
                    <Link href={duelName == 'Manager head 2 head' ? `/ma/manager/${managers.awayManager.slug}/${managers.awayManager.id}` : `/ma/team/${currentMatch.awayTeam.slug}/${currentMatch.awayTeam.id}`} className="w-11 h-10">
                        <DisplayImage onErrorImage='manager'
                            className={` relative ${duelName == 'Manager head 2 head' ? 'rounded-full' : ''}`}
                            width={400}
                            height={400}
                            alt=''
                            src={
                                duelName == 'Manager head 2 head' ?
                                    `https://sofascore.com/api/v1/manager/${managers.awayManager.id}/image` :
                                    `https://sofascore.com/api/v1/team/${currentMatch?.awayTeam.id}/image`
                            }
                        />
                    </Link>
                </div>
            </div>
        </div >
    )
}




const MatchDetails = ({ currentMatch, incidents, setIncidents }: currentMatchProps) => {

    const [waitdata, setWaitdata] = useState(false)
    const [pregameForm, setPregameForm] = useState<pregameFormAPIJson>()
    const [duelH2H, setduelH2H] = useState<DuelH2HAPIJson>()
    const [managers, setManagers] = useState<ManagerAPIJson>()
    const [matchInfo, setMatchInfo] = useState<EventAPIJson | null>(null)

    useEffect(() => {
        (
            async () => {
                if (currentMatch == null)
                    return
                try {
                    setWaitdata(true)
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch?.id}/pregame-form`, {});
                    if (response.ok) {
                        const data = await response.json()
                        setPregameForm(data)
                        setWaitdata(false)
                    }
                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch?.id}/h2h`, {});
                    if (response.ok) {
                        const data = await response.json()
                        setduelH2H(data)
                    }
                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch?.id}/managers`, {});
                    if (response.ok) {
                        const data = await response.json()
                        setManagers(data)
                    }
                } catch (error) {
                }
                try {
                    setMatchInfo(null)
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}`, {});
                    if (response.ok) {
                        const data = await response.json()
                        setMatchInfo(data.event)
                    }

                } catch (error) {
                }
            }
        )()
    }, [currentMatch])
    return (
        <div className="p-2 space-y-2">
            {
                currentMatch && <IncidentsComp event={currentMatch} incidents={incidents} setIncidents={setIncidents} />
            }

            {pregameForm && <div className="p-2 bg-slate-100 rounded-xl">

                <div className="flex justify-center space-x-1 items-center">
                    <div className="text-blue-600">Prematch standings</div>
                    <Image className=' rotate-180' width={14} height={14} alt='' src={'/image/arraw.svg'}></Image>
                </div>
                <div className="flex  text-[13px] text-gray-400 font-normal my-3">
                    <div className="w-[5%] text-center">#</div>
                    <div className="w-[15%] text-center" >
                        Team
                    </div>
                    <div className="w-[50%] text-end">Latlst</div>
                    <div className="w-[30%] text-end">
                        pts
                    </div>
                </div>

                {
                    (pregameForm?.homeTeam.position < pregameForm?.awayTeam.position) ?
                        <>
                            <TeamStanding status='home' currentMatch={currentMatch} team={pregameForm?.homeTeam} />
                            <TeamStanding status='away' currentMatch={currentMatch} team={pregameForm?.awayTeam} />
                        </> :
                        <>
                            <TeamStanding status='away' currentMatch={currentMatch} team={pregameForm?.awayTeam} />
                            <TeamStanding status='home' currentMatch={currentMatch} team={pregameForm?.homeTeam} />
                        </>
                }

            </div>}
            {
                managers && duelH2H && <div className="p-2 bg-slate-100 rounded-xl">
                    <Duel managers={managers} currentMatch={currentMatch} history={duelH2H?.managerDuel} duelName='Manager head 2 head' />
                    <Duel managers={managers} currentMatch={currentMatch} history={duelH2H?.teamDuel} duelName='Head 2 head' />
                </div>
            }
            {
                currentMatch && <TvChannels currentMatch={currentMatch} type='lineup' />
            }
            <div className="p-2 bg-slate-100 rounded-xl space-y-2">
                <div className="flex justify-center my-2">
                    <div className=" font-semibold">Match Info</div>
                </div>
                <MatchInfoComp matchInfo={matchInfo} type='lineup' />
            </div>
        </div>

    )
}

export default MatchDetails



export const MatchInfoComp = ({ matchInfo, type }: { matchInfo: EventAPIJson | null, type: string }) => {
    if (matchInfo == null)
        return <></>
    return <div className={` ${type == 'lineup' ? 'text-gray-500/80' : 'text-gray-700'} font-normal space-y-2`}>
        {
            type == 'event' && <div className="font-semibold p-1">Match Info</div>
        }
        <div className="flex items-center justify-between">
            <div className="">
                Date and time
            </div>
            <div className="">
                4/19/2024, 8:00 PM
            </div>
        </div>
        {
            matchInfo?.venue?.stadium.name && <div className="flex items-center justify-between">
                <div className="">
                    Stadium
                </div>
                <div className="">
                    {matchInfo?.venue?.stadium.name}
                </div>
            </div>
        }
        {
            matchInfo?.venue?.city.name && <div className="flex items-center justify-between">
                <div className="">
                    Location {matchInfo.tournament.category.alpha2}
                </div>
                <div className="flex justify-end items-center space-x-1">
                    {
                        matchInfo.tournament.category.alpha2 && <div className="w-5">
                            <DisplayImage onErrorImage='flag' alt='' src={`https://api.sofascore.app/static/images/flags/${matchInfo.tournament.category.alpha2.toLowerCase()}.png`} width={20} height={20} />
                        </div>
                    }
                    <div className="">
                        {matchInfo?.venue?.city.name}, {matchInfo?.venue?.country.name}
                    </div>
                </div>
            </div>
        }
        {
            matchInfo?.referee && <div className="flex items-center justify-between">
                <div className="">
                    Referee
                </div>
                <div className="flex justify-end items-center space-x-1">
                    <div className="w-5">
                        <DisplayImage onErrorImage='flag' alt='' src={`https://api.sofascore.app/static/images/flags/${matchInfo?.referee.country.alpha2?.toLowerCase()}.png`} width={20} height={20} />
                    </div>
                    <Link href={'/'} className=" text-blue-500">
                        {matchInfo?.referee?.name}
                    </Link>
                    <Image alt='' className=' rotate-180' src={'/image/arraw.svg'} width={20} height={20}></Image>
                </div>
            </div>
        }
        <div className="flex items-center justify-between">
            <div className="">
                Avg. cards
            </div>
            <div className="flex justify-end items-center space-x-5">
                <div className=" text-blue-500 flex items-center space-x-2 ">
                    <div className="w-[11px] h-[15px] bg-red-600 rounded-sm" />
                    <div className="h-full">
                        {matchInfo?.referee?.redCards ? String(matchInfo?.referee?.redCards / matchInfo?.referee.games).slice(0, 4) : '0'}
                    </div>
                </div>
                <div className=" text-blue-500 flex items-center space-x-2 ">
                    <div className="w-[11px] h-[15px] bg-yellow-500 rounded-sm" />
                    <div className="h-full">
                        {matchInfo?.referee?.yellowCards ? String(matchInfo?.referee?.yellowCards / matchInfo?.referee.games).slice(0, 4) : '0'}
                    </div>
                </div>
            </div>
        </div>
    </div>
}