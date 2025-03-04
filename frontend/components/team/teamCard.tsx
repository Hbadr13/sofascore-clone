import React from 'react'
import { Image } from '@nextui-org/react'
import DisplayImage from '@/utils/displayImage'

interface TeamCardProps {
    team: ITeamAPIJson | null
}

const CompareIcon = ({ color }: { color: string }) => <svg width="24" height="24" viewBox="0 0 16 16" fill={color} ><g fill={color} fillRule="evenodd" width="14" height="14"><path fill="none" d="M0 0h16v16H0z"></path><path d="M14.667 12H10V8.667L10.667 8H14l.667.667V12zm-2.334-4.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333zM6 12H1.333V8.667L2 8h3.348L6 8.667V12zM3.667 7.333a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333zm5-4.666H7.333v10.666h1.334V2.667z"></path></g></svg>

const TeamCard = ({ team }: TeamCardProps) => {
    return (
        <div className="  w-full -[200px] overflow-hidden relative   rounded-sm tablet:rounded-2xl">
            <div style={{ backgroundImage: !team ? '' : `url(https://sofascore.com/api/v1/team/${team.id}/image/)` }} className="BoxSeasonBlur z-10 rounded-2xl bg-slate-400"></div>
            <div className=" z-20 relative  h-40 transition flex items-center">
                <div className="flex items-center  w-full tablet:w-[calc(100%-300px)] ">
                    <div className=" w-32 h-32 tablet:h-40  tablet:w-40 p-6 ">
                        <div className=" h-full w-full  rounded-xl  bg-white p-3">
                            {team && <Image
                                className='rounded-full'
                                isZoomed
                                alt={`team:${team.id}`}
                                // style={{ borderRadius: 100 }}
                                isBlurred
                                width={1000}
                                height={1000}
                                src={`https://sofascore.com/api/v1/team/${team.id}/image/`}
                            />
                            }
                        </div>
                    </div>
                    <div className="  flex  flex-col justify-center space-y-2 items-start h-full text-white">
                        <div className=" text-xl tablet:text-3xl font-extrabold truncate ">{team?.name}</div>
                        <div className=" relative  flex items-center  justify-center space-x-2">
                            <DisplayImage width={24} height={24} alt='team' onErrorImage='flag' src={`https://api.sofascore.app/static/images/flags/${team?.country.alpha2.toLowerCase()}.png`} />
                            <div className=" font-semibold">{team?.country.name}</div>
                        </div>
                    </div>
                </div>
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
        </div >
    )
}

export default TeamCard
