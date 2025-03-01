import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import Link from 'next/link'
import MatchOverview from '../homePage/matchOverview'
import { useCurrentMatch } from '@/context/EventDateContext'
import { CustomScroll } from 'react-custom-scroll'
import { LeagueInfoAPIJson } from '@/interface/api/LeagueInfo'
import DisplayImage from '@/utils/displayImage'

interface LeagueInfoProps {
    tournamentId: number
    featuredEvent: EventAPIJson | null
    seasonId: string | null
}



const LeagueInfo = ({ featuredEvent, tournamentId, seasonId }: LeagueInfoProps) => {
    const [leagueInfo, setLeagueInfo] = useState<LeagueInfoAPIJson>();
    const [waitdata, setWaitdata] = React.useState(true);
    useEffect(() => {
        (
            async () => {
                try {

                    if (featuredEvent == null)
                        return
                    setWaitdata(true)
                    let api = ''
                    if (tournamentId && seasonId)
                        api = `https://sofascore.com/api/v1/unique-tournament/${tournamentId}/season/${seasonId}/info`
                    else
                        api = `https://sofascore.com/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/info`
                    const response = await fetch(api, {})
                    if (response.ok) {
                        const data = await response.json()
                        const info: LeagueInfoAPIJson = data.info
                        info.totalMatchs = info.awayTeamWins + info.homeTeamWins + info.draws
                        setLeagueInfo(info)
                        setWaitdata(false)
                    }
                } catch (error) {

                }
            }
        )()
    }, [tournamentId, featuredEvent, seasonId])


    return (
        <div className="bg-[#ffffff] bg-green- MYDeg rounded-2xl h-[700px] flex flex-col">
            <div className=" flex  items-center  h-[50px]  border-b-1  justify-between">
                <div className="w-full text-center text-lg font-semibold ">League info</div>
            </div>
            <div className="flex-1 flex  bg-red-40 h-[640px] rounded-2xl   w-full ">
                <div className="w-1/2 h-full  border-r-1">


                </div>
                <div className="w-1/2  h-full   ">
                    <div
                        hidden={leagueInfo?.newcomersLowerDivision.length == 0}
                        className="border-b-1 space-y-2 p-4">
                        <div className="">
                            Newcomers from lower division
                        </div>
                        <div className=" space-y-2  ">
                            {
                                leagueInfo?.newcomersLowerDivision.map((item, index) => <div key={index}
                                    className='flex items-center space-x-4'
                                >
                                    <div className="w-10 h-10">
                                        <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${item.id}/image/`} width={400} height={400} alt='club' />
                                    </div>
                                    <div className="">
                                        {item.shortName}
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="border-b-1 space-y-2 p-4">
                        <div className=" font-semibold t">
                            Facts
                        </div>
                        <div className=" space-y-2  opacity-70 ">
                            <div className="flex justify-between">
                                <div className="">Goals</div>
                                <div className="">{leagueInfo?.goals}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="">Matchs</div>
                                <div className="">{leagueInfo?.totalMatchs}</div>
                            </div>

                            {leagueInfo && <div className="flex justify-between">
                                <div className="">Draws</div>
                                <div className="">{Math.floor(leagueInfo?.draws * 100 / leagueInfo?.totalMatchs)}%</div>
                            </div>
                            }
                            {leagueInfo && <div className="flex justify-between">
                                <div className="">home Team Wins</div>
                                <div className="">{Math.floor(leagueInfo?.homeTeamWins * 100 / leagueInfo?.totalMatchs)}%</div>
                            </div>
                            }
                            {leagueInfo && <div className="flex justify-between">
                                <div className="">Away Team Wins</div>
                                <div className="">{Math.floor(leagueInfo?.awayTeamWins * 100 / leagueInfo?.totalMatchs)}%</div>
                            </div>
                            }


                            {leagueInfo && <div className="flex justify-between">
                                <div className="">Yellow Cards</div>
                                <div className="">{String(leagueInfo?.yellowCards / leagueInfo.totalMatchs).slice(0, 4)}</div>
                            </div>}
                            {leagueInfo && <div className="flex justify-between">
                                <div className="">Red Cards</div>
                                <div className="">{String(leagueInfo?.redCards / leagueInfo.totalMatchs).slice(0, 4)}</div>
                            </div>}
                            {leagueInfo && <div className="flex justify-between">
                                <div className="">Number of competitors</div>
                                <div className="">{leagueInfo.numberOfCompetitors}</div>
                            </div>}
                            {/* <div className="flex justify-between">
                                <div className="">Red Cards</div>
                                <div className="">{}</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LeagueInfo