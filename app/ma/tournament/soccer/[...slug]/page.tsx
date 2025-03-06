'use client'
import FeaturedMatch from '@/components/homePage/FeaturedMatch'
import Highlights from '@/components/homePage/Highlights'
import Topleagues from '@/components/homePage/Topleagues'
import NotFound from '@/components/homePage/notFound'
import PlayerStatistics from '@/components/tournament/PlayerStatistics'
import TopPlayers from '@/components/tournament/TopPlayers'
import TopStats from '@/components/tournament/TopStats'
import TopTeams from '@/components/tournament/TopTeams'
import LeagueInfo from '@/components/tournament/leagueInfo'
import Matches from '@/components/tournament/matches'
import Seasons from '@/components/tournament/seasons'
import Standings from '@/components/tournament/standings'
import TeamOfTheWeek from '@/components/tournament/teamOfTheWeek'
import { EventAPIJson } from '@/interface/api/event'
import { StandingsAPIJson } from '@/interface/api/standings'
import { isNumeric } from '@/utils/function'
import { isStringNumber } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { redirect, useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

const Page = () => {
  const [standings, setStandings] = useState<StandingsAPIJson[] | null>(null)
  const pathname = useParams<{ slug: string[] }>()
  const [featuredEvent, setFeaturedEvent] = useState<EventAPIJson | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams();
  const tabs = ['STANDINGS', 'DETAILS', 'MATCHES', 'TOP PLAYERS', 'TOP STATS', 'TOP TEAMS']
  const [currentTab, setCurrentTab] = useState('STANDINGS')

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

  const tournamentId = Number(pathname.slug[pathname.slug.length - 1])
  const [seasonId, setSeasonId] = useState<string | null>(searchParams.get('id'))
  useEffect(() => {
    if (!featuredEvent || searchParams.get('id'))
      return
    router.push(`/ma/tournament/soccer/${featuredEvent.tournament.uniqueTournament.category.slug}/${featuredEvent.tournament.uniqueTournament.slug}/${featuredEvent.tournament.uniqueTournament.id}?id=${featuredEvent.season.id}`)
  }, [featuredEvent, router, searchParams])

  useEffect(() => {
    if (searchParams.get('id'))
      setSeasonId(searchParams.get('id'))
  }, [searchParams])
  return (
    <>

      <main className=" w-full  flex flex-col items-center justify-start bg-[#edf1f6] b-black">

        <div className=" overflow-x-auto whitespace-nowrap hideScroll bg-white tablet:bg-[#edf1f6] w-full desktop:w-[1344px] tablet:w-[992px] overflow-hidden px-1 flex space-x-0 tablet:space-x-5 ">
          <div className=" font-bold  text-xs md:text-sm  my-2 flex">
            <div className='text-blue-500 flex items-center space-x-0.5'>
              <div className="">Football</div>
              <div className="w-[16px]">
                <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
              </div>
            </div>
            <div className='text-blue-500 flex items-center space-x-0.5'>
              <div className="">{featuredEvent?.tournament.category.name}</div>
              <div className="w-[16px]">
                <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
              </div>
            </div>
            <div className='opacity-40  truncate overflow-hidden w-full'>
              {featuredEvent?.tournament.name} standings, <span className=''>fixtures, results and stats</span>
            </div>
          </div>
        </div>


        {
          windowWidth < 992 ?
            <div className=" w-full mb-8">
              <Seasons tournamentId={tournamentId} seasonId={seasonId} />
              <div className="w-full overflow-x-auto whitespace-nowrap hideScroll flex items-center bg-white">
                {tabs.map((tab, index) => <button key={index} onClick={() => setCurrentTab(tab)} className={` min-w-24 ${currentTab == tab ? 'text-blue-600 border-b-blue-600 font-semibold border-b-2' : 'text-blue-400 border-b-blue-300 border-b-1'} text-sm w-1/3 py-3 `}>{tab}</button>)}
              </div>
              <div className="px-3 space-y-3 mt-3">
                {
                  currentTab == 'STANDINGS' ?
                    <div className="  w-full space-y-3">
                      <Standings standings={standings} setStandings={setStandings} featuredEvent={featuredEvent} />

                    </div> :
                    currentTab == 'DETAILS' ?
                      <div className=" relative  w-full space-y-3">
                        <FeaturedMatch featuredEvent={featuredEvent} setFeaturedEvent={setFeaturedEvent} tournamentId={tournamentId} seasonId={seasonId} />
                        <TeamOfTheWeek featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                        <LeagueInfo featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />

                      </div> :
                      currentTab == 'MATCHES' ?
                        <div className=" relative  w-full">
                          <Matches pageName='tournament' featuredEvent={featuredEvent} seasonId={seasonId} />
                        </div> :
                        currentTab == 'TOP PLAYERS' ?
                          <div className=" relative  w-full">
                            <TopPlayers featuredEvent={featuredEvent} />
                          </div> :

                          currentTab == 'TOP STATS' ?
                            <div className=" relative  w-full">
                              <TopStats featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                            </div> :
                            currentTab == 'TOP TEAMS' ?
                              <div className=" relative  w-full">
                                <TopTeams featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                              </div> :
                              currentTab == 'STATISTICS' ?
                                <div className=" relative  w-full">
                                  <PlayerStatistics standings={standings} featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                                </div> :
                                <div className=" w-full">
                                </div>
                }
              </div>
              <div className=" hidden">
                <FeaturedMatch featuredEvent={featuredEvent} setFeaturedEvent={setFeaturedEvent} tournamentId={tournamentId} seasonId={seasonId} />
              </div>

            </div>
            :


            <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex items-start space-x-0 tablet:space-x-5 ">
              <div className=" w-[100%] tablet:w-[645px] desktop:w-[880px]   space-y-5 ">
                <Seasons tournamentId={tournamentId} seasonId={seasonId} />
                <Standings standings={standings} setStandings={setStandings} featuredEvent={featuredEvent} />
                <Matches pageName='tournament' featuredEvent={featuredEvent} seasonId={seasonId} />
                <LeagueInfo featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                <PlayerStatistics standings={standings} featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
              </div>

              <div className=" relative  hidden tablet:block   tablet:w-[323px] desktop:w-[432px]   rounded-2xl  space-y-5">
                <TopPlayers featuredEvent={featuredEvent} />
                <TeamOfTheWeek featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                <FeaturedMatch featuredEvent={featuredEvent} setFeaturedEvent={setFeaturedEvent} tournamentId={tournamentId} seasonId={seasonId} />
                <TopStats featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
                <TopTeams featuredEvent={featuredEvent} tournamentId={tournamentId} seasonId={seasonId} />
              </div>
            </div>}


      </main>
    </>
  )
}

export default Page
