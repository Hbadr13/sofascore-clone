import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Shimmer_topPlayer from '../shimmer/shi2_topPlayer'
import { TopPlayersAPIJson } from '@/interface/api/topPlayers'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
import Image from 'next/image'

const TopPlayers = () => {

    const [waitdata, setWaitdata] = useState(true)
    const [topPlayers, settopPlayers] = useState<TopPlayersAPIJson[]>([])
    const [ShowMore, setShowMore] = useState(false)
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`https://sofascore.com/api/v1/sport/football/trending-top-players`, {});
                if (response.ok) {
                    const data = await response.json()
                    settopPlayers(Array.from(data.topPlayers))
                    setWaitdata(false)
                }
            }
        )()
    }, [])

    return (
        <div className="MYDeg  w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
            <div className=" text-slate-800 p-3 border-b-[1px] border-gray-300">
                <p className=" text-[20px]">Top players</p>
                <p className=" text-gray-900 text-sm opacity-35">Best rated players from recent matches</p>
            </div>
            <div className="">
                {topPlayers.slice(0, ShowMore ? topPlayers.length : 5).map((item, index) =>
                    <div key={index} >
                        <Link href={`/ma/player/${item.player.slug}/${item.player.id}`} className="flex space-x-2 items-center  px-2 text-gray-900 text-opacity-75 hover:bg-custom-default-hover">
                            <div className="text-[12px] w-5">{index + 1}</div>
                            <div className=" w-14  relative">
                                <DisplayImage onErrorImage='player' width={400} height={400} className=" border-[1px]  border-gray-300 bg-slate-500  w-14 rounded-full" src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} alt="" />
                                <DisplayImage onErrorImage='player' className=" absolute  bottom-0 right-0 w-5" width={400} height={400} src={`https://sofascore.com/api/v1/team/${item.team.id}/image/`} alt="" />
                            </div>
                            <div className={`w-full flex  items-center p-2 ${index == 0 ? '' : 'border-b-1 '}`}>
                                <div className="w-full flex flex-col justify-center ">
                                    <p>{item.player.name}</p>
                                    <p className="text-gray-900 opacity-35 text-[12px] truncate">{item.event.homeTeam.shortName} vs {item.event.awayTeam.shortName}</p>
                                </div>
                                <DisplayRating rating={item.rating} type='in' />
                                {/* <div className="bg-[#037ab0] h-full w-8 p-0.5 rounded-[4px] text-[14px] text-white text-center ">{item.rating}</div> */}
                            </div>
                        </Link>
                        {

                            index == 0 && <div className="w-full p-2 absolut">
                                <Image className=" object-contain rounded-3xl" src="/image/map-sofascore.jpeg" alt="" />
                            </div>
                        }
                    </div>
                )}
            </div>
            <div className={`${waitdata ? 'hidden' : 'block'} w-full p-3 flex space-x-2  justify-end items-center`}>
                <button onClick={() => setShowMore((prv) => !prv)} className=" flex space-x-2 items-center">
                    <div className=" font-medium text-blue-600 ">
                        {ShowMore ? 'Show less' : 'Show more'}
                    </div>
                    <Image className={` w-4 ${ShowMore ? 'rotate-90 ' : '-rotate-90'}`} src="/image/blue-arraw.svg" alt="" />
                </button>
            </div>
            {

                waitdata && <Shimmer_topPlayer />
            }
        </div >
    )
}

export default TopPlayers
