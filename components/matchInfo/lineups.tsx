import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { ManagerAPIJson } from '@/interface/api/managers'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { LineupsAPIJson, PlayerAPIJson } from '@/interface/api/lineups'
import Shimmer_lineups from '../shimmer/shi_lineups'
import LineupsMap from './lineupsMap'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'

export interface MatchLineupsProps {
  currentMatch: null | MatchDetailsAPIJson
}

const MatchLineups = ({ currentMatch }: MatchLineupsProps) => {
  const [managers, setManagers] = useState<ManagerAPIJson | null>(null)
  const [lineups, setLineups] = useState<LineupsAPIJson>()
  const [incidents, setincidents] = useState<any[]>([])
  const [selectTeam, setselectTeam] = useState<string>('home')
  const [waitdata, setWaitdata] = useState<boolean>(true)

  useEffect(() => {
    (
      async () => {
        try {
          if (currentMatch == null)
            return
          setWaitdata(true)
          setLineups(undefined)
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/lineups`, {});
          if (response.ok) {
            const data = await response.json()
            setLineups(data)
            setWaitdata(false)
          }
        } catch (error) {
        }
      }
    )()
  }, [currentMatch])

  useEffect(() => {
    (
      async () => {
        try {
          if (currentMatch == null)
            return
          setWaitdata(true)
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/incidents`, {});
          if (response.ok) {
            const data = await response.json()
            setincidents(data.incidents)
            setWaitdata(false)
          }
        } catch (error) {

        }
      }
    )()
  }, [currentMatch])
  useEffect(() => {
    (
      async () => {
        try {
          if (currentMatch == null)
            return
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/managers`, {});
          if (response.ok) {
            const data = await response.json()
            setManagers(data)
          }
        } catch (error) {

        }
      }
    )()
  }, [currentMatch])

  if (waitdata)
    return <Shimmer_lineups />
  return (
    <div className='pt-2'>
      <div>
        <div className="flex px-4 space-x-4 my-4">
          <button onClick={() => setselectTeam('home')} className={`w-1/2 h-9  rounded-xl flex justify-center items-center ${selectTeam == 'home' ? ' bg-blue-100' : 'bg-slate-100'}`}>
            <div className="w-7">
              <DisplayImage onErrorImage='team' className='' width={300} height={300} alt='club' src={`https://sofascore.com/api/v1/team/${currentMatch?.homeTeam.id}/image`} />
            </div>
          </button>
          <button onClick={() => setselectTeam('away')} className={`w-1/2 h-9  rounded-xl flex justify-center items-center ${selectTeam == 'away' ? ' bg-blue-100' : 'bg-slate-100'}`}>
            <div className="w-7">
              <DisplayImage onErrorImage='team' className='' width={300} height={300} alt='club' src={`https://sofascore.com/api/v1/team/${currentMatch?.awayTeam.id}/image`} />
            </div>
          </button>
        </div>

        <div className="px-4">
          <Link href={`/manger/${selectTeam == 'home' ? managers?.homeManager.slug : managers?.awayManager.id}/${selectTeam == 'home' ? managers?.homeManager.slug : managers?.awayManager.id}`} className="flex items-center space-x-2 w-full  bg-gray-200/60  rounded-xl p-2">
            <div className="w-10">
              <DisplayImage onErrorImage='manager' className='rounded-full' src={`https://api.sofascore.app/api/v1/manager/${selectTeam == 'home' ? managers?.homeManager.id : managers?.awayManager.id}/image`} width={200} height={200} alt='' />
            </div>
            <div className="text-sm   text-start">
              <div className="text-gray-700">{selectTeam == 'home' ? managers?.homeManager.name : managers?.awayManager.name}</div>
              <div className="text-green-500">Manager</div>
            </div>
          </Link>
        </div>
        <LineupsMap currentMatch={currentMatch} />

        <div className="px-4 my-2">
          <div className="text-center">Substitutions</div>
          {selectTeam == 'home' ?
            lineups?.home.players.map((item, index) =>
              item.substitute && <Link href={`/ma/player/${item.player.slug}/${item.player.id}`}
                key={index}
                className="flex items-start space-x-2 w-full border-b-[1px] border-gray-200  rounded-xl p-2">
                <div className="w-10">
                  <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
                </div>
                <div className="text-sm  h-10  text-start space-y-">
                  <div className="text-gray-700">{item.player.name}</div>
                  <CheckSubstitutions item={item} incidents={incidents} />
                </div>
              </Link>
            ) :
            lineups?.away.players.map((item, index) =>
              item.substitute && <Link href={`/ma/player/${item.player.slug}/${item.player.id}`}
                key={index}
                className="flex items-center space-x-2 w-full  border-b-[1px] border-gray-200  rounded-xl p-2">
                <div className="w-10">
                  <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
                </div>
                <div className="text-sm   text-start -space-y-2">
                  <div className="text-gray-700">{item.player.name}</div>
                  <CheckSubstitutions item={item} incidents={incidents} />
                </div>
              </Link>
            )
          }
        </div>
        <div className="px-4 my-2">
          <div className="text-center">Missing players</div>
          {selectTeam == 'home' ?
            lineups?.home.missingPlayers && lineups?.home.missingPlayers.map((item, index) =>
              <Link href={`/ma/player/${item.player.slug}/${item.player.id}`} key={index} className="flex items-center space-x-2 w-full border-b-[1px] border-gray-200  rounded-xl p-2">
                <div className="w-10">
                  <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
                </div>
                <div className="text-sm   text-start -space-y-2">
                  <div className="text-gray-700">{item.player.name}</div>
                  <div className="  flex items-center space-x-1">
                    <span className='font-[2000] text-red-600 text-3xl'>
                      +
                    </span>
                    <span className='text-lg text-red-500 font-normal relative top-0.5'>
                      out
                    </span>
                  </div>
                </div>
              </Link>
            ) :
            lineups?.away?.missingPlayers && lineups?.away?.missingPlayers.map((item, index) =>
              <Link href={`/ma/player/${item.player.slug}/${item.player.id}`} key={index} className="flex items-center space-x-2 w-full  border-b-[1px] border-gray-200  rounded-xl p-2">
                <div className="w-10">
                  <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
                </div>
                <div className="text-sm   text-start -space-y-2">
                  <div className="text-gray-700">{item.player.name}</div>
                  <div className="  flex items-center space-x-1">
                    <span className='font-[2000] text-red-600 text-3xl'>
                      +
                    </span>
                    <span className='text-lg text-red-500 font-normal relative top-0.5'>
                      out
                    </span>
                  </div>
                </div>
              </Link>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default MatchLineups


const CheckSubstitutions = ({ item, incidents }: { item: PlayerAPIJson, incidents: any[] }) => {
  const player = incidents.find((itm) => itm?.playerIn?.id == item.player.id)
  if (player != undefined)
    return (
      <div className="  flex items-center space-x-1">
        <span className='font-[2000] text-green-600 text-2xl'>
          <Image className='w-3.5 h-3.5' alt='subs' src={'/image/repost.png'} width={400} height={400} />
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          {player.time}{`'`}
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          out:
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          {player.playerOut.shortName}
        </span>
      </div>
    )
  return <div className=""></div>
}

