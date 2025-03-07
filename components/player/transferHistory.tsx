import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import { PlayerAPIJson } from '@/interface/api/player'
import ShiPLayerSummarytsx from '../shimmer/shiPLayerSummary'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
import { ITransferHistoryAPIJson } from '@/interface/api/transferHistory'

interface StandingsProps {
    player: PlayerAPIJson | null
}

const getRatingColor = (type: string, rating: number | string): string => {
    rating = Number(rating)
    if (type == 'text')
        return rating > 9 ? 'text-blue-600' : rating > 8 ? ' text-[#00adc4]' : rating > 7 ? ' text-[#00c424]' : rating > 6.5 ? ' text-[#d9af00]' : ' text-[#dc0c00] '
    return rating > 9 ? 'bg-blue-600' : rating > 8 ? ' bg-[#00adc4]' : rating > 7 ? ' bg-[#00c424]' : rating > 6.5 ? ' bg-[#d9af00]' : ' bg-[#dc0c00] '
}


import ReactApexChart from 'react-apexcharts';
import DisplayImage from '@/utils/displayImage'

const ApexChart = ({ dataSet }: { dataSet: any }) => {

    const options: any = {
        chart: {
            type: 'area',
            stacked: false,
            height: 250,
            zoom: { enabled: false },
        },
        dataLabels: { enabled: !false },
        markers: { size: 0 },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [10, 100, 100, 100],
            },
        },
        yaxis: {
            labels: {
                style: { colors: '#8e8da4' },
                offsetX: 0,
                formatter: (val: any) => val + 'M €',
            },
            axisBorder: { show: !false },
            axisTicks: { show: !false },
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 7,
            labels: {
                formatter: (val: any, timestamp: any) => moment(new Date(timestamp)).format('YY') + "'",
            },
        },
        tooltip: { shared: true },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetX: -10,
        },
    }
    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={
                        [{
                            name: 'value',
                            data: dataSet,
                        }]
                    }
                    type="area" height={200} />
            </div>
        </div>
    );
};





const TransferHistory = ({ player }: StandingsProps) => {
    const [waitdata, setWaitdata] = useState('wait');
    const [dataSet, setDataSet] = useState<Array<{ x: string, y: number }>>([]);
    const [transferHistory, setTransferHistory] = useState<ITransferHistoryAPIJson[] | null>(null);

    useEffect(() => {
        const getTheTransferHistory = async () => {
            try {
                if (player == null)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/player/${player.id}/transfer-history`, {})
                if (response.ok) {
                    const data = await response.json()
                    setWaitdata('done')
                    setTransferHistory(data.transferHistory)
                    const _dataset: Array<{ x: string, y: number }> = (data.transferHistory as ITransferHistoryAPIJson[]).map((item) => { return { x: moment(item.transferDateTimestamp * 1000).format('YYYY'), y: item.transferFee / 1000000 } })
                    setDataSet(_dataset)
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getTheTransferHistory()
    }, [player])

    if (waitdata == 'wait' || !transferHistory)
        return <ShiPLayerSummarytsx />
    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3">
            <div className="w-full text-center text-lg font-semibold  pb-2">Transfer History</div>
            <div className="w-full flex flex-col tablet:flex-row space-x-4">
                <div className="w-full tablet:w-1/2">
                    <div className="">
                        <div className='w-full  bg-surface-s2 rounded-xl'>
                            <ApexChart dataSet={dataSet} />
                        </div>
                        <div className="text-on-surface-nLv3 text-sm p-2 space-y-2">
                            <div className="flex items-center justify-between  ">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex space-x-1">
                                        <div className="w-3 h-1 bg-orange-400"></div>
                                        <div className="w-3 h-1 bg-orange-400"></div>
                                    </div>
                                    <div className="">
                                        Current player value
                                    </div>
                                </div>
                                <div className="">
                                    {player ? `${player.proposedMarketValue / 1000000}M €` : ' '}
                                </div>
                            </div>
                            <div className="flex items-center  justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-7 h-1 bg-blue-500"></div>
                                    <div className="">
                                        Transfer fee
                                    </div>
                                </div>
                                {
                                    transferHistory.length != 0 && transferHistory.reduce((max, item) => (item.transferFee > max.transferFee ? item : max), transferHistory[0]).transferFee != 0 && <div className="">
                                        (Highest) {transferHistory.reduce((max, item) => (item.transferFee > max.transferFee ? item : max), transferHistory[0]).transferFee / 100000}M €
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full tablet:w-1/2">
                    {transferHistory.map((item, index) =>
                        <div key={index} className='flex items-center space-x-2'>
                            <DisplayImage onErrorImage='team' className=' w-8 h-8 md:w-10 md:h-10' src={item.transferTo ? `https://api.sofascore.app/api/v1/team/${item.transferTo.id}/image` : 'https://www.sofascore.com/static/images/placeholders/team.svg'} width={500} height={500} alt={'image:' + item.toTeamName} />
                            <div className="border-b-[1px]  pr-3 py-2 w-full flex justify-between items-center">
                                <div className="">
                                    <div className="text-sm">
                                        {item.toTeamName}
                                    </div>
                                    <div className="text-xs text-on-surface-nLv3">
                                        {moment(item.transferDateTimestamp * 1000).format('ll')}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end  text-green-600 text-xs">
                                    <div className="">
                                        {item.type == 1 ? 'End of loan' : item.type == 2 ? 'Loan' : item.type == 3 ? '' : ''}
                                    </div>
                                    <div className="#">
                                        {item.transferFeeDescription}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default TransferHistory
