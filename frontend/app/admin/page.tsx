'use client'
import { EventAPIJson } from '@/interface/api/event'
import { StandingsAPIJson } from '@/interface/api/standings'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PlayerAPIJson } from '@/interface/api/player'
import PlayerCard from '@/components/player/playerCard'
const Page = () => {
    const [waitdata, setWaitdata] = useState('wait')
    const pathname = useParams<{ playerName: string, id: string }>()
    const router = useRouter()
    const [player, setPlayer] = useState<PlayerAPIJson | null>(null)

    useEffect(() => {
        const getThePlayerById = async () => {
            try {
                // const response = await fetch(`https://www.sofascore.com/api/v1/player/12994`, {})
                const response = await fetch(`http://localhost:4000/api/v1/player/12994`, {})
                if (response.ok) {
                    const data = await response.json()
                    setPlayer(data.player)
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getThePlayerById()
    }, [])


    if (waitdata == 'error')
        return <div className='h-screen w-full flex  justify-center items-center'>Not Found..</div>
    return (
        <>
            <main className=" mb-20 tablet:mb-0  w-full  flex flex-col items-center justify-start bg-[#edf1f6] text-on-surface-nLv1 b-black">
                <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex space-x-0 tablet:space-x-5 ">
                    <div className=" font-bold text-sm  my-2 flex truncate">
                        <div className='text-blue-500 flex items-center space-x-0.5'>
                            <div className="">Soccer</div>
                            <div className="w-[16px]">
                                <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                            </div>
                        </div>
                        {
                            player && !player.retired && player.team.tournament && <div className='text-blue-500 flex items-center space-x-0.5'>
                                <div className="">{player.team.tournament.category.name}</div>
                                <div className="w-[16px]">
                                    <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                                </div>
                            </div>
                        }
                        <div className=''>
                            <span className='text-blue-500'>{player && !player.retired && player.team.tournament ? player.team.tournament.name : ''}</span><span className='opacity-50'> {player?.name} stats, ratings and goals</span>
                        </div>
                    </div>
                </div>
                <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex  flex-col items-start ">
                    <PlayerCard player={player} />
                </div>
            </main>
        </>
    )
}

export default Page
