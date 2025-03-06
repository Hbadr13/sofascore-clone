import React from 'react'
import { Image } from '@nextui-org/react';

import { EventAPIJson } from '@/interface/api/event'
const EventTitle = ({ event }: { event: EventAPIJson | null }) => {
    // if (!event)
    //     return
    return (
        <div className="w-full flex justify-center bg-white h-28  rounded-b-xl p-2">
            <div className=" w-full  desktop:w-[1344px] tablet:w-[992px] " >
                <div className=" font-bold text-sm  flex">
                    <div className='text-blue-500 flex items-center space-x-0.5'>
                        <div className="">Soccer</div>
                        <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                    </div>
                    <div className='text-blue-500 flex items-center space-x-0.5'>
                        <div className="">{event?.tournament.category.name}</div>
                        <Image className=' rotate-180' width={16} height={16} src={'/image/arraw.svg'} alt='arraw' />
                    </div>
                    <div className='opacity-40'>
                        {event?.homeTeam.shortName} vs {event?.awayTeam.shortName} H2H results, standings and prediction
                    </div>
                </div>
                {
                    event &&
                    <div className="flex justify-between  px-4 py-2 items-center">
                        <div className=" text-3xl w-1/2 font-semibold">{event?.homeTeam.shortName} {event ? '-' : ''} {event?.awayTeam.shortName}</div>
                        <div className=" relative  overflow-hidden h-[70px] w-[370px] p-2  rounded-2xl   translate-x-3 flex justify-between items-center">
                            <div style={{ backgroundImage: `url(https://api.sofascore.app/api/v1/team/${event?.homeTeam.id}/image)` }} className="BoxSeasonBlur2 z-10 rounded-2xl"></div>
                            <div className="  relative text-[11px] text-white  p-1 z-20">
                                Receive notifications for this event
                            </div>
                            <div className="z-20 relative">
                                <button className='bg-white w-28  flex items-center justify-between rounded-lg p-2 '>
                                    <div className="text-sm text-blue-500">FOLLOW</div>
                                    <Image alt='notification' width={20} height={20} src={`/image/notifications-none.svg`} />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default EventTitle