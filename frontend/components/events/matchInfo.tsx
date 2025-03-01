import React, { useEffect, useState } from 'react'
import { MatchInfoComp } from '../matchInfo/details'
import { EventAPIJson } from '@/interface/api/event'

const MatchInfo = ({ event }: { event: EventAPIJson | null }) => {

    const [matchInfo, setMatchInfo] = useState<EventAPIJson | null>(null)

    useEffect(() => {

        const getMatchINfo = async () => {
            try {
                if (!event)
                    return
                setMatchInfo(null)
                const response = await fetch(`https://sofascore.com/api/v1/event/${event.id}`, {});
                if (response.ok) {
                    const data = await response.json()
                    setMatchInfo(data.event)
                }
            } catch (error) {
            }
        }
        getMatchINfo()
    }, [event])
    return (
        <div className=' MYDeg text-black  w-full  bg-white rounded-2xl p-3'>
            <MatchInfoComp matchInfo={matchInfo} type='event' />
        </div>
    )
}

export default MatchInfo