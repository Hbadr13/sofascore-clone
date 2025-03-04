
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import Shimmer_topPlayer from '../shimmer/shi2_topPlayer'
import { addSpaceBeforeUppercase } from '@/utils/function'
import { EventAPIJson } from '@/interface/api/event'
import { ITopPlayersStatisticsAPIJson } from '@/interface/api/topPlayersStatistics'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'
import DisplayRating from '@/utils/displayRating'
import { SelectTournamentAndSeasson } from './teamStatistics'
import { ISeasons, ISeassonStatisticsAPIJson, IUniqueTournament } from '@/interface/api/seassonStatistics'
import DisplayImage from '@/utils/displayImage'


const satisNames: Array<{ name: string, slug: string, type: number }> = [
    { name: 'Average Sofascore Rating', slug: 'rating', type: 1 },
    { name: 'Goals', slug: 'goals', type: 2 },
    // { name: 'Expected Goals(xG) - Scored', slug: 'expectedGoals', type: -1 },
    { name: 'Assists', slug: 'assists', type: 2 },
    { name: 'Expected Assists(xA) - Assisted', slug: 'expectedAssists', type: -1 },
    { name: 'Goals + Assists', slug: 'goalsAssistsSum', type: 2 },
    { name: 'Penalty goals', slug: 'penaltyGoals', type: -1 },
    { name: 'Free kick goals', slug: 'freeKickGoal', type: -1 },
    { name: 'Scoring frequency(in minutes)', slug: 'scoringFrequency', type: 2 },
    { name: 'Total shots per game', slug: 'totalShots', type: 3 },
    { name: 'Shots on target per game', slug: 'shotsOnTarget', type: 3 },
    { name: 'Big chances missed', slug: 'bigChancesMissed', type: 2 },
    { name: 'Big chances created', slug: 'bigChancesCreated', type: 2 },
    { name: 'Accurate passes per game', slug: 'accuratePasses', type: -1 },
    { name: 'Key passes per game', slug: 'keyPasses', type: 3 },
    { name: 'Acc.long balls per game', slug: 'accurateLongBalls', type: 3 },
    { name: 'Succ.dribbles per game', slug: 'successfulDribbles', type: -1 },
    { name: 'Penalty won', slug: 'penaltyWon', type: 2 },
    { name: 'Tackles per game', slug: 'tackles', type: 3 },
    { name: 'Interceptions per game', slug: 'interceptions', type: 3 },
    { name: 'Clearances per game', slug: 'clearances', type: 3 },
    { name: 'Possession lost per game', slug: 'possessionLost', type: 3 },
    { name: 'Yellow cards', slug: 'yellowCards', type: 2 },
    { name: 'Red cards', slug: 'redCards', type: 2 },
    { name: 'Saves per game', slug: 'saves', type: 3 },
    { name: 'Goals prevented', slug: 'goalsPrevented', type: 1 },
    { name: 'Most conceded per game', slug: 'mostConceded', type: 5 },
    { name: 'Least conceded per game', slug: 'leastConceded', type: 5 },
    { name: 'Clean sheet', slug: 'cleanSheet', type: -1 }
]


const TopPlayersInTeam = ({ team }: { team: ITeamAPIJson | null }) => {
    const [topPlayersKeys, setTopPlayersKeys] = useState<Array<string>>([])
    const [selectTournament, setSelectTournament] = useState<IUniqueTournament | null>(null)
    const [selectSeason, setSelectSeason] = useState<ISeasons | null>(null)
    const [waitdata, setWaitdata] = useState('wait')
    const [topPlayers, settopPlayers] = useState<ITopPlayersStatisticsAPIJson | null>(null)
    const [topPlayersFilter, settopPlayersFilter] = useState<string>('rating')
    const [ShowMore, setShowMore] = useState(false)
    useEffect(() => {
        const getTopPlayers = async () => {
            try {

                if (!team || !selectSeason || !selectTournament)
                    return
                setWaitdata('wait')
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/unique-tournament/${selectTournament.id}/season/${selectSeason.id}/top-players/overall`, {})
                if (response.ok) {
                    const data = await response.json()
                    const _topPlayer: ITopPlayersStatisticsAPIJson = data.topPlayers
                    Object.entries(_topPlayer).map(([statisName, statistics]) =>
                        Object.entries(statistics).map(([key, info], index) => {
                            const _satisName = satisNames.find(({ slug }) => slug == statisName)
                            if (_satisName) {
                                if (_satisName.type == 3)
                                    info.value = (Object.getOwnPropertyDescriptor(info.statistics, statisName)?.value / info.statistics.appearances).toFixed(1)
                                else if (_satisName.type == 1)
                                    info.value = (Object.getOwnPropertyDescriptor(info.statistics, statisName)?.value).toFixed(2)
                                else if (_satisName.type == 2)
                                    info.value = (Object.getOwnPropertyDescriptor(info.statistics, statisName)?.value).toFixed()
                                else if (_satisName.type == 5)
                                    info.value = (Object.getOwnPropertyDescriptor(info.statistics, statisName == 'leastConceded' ? 'goalsConceded' : statisName == 'mostConceded' ? 'goalsConceded' : statisName)?.value / info.statistics.appearances).toFixed(1)
                                else if (_satisName.slug == 'expectedGoals')
                                    info.value = `${Number(info.statistics.expectedGoals).toFixed(2)} (${info.statistics.goals})`
                                else if (_satisName.slug == 'expectedAssists')
                                    info.value = `${Number(info.statistics.expectedAssists).toFixed(2)} (${info.statistics.assists})`
                                else if (_satisName.slug == 'penaltyGoals')
                                    info.value = `${info.statistics.penaltyGoals} / ${info.statistics.penaltiesTaken}`
                                else if (_satisName.slug == 'freeKickGoal')
                                    info.value = `${info.statistics.freeKickGoal} / ${info.statistics.shotFromSetPiece}`
                                else if (_satisName.slug == 'accuratePasses')
                                    info.value = `${Number(Number(info.statistics.accuratePasses) / info.statistics.appearances).toFixed(1)} (${Number(info.statistics.accuratePassesPercentage).toFixed(2)}%)`
                                else if (_satisName.slug == 'successfulDribbles')
                                    info.value = `${Number(Number(info.statistics.successfulDribbles) / info.statistics.appearances).toFixed(1)} (${Number(info.statistics.successfulDribblesPercentage).toFixed(2)}%)`
                                else
                                    info.value = Number(Object.getOwnPropertyDescriptor(info.statistics, statisName == 'leastConceded' ? 'goalsConceded' : statisName == 'mostConceded' ? 'goalsConceded' : statisName)?.value).toFixed(2)
                            }
                            else
                                info.value = Number(Object.getOwnPropertyDescriptor(info.statistics, statisName == 'leastConceded' ? 'goalsConceded' : statisName == 'mostConceded' ? 'goalsConceded' : statisName)?.value).toFixed(2)
                        }
                        )
                    )
                    settopPlayers(_topPlayer)
                    const keys = Object.keys(data.topPlayers).map((item: string, index: number) => item);
                    setTopPlayersKeys(keys)
                    setWaitdata('done')
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getTopPlayers()
    }, [team, selectTournament, selectSeason])

    if (waitdata == 'error')
        return <div />
    return (
        <div className="MYDeg  w-full bg-[#ffffff] rounded-2xl  space-y-2 ">
            <div className={`font-semibold pt-4 pl-4 ${waitdata == 'wait' ? 'hidden' : 'block'}`}>Top Players</div>
            <SelectTournamentAndSeasson
                type={'players'}
                team={team}
                selectTournament={selectTournament}
                selectSeason={selectSeason}
                setSelectTournament={setSelectTournament}
                setSelectSeason={setSelectSeason}
                waitdata={waitdata}
                setWaitdata={setWaitdata}
            />
            <div className={`border-b-[1px] border-gray-300 pb-4 ${waitdata == 'wait' ? 'hidden' : 'block'}`}>
                <div className="pl-10">
                    <CustomDropdown
                        buttonStyle=' w-44'
                        buttonContent={
                            <div className="  w-28 truncate ">
                                {satisNames.find(({ slug }) => slug == topPlayersFilter) != undefined ? satisNames.find(({ slug }) => slug == topPlayersFilter)?.name : addSpaceBeforeUppercase(topPlayersFilter)}
                            </div>
                        }
                        CustomDropdownContent={
                            topPlayersKeys.map((item, index) => (
                                <button key={index} onClick={() => { settopPlayersFilter(item) }} className={`  ${topPlayersFilter == item ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
                                    <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
                                        {satisNames.find(({ slug }) => slug == item) != undefined ? satisNames.find(({ slug }) => slug == item)?.name : addSpaceBeforeUppercase(item)}
                                    </div>
                                    {
                                        topPlayersFilter == item &&
                                        <div className="w-[20px] h-[20px] ">
                                            <SvgIcons iconName='OKy' />
                                        </div>
                                    }
                                </button>
                            ))
                        } />
                </div>
            </div>
            <div className={`${waitdata == 'wait' ? 'hidden' : 'block'}`}>
                <div className={`w-full flex   text-gray-400 font-extralight justify-between items-center p-2 `}>
                    <div className=" flex flex-col justify-center  text-sm">
                        #
                    </div>
                    <div className="pr-3  truncate  capitalize text-sm">
                        {satisNames.find(({ slug }) => slug == topPlayersFilter) != undefined ? satisNames.find(({ slug }) => slug == topPlayersFilter)?.name : addSpaceBeforeUppercase(topPlayersFilter)}
                    </div>
                </div>
                {
                    topPlayers && Object.entries(topPlayers).map(([statisName, statistics]) =>
                        statisName == topPlayersFilter &&
                        Object.entries(statistics).slice(0, ShowMore ? Object.entries(statistics).length : 10).map(([key, data], index) =>
                            <div key={index} className="">
                                {
                                    <div  >
                                        <Link href={`/ma/player/${data.player.slug}/${data.player.id}`} className="flex space-x-2 items-center  px-2 text-gray-900 text-opacity-75 hover:bg-custom-default-hover">

                                            <div className="text-[12px] w-5 text-black  font-normal">{index + 1}</div>
                                            <div className=" w-14  relative">
                                                <DisplayImage onErrorImage='player' width={1000} height={1000} className=" border-[1px]  border-gray-300 object-contain rounded-full" src={`https://api.sofascore.app/api/v1/player/${data.player.id}/image`} alt="" />
                                            </div>
                                            <div className={`w-full flex   justify-between items-center p-2  `}>
                                                <div className=" flex flex-col justify-center ">
                                                    <p className='text-black  font-normal'>{data.player.name}</p>
                                                    <p className="text-gray-900 opacity-55 text-[12px] truncate">
                                                        {data.player.position == 'F' ? 'Forward' : data.player.position == 'M' ? 'Midfielder' : data.player.position == 'D' ? 'Defender' : 'Goalkeeper'}
                                                    </p>
                                                </div>
                                                <div className=" flex justify-end items-center w-12 h-full">
                                                    {
                                                        topPlayersFilter == 'rating' ?
                                                            <DisplayRating rating={data.value} type='out' /> :
                                                            <div className={`h-full min-w-6 font-semibold    p-0.5 rounded-[4px] text-[14px]  text-center ${topPlayersFilter == 'rating' ? `${index == 0 ? 'bg-[#037ab0] text-white' : 'bg-green-600 text-white'}` : 'text-black'}`}>
                                                                {data.value}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                }
                            </div>
                        )
                    )
                }
            </div >
            <div className={`${waitdata == 'wait' ? 'hidden' : 'block'} w-full p-3 flex space-x-2  justify-end items-center`}>
                <button onClick={() => setShowMore((prv) => !prv)} className=" flex space-x-2 items-center">
                    <div className=" font-medium text-blue-600 ">
                        {ShowMore ? 'Show less' : 'Show more'}
                    </div>
                    <Image width={200} height={200} className={` w-4 ${ShowMore ? 'rotate-90 ' : '-rotate-90'}`} src="/image/blue-arraw.svg" alt="" />
                </button>
            </div>
            {
                waitdata == 'wait' && <Shimmer_topPlayer />
            }
        </div >
    )
}

export default TopPlayersInTeam