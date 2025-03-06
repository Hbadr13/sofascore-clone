import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import { PlayerAPIJson } from '@/interface/api/player'
import ShiPLayerSummarytsx from '../shimmer/shiPLayerSummary'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
import { INationalTeamStatisticsAPIJson } from '@/interface/api/nationalTeam'
import { AllPlayersAPIJson } from '@/interface/api/allPlayers'
import { Checkbox } from '@nextui-org/react'
import DisplayImage from '@/utils/displayImage'


const getRatingColor = (type: string, rating: number | string): string => {
    rating = Number(rating)
    if (type == 'text')
        return rating > 9 ? 'text-blue-600' : rating > 8 ? ' text-[#00adc4]' : rating > 7 ? ' text-[#00c424]' : rating > 6.5 ? ' text-[#d9af00]' : ' text-[#dc0c00] '
    return rating > 9 ? 'bg-blue-600' : rating > 8 ? ' bg-[#00adc4]' : rating > 7 ? ' bg-[#00c424]' : rating > 6.5 ? ' bg-[#d9af00]' : ' bg-[#dc0c00] '
}

interface IAllPlayersProps {
    team: ITeamAPIJson | null
    allPlayers: AllPlayersAPIJson | null
    setAllPlayers: (allPlayers: AllPlayersAPIJson | null) => void
}
const AllPlayers = ({ team, allPlayers, setAllPlayers }: IAllPlayersProps) => {
    const [isSelected, setIsSelected] = React.useState(false);



    if (allPlayers == null)
        return <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3">
            <div className="w-full text-center text-lg font-semibold  pb-2">Players</div>
            <div className="w-full h-20 bg-surface-s2 animate-pulse rounded-xl"></div>
        </div>

    return (
        <div className={`bg-[#ffffff] MYDeg rounded-2xl  flex flex-col  ${isSelected ? 'py-2' : ' p-2'}`}>
            <div className={`hidden tablet:block w-full text-center text-lg font-semibold  pb-2  `}>Players</div>
            <div className={` hidden tablet:block p-4 space-x-4 ${isSelected ? 'translate-x-0' : ' -translate-x-2'}`}>
                <Checkbox isSelected={!isSelected} onValueChange={(prv) => setIsSelected(!prv)} >
                    List view
                </Checkbox>
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                    Box View
                </Checkbox>

            </div>
            {!isSelected ? <div className="space-y-6">
                {

                    ['F', 'M', 'D', 'G'].map((position, index) =>
                        <div key={index} className="">
                            <div className={` font-semibold ${position == 'F' ? 'text-red-500' : position == 'M' ? 'text-green-400' : position == 'D' ? 'text-blue-500' : 'text-orange-500'}`}>{position == 'F' ? 'Forward' : position == 'M' ? 'Midfielder' : position == 'D' ? 'Defender' : 'Goalkeeper'}</div>
                            <div className=" grid grid-cols-1 gap-2 tablet:gap-4    tablet:grid-cols-4 desktop:grid-cols-6">
                                {
                                    allPlayers.players.map((player, ind) =>
                                        player.player.position == position &&
                                        <Link href={`/ma/player/${player.player.slug}/${player.player.id}`} key={ind} className=' active:opacity-70 w-full tablet:w-[134px] bg-surface-s2 rounded-xl flex flex-col justify-between'>
                                            <div className="flex  flex-row  tablet:flex-col items-center p-4  space-x-2 space-y-0 tablet:space-x-0 tablet:space-y-2">
                                                <div className="relative">
                                                    <DisplayImage onErrorImage='player' className=' relative z-0 w-10 h-10  tablet:w-16  tablet:h-16 rounded-full border-1.5 border-slate-300' width={500} height={500} alt={'player:' + player.player.shortName} src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`} />
                                                    {player.player.jerseyNumber && <div className=' z-10 hidden tablet:flex bottom-0  right-0 absolute w-6 h-6 bg-gray-600 rounded-full  justify-center items-center text-white font-semibold'>{player.player.jerseyNumber}</div>}
                                                </div>
                                                <div className="  whitespace-pre-wrap  text-start  tablet:text-center text-sm font-semibold w-full ">
                                                    <div className="">
                                                        {player.player.name}
                                                    </div>
                                                    <div className=" flex tablet:hidden  items-center  space-x-1 ">
                                                        {player.player.jerseyNumber && <div className=" w-6 h-6 bg-gray-600 rounded-full  flex justify-center items-center text-white font-semibold ">{player.player.jerseyNumber}</div>}
                                                        <div className="text-on-surface-nLv3 text-sm font-normal">{moment(player.player.dateOfBirthTimestamp * 1000).fromNow().split(' ')[0]} yrs</div>
                                                        <div className=" translate-x-3 relative w-5 h-5 ">
                                                            <Image className='absolute top-0 w-5 h-5' width={20} height={20} alt={'team:' + player.player.shortName} src={`https://api.sofascore.app/static/images/flags/${player.player.country.alpha2.toLowerCase()}.png`} />
                                                        </div>
                                                        <div className="translate-x-3 text-on-surface-nLv3 text-sm font-normal">{player.player.country.alpha2}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-on-surface-nLv5  hidden tablet:flex justify-between items-center p-1 rounded-b-xl">
                                                <div className={` font-semibold ${position == 'F' ? 'text-red-500' : position == 'M' ? 'text-green-400' : position == 'D' ? 'text-blue-500' : 'text-orange-500'}`}>{player.player.position}</div>
                                                <div className="flex items-center space-x-1">
                                                    <DisplayImage onErrorImage='flag' className='w-5 h-5 rounded-full border-1.5' width={500} height={500} alt={'player:' + player.player.shortName} src={`https://api.sofascore.app/static/images/flags/${player.player.country.alpha2.toLowerCase()}.png`} />
                                                    <div className="">{player.player.country.alpha2}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div> :
                <div className="">
                    <div className=' flex  border-t-1  bg-surface-s2 text-on-surface-nLv2'>
                        <div className="w-3/5 flex   items-center p-1">
                            <div className="relative w-14  flex justify-center pl-6">
                                player
                            </div>
                        </div>
                        <div className={` w-1/5  text-sm border-x-1 p-1 text-center `}>Position</div>
                        <div className="w-1/5  text-center p-1">
                            <div >Age</div>
                        </div>
                    </div>
                    {
                        ['F', 'M', 'D', 'G'].map((position, index) =>
                            <div key={index} className=' border-t-1'>
                                {
                                    allPlayers.players.map((player, ind) =>
                                        player.player.position == position &&
                                        <Link href={`/ma/player/${player.player.slug}/${player.player.id}`} key={ind} className='active:opacity-70 flex  border-b-1 '>
                                            <div className="w-3/5 flex   items-center p-1">
                                                <div className="relative w-14  flex justify-center">
                                                    {player.player.jerseyNumber && <div className='w-6 h-6 bg-gray-600 rounded-full flex justify-center items-center text-white font-semibold'>{player.player.jerseyNumber}</div>}
                                                </div>
                                                <div className="truncate text-sm ">
                                                    {player.player.name}
                                                </div>
                                            </div>
                                            <div className={` w-1/5 font-semibold text-sm border-x-1 p-1 text-center ${player.player.position == 'F' ? 'text-red-600' : player.player.position == 'M' ? 'text-green-600' : player.player.position == 'D' ? 'text-blue-700' : 'text-orange-500'}`}>{player.player.position == 'F' ? 'Forward' : player.player.position == 'M' ? 'Midfielder' : player.player.position == 'D' ? 'Defender' : 'Goalkeeper'}</div>
                                            <div className="w-1/5  text-center p-1">
                                                <div >{moment(player.player.dateOfBirthTimestamp * 1000).startOf('year').fromNow().split(' ')[0]}</div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
}

export default AllPlayers
