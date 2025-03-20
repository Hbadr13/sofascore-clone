'use client'
import { Image } from '@nextui-org/react';

import { EventAPIJson } from '@/interface/api/event'
import { StandingsAPIJson } from '@/interface/api/standings'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PlayerCard from '@/components/player/playerCard'
import { PlayerAPIJson } from '@/interface/api/player'
import PlayerInfo from '@/components/player/playerInfo'
import MatchesOfplayer from '@/components/player/matchesOfplayer'
import TransferHistory from '@/components/player/transferHistory'
import SeassonStatistics from '@/components/player/seassonStatistics '
import PlayerProfile from '@/components/player/playerProfile'
import { Button } from '@nextui-org/react'
import NationalTeam from '@/components/player/nationalTeam'
import PLayerSummary from '@/components/player/summary'
const Page = () => {
  const [standings, setStandings] = useState<StandingsAPIJson[] | null>(null)
  const [waitdata, setWaitdata] = useState('wait')
  const [currentTab, setCurrentTab] = useState('DETAILS')
  const pathname = useParams<{ playerName: string, id: string }>()
  const [featuredEvent, setFeaturedEvent] = useState<EventAPIJson>()
  const router = useRouter()
  const searchParams = useSearchParams();
  const [player, setPlayer] = useState<PlayerAPIJson | null>(null)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const tabs = ['DETAILS', 'STATISTICS', 'MATCHES']
  useEffect(() => {
    const getThePlayerById = async () => {
      try {

        const playerId = Number(pathname.id)
        if (isNaN(playerId))
          throw ('playerIdNotFound')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/player/${playerId}`, {})
        if (response.ok) {
          const data = await response.json()
          if (data.player.slug != pathname.playerName)
            router.push(`/ma/player/${data.player.slug}/${data.player.id}`)
          setPlayer(data.player)
        }
      } catch (error) {
        setWaitdata('error')
      }
    }
    getThePlayerById()
  }, [pathname, router])


  if (waitdata == 'error')
    return <div className='h-screen w-full flex  justify-center items-center'>Not Found</div>
  return (
    <>
      <main className=" mb-20 tablet:mb-0  w-full  flex flex-col items-center justify-start bg-[#edf1f6] text-on-surface-nLv1 b-black">
        <div className=" bg-white tablet:bg-[#edf1f6] w-full desktop:w-[1344px] tablet:w-[992px] flex space-x-0 tablet:space-x-5 px-3 ">
          <div className=" font-bold text-xs tablet:text-sm  my-2 flex truncate">
            <div className='text-blue-500 flex items-center space-x-0.5'>
              <div className="">Soccer</div>
              <div className="w-[16px]">
                <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
              </div>
            </div>
            {
              player && !player.retired && player.team.tournament && <div className='text-blue-500 flex items-center space-x-0.5'>
                <div className="">{player.team.tournament.category.name}</div>
                <div className="w-[16px]">
                  <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                </div>
              </div>
            }
            <div className=''>
              <span className='text-blue-500'>{player && !player.retired && player.team.tournament ? player.team.tournament.name : ''}</span><span className='opacity-50'> {player?.name} stats, ratings and goals</span>
            </div>
          </div>
        </div>

        {
          windowWidth < 992 ?
            <div className="w-full ">
              <PlayerCard player={player} />
              <div className="w-full overflow-x-auto whitespace-nowrap hideScroll flex items-center bg-white">
                {tabs.map((tab, index) => <button key={index} onClick={() => setCurrentTab(tab)} className={` min-w-24 ${currentTab == tab ? 'text-blue-600 border-b-blue-600 font-semibold border-b-2' : 'text-blue-400 border-b-blue-300 border-b-1'} text-sm w-1/3 py-3 `}>{tab}</button>)}
              </div>
              <div className="mt-3">

                {
                  currentTab == 'DETAILS' ?
                    <div className="  w-full  px-3 space-y-3">
                      <PlayerInfo player={player} />
                      <PLayerSummary player={player} />
                      <TransferHistory player={player} />
                      <NationalTeam player={player} />
                      <PlayerProfile player={player} />
                    </div> :
                    currentTab == 'STATISTICS' ?
                      <div className=" relative  w-full px-2">
                        <SeassonStatistics player={player} />
                      </div> :
                      <div className=" w-full px-2">
                        <MatchesOfplayer player={player} />
                      </div>
                }
              </div>
            </div>
            : <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex items-start space-x-0 tablet:space-x-5 ">
              <div className=" w-[100%] tablet:w-[645px] desktop:w-[880px]   space-y-5 ">
                <PlayerCard player={player} />
                <PlayerInfo player={player} />
                <MatchesOfplayer player={player} />
                <PLayerSummary player={player} />
                <TransferHistory player={player} />
                <NationalTeam player={player} />
                <div className="block tablet:hidden">
                  <PlayerProfile player={player} />
                </div>
              </div>
              <div className=" relative  hidden tablet:block   tablet:w-[323px] desktop:w-[432px]   rounded-2xl  space-y-5">
                <SeassonStatistics player={player} />
                <div className="hidden tablet:block">
                  <PlayerProfile player={player} />
                </div>
              </div>
            </div>
        }
      </main>
    </>
  )
}

export default Page
