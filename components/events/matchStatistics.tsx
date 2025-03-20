import { EventAPIJson } from '@/interface/api/event'
import { IMatchStatisticsAPIJson } from '@/interface/api/matchStatistics'
import { Button, CircularProgress, Progress } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ShiStatistics from '../shimmer/shiStatistics'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'

const CircularProgressComp = ({ radius, value, color }: { radius: number, value: number, color: string }) => {

    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return <div className=" flex justify-center items-center">
        <svg width="100" height="100">
            <g transform="rotate(-90 50 50)">
                <circle
                    r={radius}
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="rgb(226 232 240 / 0.7)"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset="0"
                ></circle>
                <circle
                    r={radius}
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                ></circle>
            </g>
            <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="14"
                fill="black"
            >
                {String(value).slice(0, 2)}%
            </text>
        </svg>
    </div>
}


const MatchStatistics = ({ event, hideTitle }: { event: EventAPIJson | MatchDetailsAPIJson | null, hideTitle: boolean }) => {
    const [period, setPeriod] = useState('ALL')
    const [statistics, setStatistics] = useState<IMatchStatisticsAPIJson[]>([])
    const [waitData, setwaitData] = useState('wait')
    useEffect(() => {

        const getTheBestPlayersSummary = async () => {
            try {
                if (!event)
                    return
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${event.id}/statistics`, {})
                if (response.ok) {
                    const data = await response.json()
                    setStatistics(data.statistics)
                    setwaitData('done')
                }
                else
                    setwaitData('error')
            } catch (error) {
                setwaitData('error')
            }
        }
        getTheBestPlayersSummary()
    }, [event])

    if (waitData == 'wait')
        return <ShiStatistics />
    if (waitData == 'error')
        return
    return (
        <div className=' MYDeg text-black  w-full  justify-between  bg-white rounded-2xl p-2'>

            <div hidden={hideTitle} className="p-1 text-xl font-medium">
                Statistics
            </div>

            <div className=" flex items-center justify-center space-x-4 mt-6">
                <Button size='sm' onClick={() => setPeriod('ALL')} className={` font-semibold py-1 px-2 rounded-lg border-1 border-slate-300 ${period == 'ALL' ? 'bg-blue-500/35 text-blue-800' : ' text-gray-700 bg-slate-100'}`}>ALL</Button>
                <Button size='sm' onClick={() => setPeriod('1ST')} className={`font-semibold py-1 px-2 rounded-lg border-1 border-slate-300 ${period == '1ST' ? 'bg-blue-500/35 text-blue-800' : ' text-gray-700 bg-slate-100'}`}>1ST</Button>
                <Button size='sm' onClick={() => setPeriod('2ND')} className={`font-semibold py-1 px-2 rounded-lg border-1 border-slate-300 ${period == '2ND' ? 'bg-blue-500/35 text-blue-800' : ' text-gray-700 bg-slate-100'}`}>2ND</Button>
            </div>
            <div className="mt-14">

                {
                    statistics.map((item, index) =>
                        item.period == period && <div
                            key={index}
                            className='space-y-14'
                        >
                            {
                                item.groups.map((group, _index) => <div
                                    key={_index}
                                    className=''

                                >
                                    <div className="w-full text-center font-medium text-[12px text-md">
                                        {group.groupName}
                                    </div>
                                    <div className='space-y-4 mt-5'>
                                        {
                                            group.statisticsItems.map((statistic, __index) =>
                                                <div key={__index} className="">
                                                    {
                                                        statistic.renderType == 1 && <div
                                                            className=' space-y-2'
                                                        >
                                                            <div className="flex justify-between text-sm">
                                                                <div className="">{statistic.homeValue}</div>
                                                                <div className="">{statistic.name}</div>
                                                                <div className="">{statistic.awayValue}</div>
                                                            </div>
                                                            <div className="w-full flex space-x-4">
                                                                <div className="w-1/2  bg-slate-200/70 rounded-[2px] h-1.5 flex justify-end">
                                                                    <div style={{ width: `${String(Math.abs(statistic.homeValue) * 100 / (Math.abs(statistic.homeValue) + Math.abs(statistic.awayValue))) + '%'}` }} className={`${statistic.compareCode == 1 || statistic.compareCode == 3 ? 'bg-green-500 ' : 'bg-green-300'}  h-full rounded-[2px] `}></div>
                                                                </div>
                                                                <div className="w-1/2 bg-slate-200/70 rounded-[2px] h-1.5">
                                                                    <div
                                                                        style={{ width: `${String(Math.abs(statistic.awayValue) * 100 / (Math.abs(statistic.homeValue) + Math.abs(statistic.awayValue)))}%` }}
                                                                        className={`${statistic.compareCode == 2 || statistic.compareCode == 3 ? 'bg-blue-600' : 'bg-blue-300'} h-full rounded-[2px]`}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        statistic.renderType == 2 && <div
                                                            className=' space-y-2'
                                                        >
                                                            <div className="flex justify-between text-sm">
                                                                <div className=" bg-green-500 text-white px-2 py-0.5 rounded-lg font-semibold">{statistic.home}</div>
                                                                <div className="">{statistic.name}</div>
                                                                <div className="bg-blue-600 text-white px-2 py-0.5 rounded-lg font-semibold">{statistic.away}</div>
                                                            </div>
                                                            <div className="w-full bg-blue-600 h-4 rounded-xl">
                                                                <div style={{ width: `${String(statistic.homeValue * 100 / (statistic.homeValue + statistic.awayValue)) + '%'}` }} className={`bg-green-500   h-full rounded-l-xl `}></div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        statistic.renderType == 3 && <div
                                                            className=' space-y-2 '
                                                        >
                                                            <div className="flex  text-sm items-center justify-center ">
                                                                <div className="  w-1/2 flex   justify-between items-center">
                                                                    <div className="">
                                                                        {statistic.homeValue}/{statistic.homeTotal}
                                                                    </div>
                                                                    {/* <CircularProgress
                                                                        size="lg"
                                                                        value={statistic.homeValue * 100 / statistic.homeTotal}
                                                                        color="success"
                                                                        showValueLabel={true}
                                                                    /> */}

                                                                    <CircularProgressComp radius={30} color={statistic.compareCode == 1 || statistic.compareCode == 3 ? 'rgb(34 197 94)' : 'rgb(134 239 172)'} value={statistic.homeValue * 100 / statistic.homeTotal} />
                                                                </div>
                                                                <div className=" w-10 flex justify-center items-center whitespace-pre-line text-center">{statistic.name}</div>
                                                                <div className='w-1/2 flex justify-between items-center'>
                                                                    {/* <CircularProgress
                                                                        size="lg"
                                                                        value={statistic.awayValue * 100 / statistic.awayTotal}
                                                                        color="success"
                                                                        showValueLabel={true}
                                                                    /> */}
                                                                    <CircularProgressComp radius={30} color={statistic.compareCode == 2 || statistic.compareCode == 3 ? 'rgb(37 99 235)' : 'rgb(147 197 253)'} value={statistic.awayValue * 100 / statistic.awayTotal} />
                                                                    <div className="">
                                                                        {statistic.awayValue}/{statistic.awayTotal}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        statistic.renderType == 4 && <div
                                                            className=' space-y-2'
                                                        >
                                                            <div className="flex  text-sm items-center justify-around ">
                                                                <CircularProgressComp radius={40} color={statistic.compareCode == 1 || statistic.compareCode == 3 ? 'rgb(34 197 94)' : 'rgb(134 239 172)'} value={statistic.homeValue * 100 / statistic.homeTotal} />
                                                                <div className="w-1/3 flex justify-center items-center">{statistic.name}</div>
                                                                <CircularProgressComp radius={40} color={statistic.compareCode == 2 || statistic.compareCode == 3 ? 'rgb(37 99 235)' : 'rgb(147 197 253)'} value={statistic.awayValue * 100 / statistic.awayTotal} />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                            )
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MatchStatistics