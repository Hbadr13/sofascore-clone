import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import moment from 'moment'
import { getRatingColor } from '@/utils/function'
import { IRecentFormAPIJson } from '@/interface/api/recentForm'
import { Tooltip } from '@nextui-org/react'
import DisplayImage from '@/utils/displayImage'

interface IRecentFormProps {
    team: ITeamAPIJson | null
}

const RecentForm = ({ team }: IRecentFormProps) => {
    const [recentForm, setRecentForm] = useState<IRecentFormAPIJson | null>(null)

    useEffect(() => {
        (
            async () => {
                try {
                    if (!team)
                        return
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/performance`, {})
                    if (response.ok) {
                        const data = await response.json()
                        setRecentForm(data)
                    }
                } catch (error) {

                }
            }
        )()
    }, [team])
    if (!recentForm || !team)
        return
    return (
        <div className='MYDeg   w-full bg-[#ffffff] rounded-2xl p-2'>
            <div className="font-bold p-2">Recent form</div>
            <div className="text-xs  text-on-surface-nLv3 p-2">Hover over the form graph to see event details.</div>
            <div className="bg-surface-s2 rounded-xl p-2">
                <div className="  w-full  flex justify-around relative">
                    {recentForm.events.map((event, index) =>
                        <Tooltip
                            key={index}
                            content={
                                <div className="px-1 py-2 flex space-x-1">
                                    <div className={`${event.homeScore.display <= event.awayScore.display ? ' text-on-surface-nLv3' : ''} text-small font-bold`}>{event.homeTeam.name} {event.homeScore.display}</div>
                                    <div className="text-on-surface-nLv3">-</div>
                                    <div className={`${event.homeScore.display >= event.awayScore.display ? ' text-on-surface-nLv3' : ''} text-small font-bold`}>{event.awayScore.display} {event.awayTeam.name}</div>
                                </div>
                            }
                        >

                            <button className=" flex flex-col  items-center   relative z-20 group">
                                {/* <div className="text-xs text-on-surface-nLv2">{'123'}</div> */}
                                <DisplayImage onErrorImage='team' className=' w-6 h-6 desktop:w-7 desktop:h-7 group-hover:scale-150 duration-300' src={`https://sofascore.com/api/v1/team/${team.id == event.homeTeam.id ? event.awayTeam.id : event.homeTeam.id}/image`} alt={team.id == event.homeTeam.id ? event.awayTeam.shortName : event.homeTeam.shortName} width={500} height={500} />
                                <div className=" relative  h-20 ">
                                    <div className="h-10 flex flex-col justify-end">
                                        {
                                            Object.getOwnPropertyDescriptor(recentForm.points, event.id) && Object.getOwnPropertyDescriptor(recentForm.points, event.id)?.value > 0 &&
                                            < div style={{ height: `${Object.getOwnPropertyDescriptor(recentForm.points, event.id)?.value * 11}px` }} className={`  relative  w-5 desktop:w-8    rounded-[1px] bg-green-500`} />
                                        }
                                    </div>
                                    <div className="h-10">
                                        {
                                            Object.getOwnPropertyDescriptor(recentForm.points, event.id) && Object.getOwnPropertyDescriptor(recentForm.points, event.id)?.value <= 0 &&
                                            < div style={{ height: `${-1 * Object.getOwnPropertyDescriptor(recentForm.points, event.id)?.value * 11}px` }} className={`  relative  w-6 desktop:w-8   rounded-[1px] bg-gray-400`} />
                                        }
                                    </div>

                                </div>
                            </button>
                        </Tooltip>
                    )}
                </div>
                <div className="text-sm  text-on-surface-nLv3">
                    The height of the column represents match difficulty at the time, based on odds.
                </div>
            </div>
        </div >
    )
}

export default RecentForm
