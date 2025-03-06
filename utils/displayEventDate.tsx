import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import moment from 'moment'
import React from 'react'

const DisplayEventDate = ({ event }: { event: MatchDetailsAPIJson }) => {
    return (
        <div className='flex flex-col items-center w-full'>
            <p className="whitespace-nowrap">{moment(event.startTimestamp * 1000).format("hh:mm A")}</p>
            <p className={`${(event.status.description == 'Postponed' || event.status.description == 'Canceled') ? 'text-red-700  font-bold ' : ''}`}>{event.status.description == 'Ended' ? 'FT' : event.status.description == 'Not started' ? '-' : event.status.description}</p>
        </div>
    )
}

export default DisplayEventDate