'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TeamCard from '@/components/team/teamCard'
import TeamStatistics from '@/components/team/teamStatistics'
import TeamInfo from '@/components/team/teamInfo'
import MatchesOfTeam from '@/components/team/matchesOfTeam'
import AllPlayers from '@/components/player/players'
import { AllPlayersAPIJson } from '@/interface/api/allPlayers'
import AboutTeam from '@/components/team/about'
import TopPlayersInTeam from '@/components/team/topPlayersInTeam'
import StandingsTeam from '@/components/team/standingsTeam'
import RecentForm from '@/components/team/recentForm'

const Page = () => {
  const [waitdata, setWaitdata] = useState('wait')
  const [currentTab, setCurrentTab] = useState('DETAILS')
  const pathname = useParams<{ teamName: string, id: string }>()
  const router = useRouter()
  const [team, setTeam] = useState<ITeamAPIJson | null>(null)
  const [allPlayers, setAllPlayers] = useState<AllPlayersAPIJson | null>(null);

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


  const tabs = ['DETAILS', 'MATCHES', 'STANDINGS', 'SQUAD', 'TOP PLAYERS', 'STATISTICS', 'MEDIA']



  useEffect(() => {
    const getThePlayerById = async () => {
      try {

        const teamId = Number(pathname.id)
        if (isNaN(teamId))
          throw ('playerIdNotFound')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${teamId}`, {})
        if (response.ok) {
          const data = await response.json()
          if (data.team.slug != pathname.teamName)
            router.push(`/ma/team/${data.team.slug}/${data.team.id}`)
          setTeam(data.team)
        }
      } catch (error) {
        setWaitdata('error')
      }
    }
    getThePlayerById()
  }, [pathname, router])


  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        if (team == null)
          return
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/players`, {})
        if (response.ok) {
          const data = await response.json()
          setWaitdata('done')
          setAllPlayers(data)
        }
      } catch (error) {
        setWaitdata('error')
      }
    }
    getAllPlayers()
  }, [team])

  if (waitdata == 'error')
    return <div className='h-screen w-full flex  justify-center items-center'></div>
  return (
    <>
      <main className=" mb-20 tablet:mb-0  w-full  flex flex-col items-center justify-start bg-[#edf1f6] text-on-surface-nLv1 b-black">
        <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex space-x-0 tablet:space-x-5 ">
          <div className="  font-normal tablet:font-bold  text-xs tablet:text-sm  my-2 flex items-center space-x-1 truncate">
            <div className='text-blue-500 flex items-center space-x-0.5'>
              <div className="">Soccer</div>
              <div className="w-[16px]">
                <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
              </div>
            </div>
            {
              team && team.tournament && <div className='text-blue-500 flex items-center space-x-0.5'>
                <div className="">{team.tournament.category.name}</div>
                <div className="w-[16px]">
                  <Image className='  w-[20px] rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                </div>
              </div>
            }
            <div className=''>
              <span className='text-blue-500 '>{team && team.tournament ? team.tournament.name : ''}</span><span className='opacity-50'> {team?.name} scores, fixtures, standings and player stats</span>
            </div>
          </div>
        </div>

        {
          windowWidth < 992 ?
            <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex  flex-col items-start ">
              <TeamCard team={team} />
              <div className="w-full overflow">
                {tabs.map((tab, index) => <button key={index} onClick={() => setCurrentTab(tab)} className={` w-[100px] ${currentTab == tab ? 'text-blue-600 border-b-blue-600 font-semibold border-b-2' : 'text-blue-400 border-b-blue-300 border-b-1'} text-sm  py-3 `}>{tab}</button>)}
              </div>

              {
                currentTab == 'DETAILS' ?
                  <div className="  w-full ">
                    <RecentForm team={team} />
                    <TeamInfo team={team} allPlayers={allPlayers} />
                    <AboutTeam allPlayers={allPlayers} team={team} />
                  </div> :
                  currentTab == 'MATCHES' ?
                    <div className=" relative  w-full">
                      <MatchesOfTeam team={team} />
                    </div> :
                    currentTab == 'STANDINGS' ?
                      <div className=" relative  w-full">
                        <StandingsTeam team={team} />
                      </div> :
                      currentTab == 'SQUAD' ?
                        <div className=" relative  w-full">
                          <AllPlayers allPlayers={allPlayers} setAllPlayers={setAllPlayers} team={team} />
                        </div> :
                        currentTab == 'TOP PLAYERS' ?
                          <div className=" relative  w-full">
                            <TopPlayersInTeam team={team} />
                          </div> :
                          currentTab == 'STATISTICS' ?
                            <div className=" relative  w-full">
                              <TeamStatistics team={team} />
                            </div> :
                            <div className=" w-full">
                            </div>
              }
            </div>
            :
            <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex items-start space-x-0 tablet:space-x-5 ">
              <div className=" w-[100%] tablet:w-[645px] desktop:w-[880px]   space-y-5 ">
                <TeamCard team={team} />
                <StandingsTeam team={team} />
                <TeamInfo team={team} allPlayers={allPlayers} />
                <MatchesOfTeam team={team} />
                <AllPlayers allPlayers={allPlayers} setAllPlayers={setAllPlayers} team={team} />

              </div>
              <div className=" relative  hidden tablet:block   tablet:w-[323px] desktop:w-[432px]   rounded-2xl  space-y-5">
                <RecentForm team={team} />
                <TeamStatistics team={team} />
                <TopPlayersInTeam team={team} />
                <AboutTeam allPlayers={allPlayers} team={team} />
              </div>
            </div>
        }
      </main>
    </>
  )
}

export default Page
