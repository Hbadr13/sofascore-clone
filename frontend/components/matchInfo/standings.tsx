import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'
import { EventAPIJson } from '@/interface/api/event'
import SvgIcons from '@/utils/svgIcons'


export interface StandingsProps {
  currentMatch: MatchDetailsAPIJson | EventAPIJson | null
  type: 'small' | 'big'
}

const Standings = ({ currentMatch, type }: StandingsProps) => {

  const [standings, setStandings] = useState<StandingsAPIJson | null>(null)
  const [filter, setFilter] = useState<string>('total')
  const [selectedKeys, setSelectedKeys] = React.useState("Short");
  const [waitdata, setWaitdata] = React.useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          if (currentMatch == null)
            return
          setWaitdata(true)
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournament/${currentMatch.tournament.id}/season/${currentMatch.season.id}/standings/${filter}`, {})
          if (response.ok) {
            const data = await response.json()
            setStandings(data.standings[0])
            setWaitdata(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [filter, currentMatch])
  if (waitdata)
    return <Shi_standings />
  return (

    <div className="">
      <div className={`flex px-5 text-sm  ${type == 'small' ? 'my-5' : ''}`}>
        <div className="w-1/2 flex items-center justify-between">
          <button onClick={() => setFilter('total')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'total' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>ALL</button>
          <button onClick={() => setFilter('home')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'home' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>HOME</button>
          <button onClick={() => setFilter('away')} className={`py-1 px-2 rounded-lg border-1 ${filter == 'away' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>AWAY</button>
        </div>
        {type == 'small' && <div className="w-1/2 flex justify-end items-center space-x-2">
          <Dropdown className='w-5'>
            <DropdownTrigger>
              <Button
                size='sm'
                variant="bordered"
                className="capitalize"
              >
                <SvgIcons iconName='menu-1' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu

              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode='single'
              selectedKeys={selectedKeys}
              onSelectionChange={(key: any) => setSelectedKeys(key)}
            >
              <DropdownItem key="Short">Short</DropdownItem>
              <DropdownItem key="Full">Full</DropdownItem>
              <DropdownItem key="Form">Form</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="h-full w-[1px] bg-gray-400"></div>
          <button className={`p-1 rounded-lg border-1  bg-blue-500/25te text-gray-700 bg-slate-100`}>
            <SvgIcons iconName='decrease' />
          </button>
        </div>}
      </div>
      <div>
        <div className=" space-y-2 text-gray-600">

          {standings?.rows.map((item, index) =>
            <Link href={`/ma/team/${item.team.slug}/${item.team.id}`} key={index} className=" w-full flex items-center space-x-2 hover:bg-custom-default-hover pr-3 pl-2">
              <div className="w-[22px] h-[22px] text-[12px] rounded-full bg-green-600  text-white font-black  flex justify-center items-center">
                {item.position}</div>
              <DisplayImage onErrorImage='team' className='w-6' src={`https://sofascore.com/api/v1/team/${item.team.id}/image`} alt='/h' width={400} height={400} />
              <div className="w-[30%] text-start text-sm">{item.team.shortName}</div>
              <div className="w-[50%]  flex justify-between">
                <div className="">{item.matches}</div>
                <div className="">{item.wins}</div>
                <div className="">{item.draws}</div>
                <div className="">{item.losses}</div>
                <div className="">{item.scoresFor}:{item.scoresAgainst}</div>
                <div className="">{item.points}</div>
              </div>
            </Link >)}
        </div>
      </div >
      <div className="px-4 py-10 text-sm font-light">
        <div className="">{standings?.tieBreakingRule.text}</div>
      </div>
    </div>
  )
}

export default Standings