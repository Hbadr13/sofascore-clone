
import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import Link from 'next/link'
import MatchOverview from '../homePage/matchOverview'
import { useCurrentMatch } from '@/context/EventDateContext'
import { CustomScroll } from 'react-custom-scroll'
import { LeagueInfoAPIJson } from '@/interface/api/LeagueInfo'
import { PlayerAPIJson } from '@/interface/api/player'
import moment from 'moment'
import { IPlayerCharacteristics } from '@/interface/api/characteristics'
import PlayerAttributeOverview from './PlayerAttributeOverview'
import DisplayImage from '@/utils/displayImage'



const SoccerField = () => {
  return (
    <svg width="120" height="180" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <rect fill="#cbedbf" width="120" height="180" rx="4">
        </rect>
        <path stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" d="M4 4h112v86H4z"></path>
        <path d="M72 90c0-6.627-5.373-12-12-12s-12 5.373-12 12M31 4h58v26H31zM50 30c.156.28.322.555.499.82 2.084 3.13 5.562 5.18 9.5 5.18 3.942 0 7.422-2.052 9.505-5.184.176-.264.34-.537.496-.816" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path>
        <path stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" d="M46 4h28v8H46z"></path>
        <circle cx="1" cy="1" r="1" transform="translate(59 22)" fill="#ffffff"></circle>
        <path d="M4 8a4 4 0 0 0 4-4M112 4a4 4 0 0 0 4 4" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path>
        <g>
          <path stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" d="M4 176h112V90H4z"></path>
          <path d="M72 90c0 6.627-5.373 12-12 12s-12-5.373-12-12M31 176h58v-26H31zM50 150c.156-.28.322-.555.499-.82 2.084-3.13 5.562-5.18 9.5-5.18 3.942 0 7.422 2.052 9.505 5.184.176.264.34.537.496.816" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path>
          <path stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" d="M46 176h28v-8H46z"></path>
          <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 59 158)" fill="#ffffff"></circle>
          <path d="M4 172a4 4 0 0 1 4 4M112 176a4 4 0 0 1 4-4" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"></path>
        </g>
      </g>
      < g width="100%" height="100%" className=" top-10  left-0  bg-red-500">
        <g >
          <circle cx="60" cy="20" r="12" fill="#ffffff"></circle>
          <text y="20" x="60" fill="#c7921f" dy="4" style={{ fontSize: 10, fontWeight: 200 }} textAnchor="middle">ST</text>
        </g>
        <g >
          <circle cx="95" cy="34" r="12" fill="#ffffff"></circle>
          <text y="34" x="95" fill="#c7921f" dy="4" style={{ fontSize: 10, fontWeight: 200 }} textAnchor="middle">RW</text>
        </g>
      </g>
    </svg >
  )

}

const PlayerAttributes = ({ attribute, value }: { attribute: string | undefined | number, value: string | undefined | number }) => {
  return <div className='flex flex-col items-center w-1/3'>
    <div className="opacity- text-on-surface-nLv3 text-[10.5px]">{attribute}</div>
    <div className="font-semibold text-on-surface-nLv1">{value}</div>
  </div>
}





interface PlayerInfoProps {
  player: PlayerAPIJson | null

}


const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const [characteristics, setCharacteristics] = useState<IPlayerCharacteristics | null>();
  const [waitdata, setWaitdata] = React.useState(true);
  const player_attributes = [
    "Anchor play",
    "Penalty taking",
    "Direct free kicks",
    "Long shots",
    "Finishing",
    "Passing",
    "Playmaking",
    "Tackling",
    "Ball interception",
    "Consistency",
    "Crossing",
    "Long balls",
    "Ball control",
    "Ground duels",
    "Aerial duels",
    "Error proneness",
    "Discipline",
    "Penalty saving",
    "Reflexes",
    "Runs out",
    "High claims",
    "Handling",
    "Long shots saving",
    "Positioning",
    "High pressing"
  ]
  useEffect(() => {

    const getTheCharacteristicsOfPlayer = async () => {
      try {
        if (!player)
          return
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/player/${player.id}/characteristics`, {})
        if (response.ok) {
          const data: any = await response.json()
          setCharacteristics(data)
        }
      } catch (error) {

      }
    }
    getTheCharacteristicsOfPlayer()
  }, [player])


  return (
    <div className="bg-[#ffffff] bg-green- MYDeg rounded-2xl flex flex-col">
      <div className=" flex  flex-col tablet:flex-row  bg-red-40  rounded-2xl    w-full ">
        <div className={` w-full  ${!player?.retired ? 'tablet:w-1/2' : 'w-full'} `}>

          <div className={`${player?.retired ? 'flex  flex-col tablet:flex-row' : 'block'} `}>
            <div className={`${player?.retired ? ' w-full tablet:w-3/5' : 'w-full'}`}>
              <div className="border-b-1   ">
                <Link onClick={e => !eval && e.preventDefault()} href={`/ma/team/${player?.team.slug}/${player?.team.id}`} className="space-x-2  flex items-center py-2 pl-4">
                  <DisplayImage onErrorImage='team' className='w-10 h-10' alt='' width={1000} height={1000} src={`https://sofascore.com/api/v1/team/${player?.team.id}/image`} />
                  {
                    player?.retired ? <div className="">
                      <div className="font-semibold">Retired</div>
                    </div> :
                      <div className="">
                        <div className="font-semibold">{player?.team.name}</div>
                        <div className="text-xs  opacity-55">Contract until {player && moment(player.contractUntilTimestamp * 1000).format('ll')}</div>
                      </div>
                  }
                </Link>
              </div>
              <div className=" space-y-2 py-2 ">
                <div className="flex justify-evenly items-center">
                  <PlayerAttributes attribute='NATIONALITY' value={player?.country.alpha2} />
                  <PlayerAttributes attribute={player ? moment(player.dateOfBirthTimestamp * 1000).format('ll') : 'Age'} value={player ? moment(player.dateOfBirthTimestamp * 1000).fromNow().split(' ')[0] + ' yrs' : ''} />
                  <PlayerAttributes attribute='HEIGHT' value={player ? player.height + ' cm' : ''} />
                </div>
                <div className="flex justify-evenly items-center">
                  <PlayerAttributes attribute='PREFERRED FOOT' value={player?.preferredFoot} />
                  <PlayerAttributes attribute='POSITION' value={player?.position} />
                  <PlayerAttributes attribute='SHIRT NUMBER' value={player?.shirtNumber} />
                </div>
              </div>
              <div className={`${player?.retired ? 'hidden' : 'block'}  m-2 flex items-center p-2 bg-surface-s2  rounded-xl space-x-2`}>
                <div className="w-1/4 text-center ">
                  <div className="text-on-surface-nLv3 text-sm">PLAYER VALUE</div>
                  <div className="text-sofa-singles-value font-semibold">
                    {
                      player ? `${player.proposedMarketValue / 1000000}M €` : ' '
                    }
                  </div>
                </div>
                <div className={` flex items-center justify-between  w-3/4`}>
                  <div className="text-xs">
                    Is player value higher or lower?
                  </div>
                  <div className="flex space-x-2">
                    <button className='w-10 h-10 text-on-surface-nLv3 text-sm bg-white border-1 rounded-full border-blue-700'>yes</button>
                    <button className='w-10 h-10 text-on-surface-nLv3 text-sm bg-white border-1 rounded-full border-blue-700'>no</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${player?.retired ? 'w-full tablet:w-2/5' : 'w-full'} p-2`}>
              {characteristics && <div className={`flex items-center ${player?.retired ? 'justify-center' : 'justify-around'} p-3 bg-surface-s2 rounded-xl space-x-2  mt-4`}>
                <div className={`${!player?.retired ? 'block p-2' : 'hidden'} `}>
                  <div className="text-secondary-hover font-semibold">
                    Strengths
                  </div>
                  <div className="opacity-80">
                    {
                      characteristics.positions.length ? characteristics.positive.map((item, index) => <div key={index}>{player_attributes[item.type]}</div>) :
                        <div className='text-sm'>No outstanding strengths</div>

                    }
                  </div>
                  <div className="text-red-500 font-semibold mt-4">
                    Weaknesses
                  </div>
                  <div className=" opacity-80">
                    {
                      characteristics.negative.length ? characteristics.negative.map((item, index) => <div key={index}>{player_attributes[item.type]}</div>)
                        :
                        <div className='text-sm'>No outstanding weaknesses</div>
                    }
                  </div>
                </div>
                <div className="">
                  <SoccerField />
                </div>
              </div>
              }
            </div>
          </div>
        </div >
        {
          !player?.retired && <div className="w-full tablet:w-1/2  border-l-1">
            <PlayerAttributeOverview player={player} />
          </div>
        }
      </div >
    </div >
  )
}

export default PlayerInfo

