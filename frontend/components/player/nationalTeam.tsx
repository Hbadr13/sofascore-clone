import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlayerAPIJson } from '@/interface/api/player'
import ShiPLayerSummarytsx from '../shimmer/shiPLayerSummary'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
import { INationalTeamStatisticsAPIJson } from '@/interface/api/nationalTeam'
import DisplayImage from '@/utils/displayImage'

interface StandingsProps {
    player: PlayerAPIJson | null
}

const getRatingColor = (type: string, rating: number | string): string => {
    rating = Number(rating)
    if (type == 'text')
        return rating > 9 ? 'text-blue-600' : rating > 8 ? ' text-[#00adc4]' : rating > 7 ? ' text-[#00c424]' : rating > 6.5 ? ' text-[#d9af00]' : ' text-[#dc0c00] '
    return rating > 9 ? 'bg-blue-600' : rating > 8 ? ' bg-[#00adc4]' : rating > 7 ? ' bg-[#00c424]' : rating > 6.5 ? ' bg-[#d9af00]' : ' bg-[#dc0c00] '
}

const NationalTeam = ({ player }: StandingsProps) => {
    const [waitdata, setWaitdata] = useState('wait');
    const [statistics, setStatistics] = useState<INationalTeamStatisticsAPIJson[]>([]);

    useEffect(() => {
        const getEvenstOfThePlayer = async () => {
            try {
                if (player == null)
                    return
                const response = await fetch(`https://www.sofascore.com/api/v1/player/${player.id}/national-team-statistics`, {})
                if (response.ok) {
                    const data = await response.json()
                    if (data.statistics.length)
                        setWaitdata('done')
                    else
                        setWaitdata('error')
                    setStatistics(data.statistics)
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getEvenstOfThePlayer()
    }, [player])

    if (waitdata == 'wait')
        return <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3">
            <div className="w-full text-center text-lg font-semibold  pb-2">National team</div>
            <div className="w-full h-20 bg-surface-s2 animate-pulse rounded-xl"></div>
        </div>
    if (waitdata == 'error')
        return
    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3">
            <div className="w-full text-center text-lg font-semibold  pb-2">National team</div>
            <div className="flex justify-between items-center p-4">
                <div className="w-10"></div>
                <div className="divide-x-1.5 translate-x-1 flex items-center text-sm text-on-surface-nLv3">
                    <div className="px-1">
                        Appearances
                    </div>
                    <div className="px-1">
                        Goals
                    </div>
                </div>

            </div>
            <div className="w-full px-4 ">
                {statistics.map((item, index) =>

                    <div key={index} className='flex items-center space-x-2'>
                        <DisplayImage onErrorImage='team' className='w-10 h-10 rounded-full' src={`https://sofascore.com/api/v1/team/${item.team.id}/image`} width={500} height={500} alt={item.team.name} />
                        <div className=" py-2 w-full flex justify-between items-center">
                            <div className="">
                                <div className="text-sm">
                                    {item.team.name}
                                </div>
                                <div className="text-xs text-on-surface-nLv3">
                                    debut, {moment(item.debutTimestamp * 1000).format('ll')}
                                </div>
                            </div>
                            <div className="flex items-center space-x-10">
                                <div className="">
                                    {item.appearances}
                                </div>
                                <div className="">
                                    {item.goals}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default NationalTeam
