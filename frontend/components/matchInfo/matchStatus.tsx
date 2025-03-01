import React from 'react'
import Image from 'next/image'
import { EventAPIJson } from '@/interface/api/event'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import { displayDateOfMatch } from '@/utils/function'
import DisplayImage from '@/utils/displayImage'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import Link from 'next/link'

interface MmatchStatusProps {
    event: EventAPIJson | MatchDetailsAPIJson | null
    incidents: IIncidentsAPIJson[]
}

const MatchStatus = ({ event, incidents }: MmatchStatusProps) => {

    return (
        <div className=''>
            <div className="flex font-bold  justify-between items-center px-2 w-full min-h-20 ">
                <div className="flex  items-center justify-center   relative w-1/4 ">
                    <button className="hover:bg-blue-200/60 rounded-lg absolute -left-1 top-2">
                        <Image className='' width={25} height={25} alt='' src={'/image/notifications-none.svg'} />
                    </button>
                    <Link onClick={(e) => { !event && e.preventDefault() }} href={`/ma/team/${event?.homeTeam.slug}/${event?.homeTeam.id}`} className="flex flex-col justify-center  items-center space-y-2 ">
                        <div className="w-11 h-10">
                            <DisplayImage onErrorImage='team'
                                className='' width={500} height={500} alt=''
                                src={event ? `https://sofascore.com/api/v1/team/${event.homeTeam.id}/image` : `https://www.sofascore.com/static/images/placeholders/team.svg`}
                            />
                        </div>
                        <div className=" text-[13px] truncate">{event?.homeTeam.shortName}</div>
                    </Link>
                </div>
                <div className="w-2/4  flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        {
                            event?.status.type == 'finished' ?
                                <p className="font-bold text-3xl space-x-2">
                                    <span className={`${event.homeScore.display > event.awayScore.display ? '' : 'text-on-surface-nLv3'}`}>{event.homeScore.display}</span>
                                    <span className='text-on-surface-nLv3'>-</span>
                                    <span className={`${event.homeScore.display < event.awayScore.display ? '' : 'text-on-surface-nLv3'}`}>{event.awayScore.display}</span>
                                </p> :
                                event?.status.type == 'inprogress' ?
                                    <p className="font-bold text-3xl space-x-2">
                                        <span className={`text-red-600`}>{event.homeScore.display}</span>
                                        <span className='text-red-600'>-</span>
                                        <span className={`text-red-600`}>{event.awayScore.display}</span>
                                    </p> :
                                    <p className="whitespace-nowrap">
                                        {
                                            event && displayDateOfMatch({ startTimestamp: event.startTimestamp })
                                        }
                                    </p>
                        }
                    </div>
                </div>
                <div className="flex  items-center   justify-center    relative w-1/4">
                    <Link onClick={(e) => { !event && e.preventDefault() }} href={`/ma/team/${event?.awayTeam.slug}/${event?.awayTeam.id}`} className="flex flex-col  items-center space-y-2 ">
                        <div className="w-11 h-10">
                            <DisplayImage onErrorImage='team' className='' width={500} height={500} alt=''
                                src={event ? `https://sofascore.com/api/v1/team/${event.awayTeam.id}/image` : `https://www.sofascore.com/static/images/placeholders/team.svg`}
                            />
                        </div>
                        <div className=" text-[13px] truncate">{event?.awayTeam.shortName}</div>
                    </Link>
                    <button className="hover:bg-blue-200/60 rounded-lg absolute top-2 -right-1 ">
                        <Image className='' width={25} height={25} alt='' src={'/image/notifications-none.svg'} />
                    </button>
                </div>

            </div>
            <div className="w-full flex justify-center items-start space-x-2">
                <div className="text-[12px] opacity-40 w-1/2">
                    {
                        incidents.map((incident, index) => incident.incidentType == 'goal' && incident.isHome && <div key={index} className=' truncate text-end'>{incident.player.shortName} {incident.time}{`'`}</div>)
                    }
                </div>
                {(event?.homeScore.display || event?.awayScore.display) ? <Image width={17} height={17} alt='ball' src={'/image/ball.svg'} /> : null}
                <div className="text-[12px] opacity-40 w-1/2">
                    {
                        incidents.map((incident, index) => incident.incidentType == 'goal' && !incident.isHome && <div key={index} className=' truncate'>{incident.player.shortName} {incident.time}{`'`}</div>)
                    }
                </div>
            </div>
        </div >
    )
}

export default MatchStatus

