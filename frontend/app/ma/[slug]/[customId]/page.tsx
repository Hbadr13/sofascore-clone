'use client'
import { EventAPIJson } from '@/interface/api/event'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import EventOverview from '@/components/events/eventOverview'
import MatchStatistics from '@/components/events/matchStatistics'
import Commentary from '@/components/events/commentary'
import { MatchInfoComp } from '@/components/matchInfo/details'
import MatchInfo from '@/components/events/matchInfo'
import TvChannels from '@/components/events/TvChannels'
import EventLineup from '@/components/events/eventLineupAndStatistics'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import Streaks from '@/components/events/streaks'
import Matches from '@/components/events/matches'
import EventTitle from '@/components/events/eventTitle'
import MatchOverview from '@/components/homePage/matchOverview'
import { useCurrentMatch } from '@/context/EventDateContext'
import { StandingsAPIJson } from '@/interface/api/standings'
const Page = () => {

  const router = useRouter()
  const eventCustomId = usePathname().split('/')[3]
  const [waitdata, setwaitdata] = useState<string>('wait')
  const [event, setEvent] = useState<EventAPIJson | null>(null)
  const [incidents, setIncidents] = useState<IIncidentsAPIJson[]>([])
  const { currentMatch, setCurrentMatch } = useCurrentMatch();

  useEffect(() => {
    const getTheEvents = async () => {
      try {
        const eventId = window.location.hash.substring(4)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${eventCustomId}/h2h/events`, {})
        if (response.ok) {
          const data = await response.json()
          const event_ = (data.events as EventAPIJson[]).find((it) => it.id == Number(eventId))
          if (event_) {
            setEvent(event_)
            setCurrentMatch(event_ as any)
          }
          else {
            router.push(`/ma/${data.events[0].slug}/${data.events[0].customId}#id:${data.events[0].id}`)
            setEvent(data.events[0])
            setCurrentMatch(data.events[0])

          }
        }
      } catch (error) {
        setwaitdata('error')
      }
    }
    getTheEvents()
  }, [router, eventCustomId, setCurrentMatch])

  // if (waitdata == 'error')
  //   return <div>not Found</div>

  return (
    <>
      <main className=" w-full  flex flex-col items-center justify-start bg-[#edf1f6] b-black">
        <div className="hidden tablet:block ">
          <EventTitle event={event} />
        </div>
        <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex items-start space-x-0 tablet:space-x-5  tablet:mt-5 ">
          <div className="  relative  hidden tablet:block   tablet:w-[323px] desktop:w-[440px]   rounded-2xl  space-y-5">
            <EventOverview incidents={incidents} setIncidents={setIncidents} event={event} />
            <MatchStatistics event={event} hideTitle={false} />
            <Commentary incidents={incidents} event={event} hideTitle={false} />
            <TvChannels currentMatch={event} type='event' />
            <MatchInfo event={event} />
          </div>
          <div className=" hidden tablet:block w-[100%] tablet:w-[645px] desktop:w-[880px]  space-y-5">
            <EventLineup incidents={incidents} setIncidents={setIncidents} event={event} />
            <Streaks event={event} />
            <Matches event={event} />
          </div>
          <div className="tablet:hidden block w-full ">
            <MatchOverview scrollType={'3'} />
          </div>
        </div>





      </main>
    </>
  )
}

export default Page



