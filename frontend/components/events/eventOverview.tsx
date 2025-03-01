
import React, { useEffect, useRef, useState } from 'react'
import { CustomScroll } from 'react-custom-scroll'
import Link from 'next/link'
import Image from 'next/image'
import { EventAPIJson } from '@/interface/api/event'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import { IBestPlayersAPIJson } from '@/interface/api/bestPlayers'
import { CountUpAnimation } from '../tournament/teamOfTheWeek'
import { displayDateOfMatch } from '@/utils/function'
import IncidentsComp from '../matchInfo/incidents'
import DisplayImage from '@/utils/displayImage'
import MatchStatus from '../matchInfo/matchStatus'

interface IEventOverviewProps {
    event: EventAPIJson | null
    incidents: IIncidentsAPIJson[]
    setIncidents: (incidents: IIncidentsAPIJson[]) => void
}

const EventOverview = ({ event, incidents, setIncidents }: IEventOverviewProps) => {

    return (
        <div className=' MYDeg text-black  w-full  justify-between  bg-white rounded-2xl py-6 px-2'>
            <MatchStatus event={event} incidents={incidents} />
            <IncidentsComp event={event} incidents={incidents} setIncidents={setIncidents} />
        </div >
    )
}

export default EventOverview

