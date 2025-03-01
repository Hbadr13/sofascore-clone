import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { TeamStreaksApiJson } from '@/interface/api/teamStreaks'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Checkbox } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import DisplayImage from '@/utils/displayImage'


const Streaks = ({ event }: { event: EventAPIJson | null }) => {
    const [waitdata, setWaitdata] = useState('wait')
    const [teamStreaks, setTeamStreaks] = useState<TeamStreaksApiJson | null>(null)

    useEffect(() => {
        const getTeamStreaks = async () => {
            try {
                if (event == null)
                    return
                const response = await fetch(`https://sofascore.com/api/v1/event/${event.id}/team-streaks`, {})
                if (response.ok) {
                    const data = await response.json()
                    setTeamStreaks(data)
                    setWaitdata('done')
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getTeamStreaks()
    }, [event])

    if (waitdata == 'error')
        return <div />
    return (
        <div className=' font-normal flex space-x-5'>
            <div className="w-1/2 bg-[#ffffff] MYDeg rounded-2xl ">
                {

                    teamStreaks?.general.length ? <div className="text-center my-4 text-xl text-black font-medium">Team streaks</div> : null
                }
                <div className=" space-y-2">
                    {
                        teamStreaks?.general.map((item, index) =>
                            <div key={index} className='flex w-full  justify-between items-center px-5'>
                                <div className="w-1/5 flex space-x-1 items-center h-10">
                                    {
                                        item.team == 'both' ?
                                            <>
                                                <DisplayImage onErrorImage='team' className="w-7  h-7" src={`https://sofascore.com/api/v1/team/${event?.homeTeam.id}/image/`} width={300} height={300} alt='/club' />
                                                <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${event?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                                            </>
                                            :
                                            <div className="w-7 h-7 ">
                                                <DisplayImage onErrorImage='team' src={`https://sofascore.com/api/v1/team/${item.team == 'home' ? event?.homeTeam.id : event?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                                            </div>
                                    }
                                </div>
                                <div className="w-3/5 text-center  truncate text-sm">{item.name}</div>
                                <div className="w-1/5 text-end">{item.value}1</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="w-1/2 bg-[#ffffff] MYDeg rounded-2xl ">
                {teamStreaks?.head2head.length ? <div className="text-center my-4 text-xl text-black font-medium">Head to head streaks</div> : null}
                <div className=" space-y-2">
                    {
                        teamStreaks?.head2head.map((item, index) =>
                            <div key={index} className='flex w-full  justify-between items-center px-5'>
                                <div className="w-1/5 flex space-x-1 items-center h-10">
                                    {
                                        item.team == 'both' ?
                                            <>
                                                <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${event?.homeTeam.id}/image/`} width={300} height={300} alt='/club' />
                                                <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${event?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                                            </>
                                            :
                                            <DisplayImage onErrorImage='team' className="w-7 h-7" src={`https://sofascore.com/api/v1/team/${item.team == 'home' ? event?.homeTeam.id : event?.awayTeam.id}/image/`} width={300} height={300} alt='/club' />
                                    }
                                </div>
                                <div className="w-3/5 text-center  truncate text-sm">{item.name}</div>
                                <div className="w-1/5 text-end">{item.value}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Streaks