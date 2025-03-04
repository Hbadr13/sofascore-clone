import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import { RoundsTeamOfWeekAPIJson } from '@/interface/api/TeamOfWeekRounds'
import { teamOfTheWeekAPIJson } from '@/interface/api/teamOfTheWeek'
import LeagueInfo from './leagueInfo'
import Shimmer_TeamOfTheWeek from '../shimmer/shimmer_TeamOfTheWeek'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'


export const CountUpAnimation = ({
  initialValue,
  targetValue,
}: any) => {
  const [count, setCount] = useState(initialValue);
  const duration = 300; // 4 seconds

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(
      duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) {
        setCount(targetValue);
        clearInterval(counter);
      }
    }, interval);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue, initialValue]);

  return (
    <span className="num">{count}</span>
  );
};



export interface RoundsButtonProps { rounds: RoundsTeamOfWeekAPIJson[] | undefined, setSelectRound: (selectRound: any) => void, selectRound: any }


export const RoundsButton = ({ rounds, setSelectRound, selectRound }: RoundsButtonProps) => {
  if (!rounds)
    return <></>
  return (
    <CustomDropdown
      buttonStyle=' w-44'
      buttonContent={
        <div className="  w-28 truncate ">
          {selectRound}
        </div>
      }
      CustomDropdownStyle={{
        right: '-5px'
      }}
      CustomDropdownContent={
        rounds.map((item, index) => (
          <button key={index} onClick={() => { setSelectRound(item.roundName) }} className={`  ${selectRound == item.roundName ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
            <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
              {item.roundName}
            </div>
            {
              selectRound == item.roundName &&
              <div className="w-[20px] h-[20px] ">
                <SvgIcons iconName='OKy' />
              </div>
            }
          </button>
        ))

      } />
  )
}


interface TopTeamsProps {
  tournamentId: number
  featuredEvent: EventAPIJson | null
  seasonId: string | null
}

function lastIndex(lineupsTeam: teamOfTheWeekAPIJson, columnIndex: number): number {
  let result = 1; // Goalkeeper
  if (columnIndex > 0) for (const length of lineupsTeam.formation.split("-").filter((_, i) => i < columnIndex).map(value => parseInt(value))) result += length;
  return result;
}


const LineupPlayer = ({ teamOfTheWeek, index }: { teamOfTheWeek: teamOfTheWeekAPIJson, index: number }) => {
  return <div className=' relative'>
    <Link href={`/ma/player/${teamOfTheWeek?.players[index]?.player.slug}/${teamOfTheWeek?.players[index]?.player.id}`} className="w-[60px] h-full  rounded-xl flex  flex-col items-center space-y-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full">
        <DisplayImage onErrorImage='player' width={400} height={400} className=" rounded-full " src={`https://api.sofascore.app/api/v1/player/${teamOfTheWeek?.players[index].player.id}/image`} alt="" />
      </div>
      <div className=" truncate text-[10px] font-medium">
        {teamOfTheWeek?.players[index]?.player.shortName}
      </div>
    </Link>
    <div className={` scale-80 absolute bottom-[17px] -left-2  flex justify-center items-center`}>
      <DisplayRating rating={teamOfTheWeek?.players[index]?.rating} type='in' />
    </div>
    <div className="  w-6 h-6 rounded-md absolute bottom-[16px]  -right-1.5 text-white  ">
      <DisplayImage onErrorImage='team' width={400} height={400} className=" rounded-full " src={`https://api.sofascore.app/api/v1/team/${teamOfTheWeek?.players[index]?.team.id}/image`} alt="" />

    </div>
  </div>
}

const TeamOfTheWeek = ({ featuredEvent, tournamentId, seasonId }: TopTeamsProps) => {
  const [selectRound, setSelectRound] = useState<string>('')
  const [rounds, setRounds] = useState<RoundsTeamOfWeekAPIJson[]>()
  const [teamOfTheWeek, setTeamOfTheWeek] = useState<teamOfTheWeekAPIJson>()

  const [waitdata, setWaitdata] = useState('wait')

  useEffect(() => {
    (
      async () => {
        try {

          if (featuredEvent == null)
            return
          let api = ''
          api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/team-of-the-week/rounds`
          // }
          const response = await fetch(api, {})
          if (response.ok) {
            const data = await response.json()
            setRounds(data.rounds)
            setSelectRound(data.rounds[0].roundName)
          }
        } catch (error) {

        }
      }
    )()
  }, [featuredEvent])
  useEffect(() => {

    const getTheteamOfTheWeek = async () => {
      try {
        if (featuredEvent == null || !selectRound || !rounds)
          return
        const round = rounds.find((item) => item.roundName == selectRound)
        setWaitdata('wait')
        if (!round)
          return
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/team-of-the-week/${round?.id}`, {})
        if (response.ok) {
          const data = await response.json()
          setTeamOfTheWeek(data)
          setWaitdata('done')
        }
      } catch (error) {
        setWaitdata('error')
      }
    }
    getTheteamOfTheWeek()
  }, [featuredEvent, rounds, selectRound])

  if (waitdata == 'error')
    return <div />
  return (
    <div className="MYDeg  h-[512px] w-full bg-[#ffffff] rounded-2xl  space-y-2  p-2">
      <div className=" pb-4 h-16 flex items-center justify-between p-1">
        <div className=" text-slate-800  ">
          <p className=" text-[20px]">Team of the week</p>
        </div>
        <RoundsButton rounds={rounds} setSelectRound={setSelectRound} selectRound={selectRound} />
      </div>
      {
        waitdata == 'wait' ? <Shimmer_TeamOfTheWeek /> : <div className='h-[384px] w-full  rounded-md relative'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
              <div key={index} className={`w-full h-[48px] ${item % 2 == 1 ? 'bg-[#cbedbf]' : 'bg-[#c1e1b6]'} `} />
            )
          }
          <div className=' w-full h-full  absolute z-10 top-0 overflow-hidden'>
            <div className="w-full  flex justify-center absolute z-10 -top-[70px]">
              <div className=" h-[140px] w-[140px]  border-2 border-white rounded-full"></div>
            </div>
            <div className="w-full  flex justify-center absolute z-10 -bottom-1">
              <div className=" w-[150px] h-[53px] border-2 border-white"></div>
            </div>
            <div className="w-full  flex justify-center absolute z-10 -bottom-1">
              <div className=" w-[80px] h-[30px] border-2 border-white"></div>
            </div>
            <div className="w-full  h-[100px]  overflow-hidden flex justify-center absolute z-10 bottom-[48px]">
              <div className=" w-[80px] h-[80px] border-2 border-white rounded-full top-[80px] relative"></div>
            </div>
            <div className=" absolute z-10 -bottom-[25px] -right-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full"></div>
            <div className=" absolute z-10 -bottom-[25px] -left-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full"></div>
          </div>
          <div className=' w-full h-full   absolute z-20 top-0 overflow-hidden'>
            <div className=" absolute  top-2 left-2">
              {teamOfTheWeek?.formation}
            </div>
            <div className={`  flex-1 h-full  flex flex-col-reverse flex-col- w-full  items-center justify-center pb-2`}>
              {teamOfTheWeek && <LineupPlayer teamOfTheWeek={teamOfTheWeek} index={0} />}

              <div
                className={` flex    flex-col-reverse lex-col  h-full w-full  items-cener justify-around`}
              >
                {teamOfTheWeek?.formation.split("-").map((value, i) => (
                  <div key={i} className={`flex flex-row-reverse justify-around `}>
                    {[...Array(parseInt(value))].map((_, j) => (
                      <LineupPlayer key={j} teamOfTheWeek={teamOfTheWeek} index={lastIndex(teamOfTheWeek, i) + j} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      }

    </div >
  )
}

export default TeamOfTheWeek
