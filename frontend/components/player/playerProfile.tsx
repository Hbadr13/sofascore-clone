import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlayerAPIJson } from '@/interface/api/player'
import ShiPLayerSummarytsx from '../shimmer/shiPLayerSummary'
import SvgIcons from '@/utils/svgIcons'
import moment from 'moment'
 interface PlayerProfileProps {
    player: PlayerAPIJson | null
}


const PlayerProfile = ({ player }: PlayerProfileProps) => {
    if (!player)
        return

    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl  flex flex-col p-3 space-y-3 leading-5">
            <div className="w-full text-start text-lg font-semibold  pb-2">{player.name}</div>
            <p>{`${player.name} is ${moment(player.dateOfBirthTimestamp * 1000).format('YY')} years old (${moment(player.dateOfBirthTimestamp * 1000).format('ll')}), ${player.height} cm tall and plays for ${player.team.name}.`}</p>
            <p>{`${player.name} prefers to play with ${player.preferredFoot} foot. His jersey number is ${player.jerseyNumber}.`}</p>
            <p><Link href={'/'} className='text-blue-600'>{player.team.name}</Link>{` is playing their next match on Jul 5, 2024, 1:00:00 AM UTC against ${player.country.name} - Ecuador in Copa América.`}</p>
            <p>If {player.name} is going to be in {player.team.name} lineup, it will be confirmed on Sofascore one hour before the match starts.</p>
            <p>If {player.name} plays you will also be able to follow his live Sofascore rating, statistics and heatmap. {player.name} soccer player profile displays all matches and competitions with statistics for all the matches {player.name} played in. Most important stats for each competition, including average Sofascore rating, matches played, goals, assists, cards and other relevant data are also displayed.</p>
            <p>{player.name} is contracted until {moment(player.contractUntilTimestamp * 1000).format('ll')}.</p>
        </div >
    )
}

export default PlayerProfile
