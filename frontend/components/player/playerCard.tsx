import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import { seasonsAPIJson } from '@/interface/api/seasons'
import { useRouter } from 'next/navigation'
import { PlayerAPIJson } from '@/interface/api/player'


interface PlayerCardProps {
    player: PlayerAPIJson | null
}

const CompareIcon = ({ color }: { color: string }) => <svg width="24" height="24" viewBox="0 0 16 16" fill={color} ><g fill={color} fillRule="evenodd" width="14" height="14"><path fill="none" d="M0 0h16v16H0z"></path><path d="M14.667 12H10V8.667L10.667 8H14l.667.667V12zm-2.334-4.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333zM6 12H1.333V8.667L2 8h3.348L6 8.667V12zM3.667 7.333a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333zm5-4.666H7.333v10.666h1.334V2.667z"></path></g></svg>

const PlayerCard = ({ player }: PlayerCardProps) => {
    return (
        <div className="  w-full -[200px] overflow-hidden relative   rounded-sm tablet:rounded-2xl">
            <div style={{ backgroundImage: !player ? '' : !player.retired ? `url(https://sofascore.com/api/v1/team/${player.team.id}/image/)` : `url(https://cdn.alkora.app/static/images/flags/br.png)` }} className="BoxSeasonBlur z-10 rounded-2xl bg-slate-400"></div>
            <div className=" z-20 relative  h-40 transition flex items-center">
                <div className="flex items-center   w-full tablet:w-[calc(100%-300px)] ">
                    <div className=" w-[140px] tablet:w-[200px]">
                        <div className=" w-32 h-32 tablet:h-40  tablet:w-40 p-6">
                            <div className=" h-full w-full  rounded-full bg-slate-400 ">
                                {<Image
                                    className='rounded-full w-full h-full'
                                    isZoomed
                                    alt={`player:${player?.id}`}
                                    style={{ borderRadius: 100 }}
                                    radius='full'
                                    isBlurred
                                    width={1000}
                                    height={1000}
                                    src={`https://api.sofascore.app/api/v1/player/${player?.id}/image`}
                                />
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" flex  flex-col justify-center space-y-2 items-start h-full text-white">
                        <div className=" text-xl tablet:text-3xl font-extrabold ">{player?.name}</div>
                        <div className=" relative  w-[90px]  h-7 overflow-hidden rounded-[6px] flex items-center  justify-center hover:scale-105 duration-150">
                            <button className=' text-[12px] p-0.5 rounded-x  absolute z-20  flex items-center space-x-1 '>
                                <div className="">
                                    Compare
                                </div>
                                <CompareIcon color='white' />
                            </button>
                            <div className="SmallboxSeasonBlur rounded-2xl z-10"></div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex h-full  p-6">
                    <div className={` w-[300px]  desktop:w-[350px] hidden tablet:flex items-center  justify-center h-full`}>
                        <div className=" relative h-[70px]  w-[280px] pr-2  rounded-2xl   flex justify-between items-center">
                            <div className="SmallboxSeasonBlur rounded-2xl z-10"></div>
                            <div className=" text-[11px] text-white  p-1 z-20">
                                Receive notifications for all games of this team
                            </div>
                            <div className="z-20">
                                <button className='bg-white w-28  flex items-center justify-between rounded-lg p-2 '>
                                    <div className="text-sm text-blue-500">FOLLOW</div>
                                    <Image alt='notifications' width={20} height={20} src={`/image/notifications-none.svg`} />
                                </button>
                                <div className="text-white text-[13px] text-end">
                                    1.7M followers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PlayerCard
