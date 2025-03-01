import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import { extractFormDate_2 } from '@/utils/function'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'



interface IRoundGroubProps {
  featuredEvent: EventAPIJson | null
  groudId: number
}
const RoundGroub = ({ groudId, featuredEvent }: IRoundGroubProps) => {
  const [navigation, setNavigation] = useState('')
  const [waitdata, setWaitdata] = useState(true)
  const [events, setEvents] = useState<MatchDetailsAPIJson[]>([])
  const [currentRound, setCurrentRound] = useState(0)
  useEffect(() => {
    (
      async () => {
        try {
          if (!groudId)
            return
          setWaitdata(true)
          const response = await fetch(`https://sofascore.com/api/v1/tournament/${groudId}/season/${featuredEvent?.season.id}/events`, {})
          if (response.ok) {
            const data = await response.json()
            setEvents(data.events)
            setCurrentRound(data.events[data.events.length - 1]?.roundInfo.round)
            setWaitdata(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [featuredEvent, groudId])

  const handelRightNav = () => {
    if (currentRound < events[events.length - 1]?.roundInfo.round) {
      setCurrentRound((prv) => prv + 1)
      setNavigation('right')
    }
  }

  const handelLeftNav = () => {
    if (currentRound > events[0]?.roundInfo.round) {
      setCurrentRound((prv) => prv - 1)
      setNavigation('left')
    }
  }
  return <div className=" bg-slate-100/80 p-2 rounded-xl mr-2">
    <div className="flex justify-between items-center mb-2">
      <button onClick={handelLeftNav} className={` border-[1px] ${currentRound <= events[0]?.roundInfo.round ? 'cursor-not-allowed opacity-30' : ''} ${navigation === 'left' ? 'border-blue-500 bg-blue-100' : ''} rounded-md p-1`}>
        <Image src={'/image/blue-arraw.svg'} width={30} height={30} alt='arraw' />
      </button>
      <div className="">
        Round {currentRound}
      </div>
      <button onClick={handelRightNav} className={`${currentRound >= events[events.length - 1]?.roundInfo.round ? 'cursor-not-allowed opacity-30' : ''} border-[1px] ${navigation === 'right' ? 'border-blue-500 bg-blue-100' : ''} rounded-md p-1`}>
        <Image className='-rotate-180' src={'/image/blue-arraw.svg'} width={30} height={30} alt='arraw' />
      </button>
    </div>
    {
      events.map((item, index) => (
        item.roundInfo.round == currentRound && <div key={index} className={`  py-1 w-full space-y-1 text-[14px]`}>
          <button className={` w-full flex items-center space-x-3  hover:bg-custom-default-hover`}>
            <div className="w-[20%] text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
              <p className=" whitespace-nowrap">77:88</p>
              <p className={`${(item.status.description == 'Postponed' || item.status.description == 'Canceled') ? 'text-red-700  font-bold ' : ''}`}>{item.status.description == 'Ended' ? 'FT' : item.status.description == 'Not started' ? '-' : item.status.description}</p>
            </div>
            <div className=" relative w-full   flex  justify-between  items-center border--[1px]  pr-[60px] border-[#b8b9bda7]  text-[14px]">
              <div className="">
                <div className="flex space-x-1 items-center ">
                  <DisplayImage onErrorImage='team' alt='' width={20} height={20} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image/small`} />
                  <div className="opacity-80">
                    {item.homeTeam.shortName}
                  </div>
                </div>
                <div className="flex space-x-1 items-center">
                  <DisplayImage onErrorImage='team' alt='' width={20} height={20} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image/small`} />
                  <div className=" opacity-80">
                    {item.awayTeam.shortName}
                  </div>
                </div>
              </div>
              <div className="flex space-x-5">
                <div className={`${item.status.type == 'inprogress' ? 'text-red-400' : ''}`}>
                  <div className="">{item.homeScore.display}</div>
                  <div className="">{item.awayScore.display}</div>
                </div>
              </div>
              <button className=" absolute w-[50px] right-0 top-0 pl-1 flex  justify-center items-center  h-full  border-l-[1px] border-[#b8b9bda7] ">
                <Image alt='' width={30} height={30} className="p-0.5 hover:bg-blue-100  rounded-md" src='/image/notifications-none.svg' />
              </button>
            </div>
          </button>
          <div>

          </div>

        </div >
      ))
    }
  </div >
}

interface StandingsProps {
  featuredEvent: EventAPIJson | null
  standings: StandingsAPIJson[] | null
  setStandings: (standings: StandingsAPIJson[] | null) => void
}

const Standings = ({ standings, setStandings, featuredEvent }: StandingsProps) => {
  const [filter, setFilter] = useState<string>('total')
  const [waitdata, setWaitdata] = useState('wait');
  const [latestMatches, setLatestMatches] = useState<{ [id: number]: string[] }>()

  useEffect(() => {
    (
      async () => {
        if (featuredEvent == null)
          return
        setWaitdata('wait')

        async function getLatestMatches(leagueId: number, seasonId: number, filter: string) {
          try {
            const response = await fetch(`https://sofascore.com/api/v1/unique-tournament/${leagueId}/season/${seasonId}/team-events/${filter}`);
            const data = await response.json()
            const teams: { [id: number]: string[] } = {};
            for (const groupId of Object.keys(data.tournamentTeamEvents)) {
              for (const teamId of Object.keys(data.tournamentTeamEvents[groupId])) {
                teams[parseInt(teamId)] = data.tournamentTeamEvents[groupId][teamId].reverse().map((it: any) => [1, 2].includes(it.winnerCode) ? ([it.homeTeam, it.awayTeam][it.winnerCode - 1].id == teamId ? "W" : "L") : "D");
              }
            }
            setLatestMatches(teams)
          } catch (error) {
            setWaitdata('error')

          }
        }

        try {
          let api = `https://sofascore.com/api/v1/unique-tournament/${featuredEvent.tournament?.uniqueTournament.id}/season/${featuredEvent.season?.id}/standings/${filter}`
          getLatestMatches(featuredEvent.tournament?.uniqueTournament.id, featuredEvent.season?.id, filter);
          const response = await fetch(api, {})
          if (response.ok) {
            const data = await response.json()
            setStandings(data.standings)
            setWaitdata('done')
          }
        } catch (error) {
          setWaitdata('error')

        }
      }
    )()
  }, [filter, featuredEvent, setStandings])

  if (waitdata == 'wait')
    return <div className="bg-[#ffffff] MYDeg rounded-2xl">
      < Shi_standings />
    </div>
  if (waitdata == 'error')
    return

  return (
    <>
      {
        standings?.map((standing, index) =>
          <div key={index} className="bg-[#ffffff] MYDeg rounded-2xl">
            <div className="w-full text-center text-lg font-semibold  pb-5 pt-2">{standing.tournament.isGroup ? standing.tournament.groupName : 'Standings'}</div>
            <div className="flex">
              <div className={`${standing.tournament?.isGroup ? 'w-2/3' : 'w-full'}`}>

                <div className="flex px-5 text-sm  mb-7">
                  <div className=" flex items-center justify-between space-x-2 font-semibold">
                    <button onClick={() => setFilter('total')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'total' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>ALL</button>
                    <button onClick={() => setFilter('home')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'home' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>HOME</button>
                    <button onClick={() => setFilter('away')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'away' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>AWAY</button>
                  </div>
                  <div className="w-3/4 flex justify-end items-center space-x-2">
                    <button hidden={standing.tournament.isGroup} className={`py-1px-2 rounded-lg border-1  bg-blue-500/25te text-gray-700 bg-slate-100`}>
                      <Image className=' p-1 otate-90' width={30} height={30} src={'/image/rise.png'} alt='' />
                    </button>
                  </div>
                </div>

                <div className="flex py-1 border-b-1 border-gray-200 mb-1 items-center justify-between pr-3 pl-2 text-gray-400 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 text-center ">#</div>
                    <div className="">Team</div>
                  </div>
                  <div className="flex">
                    <div className="w-10 text-center">P</div>
                    <div className="w-10 text-center">W</div>
                    <div className="w-10 text-center">D</div>
                    <div className="w-10 text-center">L</div>
                    <div className="w-10 text-center">Goals</div>
                    <div className="w-32 text-center">Last 5</div>
                    <div className="w-10 text-center">PTS</div>
                  </div>
                </div>
                <div>
                  <div className=" space-y-2 text-gray-600 text-sm font-medium">
                    {standing.rows.map((item, index) =>
                      <Link href={`/ma/team/${item.team.slug}/${item.team.id}`} key={index} className=" w-full flex items-center justify-between space-x-2 hover:bg-custom-default-hover pr-3 pl-2">
                        <div className=" flex items-center space-x-1">
                          <div className="w-6">
                            <div className={`w-[22px] h-[22px]  text-[12px] rounded-full bg-green-600   text-white font-black  flex justify-center items-center`}>
                              {item.position}
                            </div>
                          </div>
                          <DisplayImage onErrorImage='team' className='w-6' src={`https://sofascore.com/api/v1/team/${item.team?.id}/image`} alt='/h' width={400} height={400} />
                          <div className=" text-start text-sm">{item.team?.shortName}</div>
                        </div>
                        <div className=" flex ">
                          <div className="w-10">{item.matches}</div>
                          <div className="w-10">{item.wins}</div>
                          <div className="w-10">{item.draws}</div>
                          <div className="w-10">{item.losses}</div>
                          <div className="w-10 ">{item.scoresFor}:{item.scoresAgainst}</div>
                          <div className="w-32 flex justify-center">

                            {

                              latestMatches && Object.getOwnPropertyDescriptor(latestMatches, item.team.id)?.value.concat(['-']).map((item: string, index: number) =>
                                <div
                                  key={index}
                                  className={`w-5 h-5  text-white  flex justify-center items-center  text-[11px]
                                            ${index == 0 ? 'rounded-l-lg' : index == 5 ? 'rounded-r-lg' : ''}
                                            ${item == 'L' ? 'bg-red-500' : item == 'W' ? ' bg-green-500' : item == 'D' ? 'bg-slate-300' : 'bg-gray-200'}
                                            `}>
                                  <div className="">
                                    {item != '-' ? item : ''}
                                  </div>
                                </div>
                              )
                            }
                          </div>
                          <div className="w-10">{item.points}</div>
                        </div>
                      </Link >)}
                  </div>
                </div >

              </div >
              {

                standing.tournament.isGroup ? <div className="w-1/3">
                  <RoundGroub groudId={standing.tournament.id} featuredEvent={featuredEvent} />
                </div> : null
              }
            </div>
            <div className="px-4 py-7 text-sm font-light">
              <div className="">{standing.tieBreakingRule?.text}</div>
            </div>
          </div >

        )
      }
    </>

  )
}

export default Standings