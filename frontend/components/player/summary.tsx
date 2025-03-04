import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import { PlayerAPIJson } from '@/interface/api/player'
import ShiPLayerSummarytsx from '../shimmer/shiPLayerSummary'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
import { getRatingColor } from '@/utils/function'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'

interface StandingsProps {
    player: PlayerAPIJson | null
}



const PLayerSummary = ({ player }: StandingsProps) => {
    const [waitdata, setWaitdata] = useState('wait');
    const [type, settype] = useState('averageRating');
    const [summary, setSummary] = useState<IPLayerSummaryAPIJson | null>(null);

    useEffect(() => {
        const getEvenstOfThePlayer = async () => {
            try {
                if (player == null)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/player/${player.id}/last-year-summary`, {})
                if (response.ok) {
                    const data = await response.json()
                    setWaitdata('done')
                    setSummary(data)
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getEvenstOfThePlayer()
    }, [player])

    if (waitdata == 'wait' || !summary)
        return <ShiPLayerSummarytsx />

    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3">
            <div className="w-full text-center text-lg font-semibold  pb-2">Summary (last 12 months)</div>
            <div className="w-full flex flex-col tablet:flex-row space-x-4">
                <div className="w-full tablet:w-1/2 ">
                    <div className="flex items-center justify-between p-2">
                        <div className="font-semibold">Average Sofascore rating</div>
                        <div className=" scale-85">
                            {
                                summary.summary.filter((item) => item.type == 'event').length ?
                                    <DisplayRating rating={

                                        (summary.summary.filter((item) => item.type == 'event').reduce((accumulator, currentValue) => {
                                            const value = currentValue.value ? parseFloat(currentValue.value) : 0;
                                            return accumulator + value;
                                        }, 0) / summary.summary.filter((item) => item.type == 'event').length).toFixed(2)
                                    }
                                        type='out' />
                                    :
                                    '-'
                            }
                        </div>
                    </div>
                    <div className="">
                        <button onClick={() => type == 'averageRating' ? settype('numberOfmatchs') : settype('averageRating')} className=" relative w-full rounded-xl  text-xs bg-on-surface-nLv5 p-2">
                            <div className="w-[calc(100%-16px)] h-1 z-10 top-[35%] absolute border-t-2 border-dotted border-green-500 my-4" />
                            <div className="flex justify-between items-start relative  z-20">
                                {
                                    summary.summary.map((item, index) =>
                                        moment(summary.summary[index].timestamp * 1000).format('MMM') != moment(summary.summary[index - 1]?.timestamp * 1000).format('MMM')
                                        && <div key={index} className='space-y-5'>
                                            <div className='text-on-surface-nLv3'>
                                                {
                                                    moment(item.timestamp * 1000).format('MMM')
                                                }
                                            </div>

                                            {
                                                item.type == 'event' ?
                                                    <div className="">
                                                        <div className="h-32 flex items-end">

                                                            <div
                                                                style={{ height: `${summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).reduce((accumulator, currentValue) => { return accumulator + (currentValue.value ? parseFloat(currentValue.value) : 0) }, 0) / summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).length * 100 / 10}%` }}
                                                                className={`  w-6  rounded-sm ${getRatingColor('bground', (summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).reduce((accumulator, currentValue) => { return accumulator + (currentValue.value ? parseFloat(currentValue.value) : 0) }, 0) / summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).length).toFixed(2))}`} />
                                                        </div>
                                                        <div className={`font-semibold ${getRatingColor('text', (summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).reduce((accumulator, currentValue) => { return accumulator + (currentValue.value ? parseFloat(currentValue.value) : 0) }, 0) / summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).length).toFixed(2))}`}>
                                                            {
                                                                type == 'averageRating' ?
                                                                    (summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).reduce((accumulator, currentValue) => { return accumulator + (currentValue.value ? parseFloat(currentValue.value) : 0) }, 0) / summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).length).toFixed(2)
                                                                    :
                                                                    summary.summary.filter((temp) => temp.type == 'event' && moment(temp.timestamp * 1000).format('MMM') == moment(item.timestamp * 1000).format('MMM')).length
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    item.type == 'transfer'
                                                        ? <div className='w-6  h-32 bg-blue-500'></div>
                                                        :
                                                        <div className=' h-32'>{ }</div>
                                            }

                                        </div>
                                    )
                                }
                            </div>
                            <div className="p-2  text-start text-on-surface-nLv3 relative">
                                {type == 'averageRating' ? 'Monthly average rating' : 'Number of rated matches played each month'}
                            </div>
                        </button>
                        <div className="text-on-surface-nLv3 text-sm p-2 space-y-2">
                            <div className="flex">
                                Click image to swap values.
                                <SvgIcons iconName='swap' />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    Injury Period
                                    <SvgIcons iconName='Injury' />
                                </div>
                                <div className="flex items-center space-x-1">
                                    Transfer/Loan
                                    <SvgIcons iconName='Transfer' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full tablet:w-1/2 pr-3  tablet:pr-0 ">
                    {Object.entries(summary.uniqueTournamentsMap).map(([key, value]) =>
                        <div key={key} className='flex items-center space-x-2'>
                            <DisplayImage onErrorImage='tournament' className='w-10 h-10 rounded-full' src={`https://api.sofascore.app/api/v1/unique-tournament/${value.id}/image`} width={500} height={500} alt={'image:' + value.name} />
                            <div className="border-b-[1px]  py-2 w-full flex justify-between items-center">
                                <div className="">
                                    <div className="text-sm">
                                        {value.name}
                                    </div>
                                    <div className="text-xs text-on-surface-nLv3">
                                        {summary.summary.filter((item) => item.uniqueTournamentId == value.id).length} Appearances
                                    </div>
                                </div>
                                <div className=" scale-90">
                                    {
                                        summary.summary.filter((item) => item.type == 'event' && item.uniqueTournamentId == value.id).length ?
                                            <DisplayRating rating={
                                                (summary.summary.filter((item) => item.type == 'event' && item.uniqueTournamentId == value.id).reduce((accumulator, currentValue) => {
                                                    const value = currentValue.value ? parseFloat(currentValue.value) : 0;
                                                    return accumulator + value;
                                                }, 0) / summary.summary.filter((item) => item.type == 'event' && item.uniqueTournamentId == value.id).length).toFixed(2)
                                            }
                                                type='out' />
                                            :
                                            '-'
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default PLayerSummary
