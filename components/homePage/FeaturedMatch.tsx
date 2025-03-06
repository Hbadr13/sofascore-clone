import { EventAPIJson } from '@/interface/api/event'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import DisplayImage from '@/utils/displayImage'
import Link from 'next/link';
interface FeaturedMatchProps {
    setFeaturedEvent: (featuredEvent: EventAPIJson) => void
    featuredEvent: EventAPIJson | null
    tournamentId?: number
    seasonId?: string | null
}
const FeaturedMatch = ({ tournamentId, setFeaturedEvent, featuredEvent, seasonId }: FeaturedMatchProps) => {
    const [waitdata, setWaitdata] = useState(true)

    useEffect(() => {
        (
            async () => {
                try {
                    if (!tournamentId)
                        return
                    if (tournamentId && !seasonId) {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${tournamentId}/featured-events`, {});
                        if (response.ok) {
                            const data = await response.json()
                            setFeaturedEvent(data.featuredEvents[0])
                            setWaitdata(false)
                        }
                    }
                    else {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${tournamentId}/season/${seasonId}/events/last/0`, {});
                        if (response.ok) {
                            const data = await response.json()
                            setFeaturedEvent(data.events[0])
                            setWaitdata(false)
                        }
                    }
                } catch (error) {

                }
            }
        )()
    }, [seasonId, tournamentId, setFeaturedEvent])

    return (
        <div>
            <div className="MYDeg w-full bg-[#ffffff] rounded-2xl p-3 space-y-2 pb-6">
                <p className="font-semibold">Featured Match</p>
                {
                    waitdata &&
                    < div className="animate-pulse flex space-x-8  bg-[#f5f6f9] p-1.5 rounded-xl">
                        <div className="w-1/3 h-20  flex flex-col justify-center items-center space-y-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div className="w-10 h-2 rounded-full bg-slate-200"></div>
                        </div>
                        <div className="w-1/3 h-20  space-y-4 flex justify-center items-center flex-col text-red-700">
                            <div className="w-10 h-3 rounded-full bg-slate-200"></div>
                            <div className="w-14 h-3 rounded-full bg-slate-200"></div>

                        </div>
                        <div className="w-1/3 h-20  flex flex-col justify-center items-center  space-y-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div className="w-10 h-2 rounded-full bg-slate-200"></div>
                        </div>
                    </div>

                }
                {

                    featuredEvent && <Link href={`/ma/${featuredEvent.slug}/${featuredEvent.customId}#id:${featuredEvent.id}`} className="flex  bg-[#f5f6f9] p-1.5 rounded-xl">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-14 h-14">
                                <DisplayImage onErrorImage='team' width={500} height={500} src={`https://sofascore.com/api/v1/team/${featuredEvent.homeTeam.id}/image/`} alt='cllub' />
                            </div>
                            <p className="">{featuredEvent?.homeTeam.shortName}</p>
                        </div>
                        <div className="w-1/3 flex justify-center items-center flex-col text-red-700">
                            {
                                featuredEvent?.status.type == 'finished' ?
                                    <p className="font-bold text-3xl">
                                        {featuredEvent.homeScore.display} - {featuredEvent.awayScore.display}
                                    </p> :
                                    <p className="font-bold text-2xl">
                                        20:00 PM
                                    </p>
                            }
                            <div className="font-semibold text-xs capitalize">{featuredEvent?.status.type == 'notstarted' ? 'not started' : featuredEvent?.status.type}</div>
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-14 h-14">
                                <DisplayImage onErrorImage='team' width={500} height={500} src={`https://sofascore.com/api/v1/team/${featuredEvent.awayTeam.id}/image/`} alt='cllub' />
                            </div>
                            <p className="">{featuredEvent?.awayTeam.shortName}</p>
                        </div>
                    </Link>
                }
            </div >

        </div >
    )
}

export default FeaturedMatch