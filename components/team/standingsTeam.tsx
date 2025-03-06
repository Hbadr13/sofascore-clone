import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson, TournamentAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import { extractFormDate_2 } from '@/utils/function'
import { ISeasons, ISeassonStatisticsAPIJson, IUniqueTournament } from '@/interface/api/seassonStatistics'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'
import { ISeassonStandingsAPIJson, ITournamentSeasons } from '@/interface/api/seassonStandings'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'



interface IRoundGroubProps {
  tournamentId: number
  featuredEvent: EventAPIJson | undefined
  seasonId: string | null
  groudId: number
}
interface ISelectTournamentAndSeassonProps {
  selectTournament: TournamentAPIJson | null
  setSelectTournament: (selectTournament: TournamentAPIJson | null) => void
  selectSeason: ISeasons | null
  setSelectSeason: (selectSeason: ISeasons | null) => void
  team: ITeamAPIJson | null
  waitdata: string
  setWaitdata: (waitdata: string) => void
}
export const SelectTournamentAndSeasson = ({ team, waitdata, setWaitdata, selectTournament, setSelectTournament, selectSeason, setSelectSeason }: ISelectTournamentAndSeassonProps) => {

  const [seassonStatistics, setSeassonStatistics] = useState<ISeassonStandingsAPIJson | null>(null)

  useEffect(() => {

    const getThestatisticsSeasons = async () => {
      try {
        if (team == null)
          return
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/standings/seasons`, {})
        if (response.ok) {
          const data = await response.json()
          setSeassonStatistics(data)
          setWaitdata('done')
          setSelectTournament((data as ISeassonStandingsAPIJson).tournamentSeasons[0].tournament)
          setSelectSeason((data as ISeassonStandingsAPIJson).tournamentSeasons[0].seasons[0])

        }
      } catch (error) {
        if (setWaitdata)
          setWaitdata('error')
      }
    }
    getThestatisticsSeasons()
  }, [team, setSelectSeason, setSelectTournament, setWaitdata])

  if (waitdata == 'wait' || !selectTournament || !selectSeason || !seassonStatistics)
    return

  return <div className="  flex  space-x-2 p-2   s rounded-md  m-2">
    <CustomDropdown
      buttonStyle=''
      buttonContent={
        <div className="  truncate flex items-center space-x-2 justify-center ">
          <DisplayImage onErrorImage='tournament' className='w-5 h-5' alt={'tournament:' + selectTournament.uniqueTournament.name} src={`https://api.sofascore.app/api/v1/unique-tournament/${selectTournament.uniqueTournament.id}/image`} width={500} height={500} />
          <div className="truncate">
            {selectTournament.uniqueTournament.name}
          </div>
        </div>
      }
      CustomDropdownContent={

        seassonStatistics.tournamentSeasons.reduce((acc: ITournamentSeasons[], current) => {
          if (!acc.find(item => item.tournament.uniqueTournament.id === current.tournament.uniqueTournament.id))
            acc.push(current)
          return acc
        }, []).map((item, index) => (
          <button key={index} onClick={() => {
            const currenSeas = seassonStatistics.tournamentSeasons.reduce((acc: ISeasons[], current) => {
              if (item.tournament.uniqueTournament.id == current.tournament.uniqueTournament.id) {
                current.seasons.map((_item) => acc.push(_item))
              }
              return acc
            }, []).sort((a, b) => b.id - a.id)[0]
            seassonStatistics.tournamentSeasons.find((temp) => {
              if (temp.seasons.find((seas) => seas.id == currenSeas.id))
                setSelectTournament(temp.tournament)
            })
            setSelectSeason(currenSeas)
          }
          }
            className={`  ${selectTournament.name == item.tournament.name ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
            <DisplayImage onErrorImage='tournament' className='w-5 h-5' alt={'tournament:' + item.tournament.name} src={`https://api.sofascore.app/api/v1/unique-tournament/${item.tournament.uniqueTournament.id}/image`} width={500} height={500} />
            <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
              {item.tournament.uniqueTournament.name}
            </div>
            {
              selectTournament.name == item.tournament.name &&
              <div className="w-[20px] h-[20px] ">
                <SvgIcons iconName='OKy' />
              </div>
            }
          </button>
        ))
      }


    />
    <CustomDropdown
      buttonContent={
        <div className="">
          {selectSeason.year}
        </div>
      }
      CustomDropdownContent={
        seassonStatistics.tournamentSeasons.reduce((acc: ISeasons[], current) => {
          if (selectTournament.uniqueTournament.id == current.tournament.uniqueTournament.id) {
            current.seasons.map((_item) => acc.push(_item))
          }
          return acc
        }, []).sort((a, b) => b.id - a.id).map((season, index) =>
          <button
            key={index}
            onClick={() => {
              seassonStatistics.tournamentSeasons.find((temp) => {
                if (temp.seasons.find((seas) => seas.id == season.id))
                  setSelectTournament(temp.tournament)
              })
              setSelectSeason(season)
            }}
            className={`${selectSeason.year == season.year ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-4 py-1`}                >
            <div className="">
              {season.year}
            </div>
            {
              selectSeason.year == season.year &&
              <div className="w-3.5 h-3.5">
                <SvgIcons iconName='OKy' />
              </div>
            }
          </button>
        )
      } />
  </div>
}

interface StandingsProps {
  team: ITeamAPIJson | null
}

const StandingsTeam = ({ team }: StandingsProps) => {
  const [standings, setStandings] = useState<StandingsAPIJson[] | null>(null)
  const [filter, setFilter] = useState<string>('total')
  const [waitdata2, setWaitdata2] = useState(true);
  const [waitdata, setWaitdata] = useState<string>('wait');
  const [latestMatches, setLatestMatches] = useState<{ [id: number]: string[] }>()
  const [selectTournament, setSelectTournament] = useState<TournamentAPIJson | null>(null)
  const [selectSeason, setSelectSeason] = useState<ISeasons | null>(null)
  useEffect(() => {
    (
      async () => {
        if (!selectTournament || !selectSeason)
          return
        setWaitdata2(true)
        async function getLatestMatches(leagueId: number, seasonId: number, filter: string) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${leagueId}/season/${seasonId}/team-events/${filter}`);
            const data = await response.json()
            const teams: { [id: number]: string[] } = {};
            for (const groupId of Object.keys(data.tournamentTeamEvents)) {
              for (const teamId of Object.keys(data.tournamentTeamEvents[groupId])) {
                teams[parseInt(teamId)] = data.tournamentTeamEvents[groupId][teamId].reverse().map((it: any) => [1, 2].includes(it.winnerCode) ? ([it.homeTeam, it.awayTeam][it.winnerCode - 1].id == teamId ? "W" : "L") : "D");
              }
            }
            setLatestMatches(teams)
          } catch (error) {

          }
        }
        try {
          getLatestMatches(selectTournament.uniqueTournament.id, selectSeason.id, filter);
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournament/${selectTournament.id}/season/${selectSeason.id}/standings/${filter}`, {})
          if (response.ok) {
            const data = await response.json()
            setStandings(data.standings)
            setWaitdata2(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [filter, selectSeason, selectTournament])



  return (
    <div className='bg-[#ffffff] MYDeg rounded-2xl'>
      <div className="w-full text-center text-lg font-semibold  pb-5 pt-2">{'Standings'}</div>
      <div className="">
        <SelectTournamentAndSeasson
          team={team}
          selectTournament={selectTournament}
          selectSeason={selectSeason}
          setSelectTournament={setSelectTournament}
          setSelectSeason={setSelectSeason}
          waitdata={waitdata}
          setWaitdata={setWaitdata}
        />
      </div>
      {
        !waitdata2 && standings && team ? standings.filter((_standing) => _standing.rows.find((item) => item.team.id == team.id)).map((standing, index) =>
          <div key={index} className="">
            <div className="flex">
              <div className={` w-full`}>

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
                <div className="  truncate flex items-center space-x-2  p-2 translate-x-6 ">
                  <DisplayImage onErrorImage='tournament' className='w-7 h-7' alt={'tournament:' + standing.tournament.uniqueTournament.name} src={`https://api.sofascore.app/api/v1/unique-tournament/${standing.tournament.uniqueTournament.id}/image`} width={500} height={500} />
                  <div className="truncate text-xl font-medium">
                    {standing.tournament.isGroup ? standing.tournament.groupName : standing.tournament.uniqueTournament.name} {standing.tournament.isGroup ? selectSeason?.year : ''}
                  </div>
                </div>
                <div className="w-full  overflow-x-auto whitespace-nowrap hideScroll">
                  <div className="min-w-[360px]">
                    <div className=" w-full flex py-1 border-b-1 border-gray-200 mb-1 items-center justify-between pr-3 pl-2 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <div className="w-6 text-center ">#</div>
                        <div className="">Team</div>
                      </div>
                      <div className="flex text-xs md:text-sm">
                        <div className="w-10 text-center">P</div>
                        <div className="w-10 text-center">W</div>
                        <div className="w-10 text-center">D</div>
                        <div className="w-10 text-center">L</div>
                        <div className="w-10 text-center">Goals</div>
                        <div className="hidden w-0 md:block md:w-32 text-center">Last 5</div>
                        <div className="w-10 text-center">PTS</div>
                      </div>
                    </div>
                    <div className=" w-full  text-gray-600 text-sm font-medium">
                      {standing.rows.map((item, index) =>
                        <Link href={`/ma/team/${item.team.slug}/${item.team.id}`} key={index} className={`${item.team.id == team?.id ? 'bg-blue-950/10' : ''} w-full flex items-center justify-between space-x-2 hover:bg-custom-default-hover pr-3 pl-2 py-1.5 `}>
                          <div className=" flex items-center space-x-1 ">
                            <div className="w-6">
                              <div className={`w-[22px] h-[22px]  text-[12px] rounded-full bg-green-600   text-white font-black  flex justify-center items-center`}>
                                {item.position}
                              </div>
                            </div>
                            <DisplayImage onErrorImage='team' className='w-6' src={`https://sofascore.com/api/v1/team/${item.team?.id}/image`} alt='/h' width={400} height={400} />
                            <div className=" text-start w-auto block md:w-0 md:hidden  text-xs md:text-sm">{item.team?.shortName.slice(0, 6)}..</div>
                            <div className=" text-start md:w-auto md:block w-0 hidden  text-xs md:text-sm">{item.team?.shortName}</div>                        </div>
                          <div className=" flex  text-xs md:text-sm">
                            <div className="w-10 text-center">{item.matches}</div>
                            <div className="w-10 text-center">{item.wins}</div>
                            <div className="w-10 text-center">{item.draws}</div>
                            <div className="w-10 text-center">{item.losses}</div>
                            <div className="w-10 text-center">{item.scoresFor}:{item.scoresAgainst}</div>
                            <div className="hidden w-0 md:block md:w-32 text-center ">
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
                            <div className="w-10 text-center">{item.points}</div>
                          </div>
                        </Link>)}
                    </div >
                  </div >
                </div >

              </div >
            </div>
            <div className="px-4 py-7 text-sm font-light">
              <div className="">{standing.tieBreakingRule?.text}</div>
            </div>
          </div >
        ) :
          <div className="bg-[#ffffff] MYDeg rounded-2xl">
            < Shi_standings />
          </div>
      }
    </div>

  )
}

export default StandingsTeam