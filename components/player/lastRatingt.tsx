import { ILastRatingsAPIJson } from '@/interface/api/lastRatings'
import { PlayerAPIJson } from '@/interface/api/player'
import { ISeasons, IUniqueTournament } from '@/interface/api/seassonStatistics'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import moment from 'moment'
import { getRatingColor } from '@/utils/function'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
interface ILastRatingProps {
    selectTournament: IUniqueTournament | null
    selectSeason: ISeasons | null
    player: PlayerAPIJson | null
}

const LastRating = ({ player, selectSeason, selectTournament }: ILastRatingProps) => {
    const [lastRating, setLastRating] = useState<ILastRatingsAPIJson[] | null>(null)

    useEffect(() => {
        (
            async () => {
                try {
                    if (!player || !selectSeason || !selectTournament)
                        return
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/player/${player.id}/unique-tournament/${selectTournament.id}/season/${selectSeason.id}/last-ratings`, {})
                    if (response.ok) {
                        const data = await response.json()
                        setLastRating(Array.from(data.lastRatings as ILastRatingsAPIJson[]).reverse())
                    }
                } catch (error) {

                }
            }
        )()
    }, [player, selectSeason, selectTournament])
    if (!lastRating)
        return
    return (
        <div className=''>
            <div className=" bg-surface-s2 rounded-xl p-2 w-full  flex justify-around relative">
                {lastRating.map((event, index) =>
                    <div key={index} className=" flex flex-col  items-center space-y-2  relative z-20">
                        <div className="text-xs text-on-surface-nLv2">{moment(event.startTimestamp * 1000).format('MMM D')}</div>
                        <DisplayImage onErrorImage='team' className='w-8 h-8' src={`https://sofascore.com/api/v1/team/${event.opponent.id}/image`} alt={event.opponent.shortName} width={500} height={500} />
                        <div className=" relative h-24">
                            <div style={{ top: `${100 - Number(event.rating) * 100 / 10}%` }} className={`  relative  `}>
                                <DisplayRating rating={event.rating} type='in' />
                                {/* <div className="text-white text-sm font-semibold">{Number(event.rating)}</div> */}
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full h-24 top-[73px] absolute   z-10 flex justify-center ">
                    <div style={{ top: `${100 - lastRating.reduce((a, b) => (a + Number(b.rating)), 0) / lastRating.length * 100 / 10}%` }} className={`w-[90%] h-0.5  absolute ${getRatingColor('background', lastRating.reduce((a, b) => (a + Number(b.rating)), 0) / lastRating.length)}`} />
                    <div className=" absolute right-2 h-full w-1.5">
                        {['bg-blue-600', ' bg-[#00adc4]', ' bg-[#00c424]', ' bg-[#d9af00]', 'bg-score-rating-s60', ' bg-[#dc0c00] '].map((color, index) => <div key={index} className={`${color} w-full h-1/6`}></div>)}
                    </div>
                </div>

            </div>
            { }
        </div>
    )
}

export default LastRating