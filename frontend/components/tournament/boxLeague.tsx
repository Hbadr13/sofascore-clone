import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'


export interface StandingsProps {
  featuredEvent: EventAPIJson | undefined
}

const Standings = ({ featuredEvent }: StandingsProps) => {

  const [standings, setStandings] = useState<StandingsAPIJson | null>(null)
  const [filter, setFilter] = useState<string>('total')
  const [selectedKeys, setSelectedKeys] = React.useState("Short");
  const [waitdata, setWaitdata] = React.useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          if (featuredEvent == null)
            return
          setWaitdata(true)
          const response = await fetch(`https://sofascore.com/api/v1/tournament/${featuredEvent.tournament.id}/season/${featuredEvent.season.id}/standings/${filter}`, {})
          if (response.ok) {
            const data = await response.json()
            setStandings(data.standings[0])
            setWaitdata(false)
          }

        } catch (error) {

        }
      }
    )()
  }, [filter, featuredEvent])
  return (
    <div className="">
      <div className="w-full text-center text-lg font-semibold py-6">Standings</div>
      <div className="flex px-5 text-sm  mb-7">
        <div className="w-1/4 flex items-center justify-between">
          <button onClick={() => setFilter('total')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'total' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>ALL</button>
          <button onClick={() => setFilter('home')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'home' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>HOME</button>
          <button onClick={() => setFilter('away')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'away' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>AWAY</button>
        </div>
        <div className="w-3/4 flex justify-end items-center space-x-2">
          <button className={`py-1px-2 rounded-lg border-1  bg-blue-500/25te text-gray-700 bg-slate-100`}>
            <Image className=' p-1 otate-90' width={30} height={30} src={'/image/rise.png'} alt='' />
          </button>
        </div>
      </div>
      {
        !waitdata ? <>
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
              {standings?.rows.map((item, index) =>
                <Link href={`/ma/team/${item.team.slug}/${item.team.id}`} key={index} className=" w-full flex items-center justify-between space-x-2 hover:bg-custom-default-hover pr-3 pl-2">
                  <div className=" flex items-center space-x-1">
                    <div className="w-6">
                      <div className={`w-[22px] h-[22px]  text-[12px] rounded-full bg-green-600   text-white font-black  flex justify-center items-center`}>
                        {item.position}
                      </div>
                    </div>
                    <DisplayImage onErrorImage='team' className='w-6' src={`https://sofascore.com/api/v1/team/${item.team.id}/image`} alt='/h' width={400} height={400} />
                    <div className=" text-start text-sm">{item.team.shortName}</div>
                  </div>
                  <div className=" flex ">
                    <div className="w-10">{item.matches}</div>
                    <div className="w-10">{item.wins}</div>
                    <div className="w-10">{item.draws}</div>
                    <div className="w-10">{item.losses}</div>
                    <div className="w-10 ">{item.scoresFor}:{item.scoresAgainst}</div>
                    <div className="w-32">scoresAgainst</div>
                    <div className="w-10">{item.points}</div>
                  </div>
                </Link>)}
            </div>
          </div >
          <div className="px-4 py-10 text-sm font-light">
            <div className="">{standings?.tieBreakingRule.text}</div>
          </div>
        </> : <Shi_standings />

      }
    </div >
  )
}

export default Standings
