import { IEventLineupAndStatisticsAPIJson, IPlayers, TeamLineupsInfo } from '@/interface/api/eventLineupAndStatistics'
import React from 'react'
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { EventAPIJson } from '@/interface/api/event'
import { teamOfTheWeekAPIJson } from '@/interface/api/teamOfTheWeek'
import Shimmer_TeamOfTheWeek from '../shimmer/shimmer_TeamOfTheWeek'
import { CountUpAnimation } from '../tournament/teamOfTheWeek'
import ThePitch from './ThePitch'
import { IPlayer, PlayerAPIJson } from '@/interface/api/lineups'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import Shimmer_lineupAndStatic from '../shimmer/shimmer_lineupAndStatic'
import { ManagerAPIJson } from '@/interface/api/managers'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'
import Link from 'next/link'
import { usePlayersStatisticCards } from '@/context/playersStatisticCardsContext'
interface TopTeamsProps {
  tournamentId: number
  featuredEvent: EventAPIJson | undefined
  seasonId: string | null
}

function lastIndex({ lineups, columnIndex }: { columnIndex: number, lineups: TeamLineupsInfo }): number {
  // function lastIndex(lineupsTeam: teamOfTheWeekAPIJson, columnIndex: number, lineups: IEventLineupAndStatisticsAPIJson | null): number {
  let result = 1; // Goalkeeper
  if (columnIndex > 0) for (const length of lineups.formation.split("-").filter((_, i) => i < columnIndex).map(value => parseInt(value))) result += length;
  return result;
}


interface ILineupPlayerProps {
  incidents: IIncidentsAPIJson[]
  lineups: TeamLineupsInfo
  index: number
  isHome: boolean
  confirmed: boolean
  event: EventAPIJson | null,


}
const LineupPlayer = ({ incidents, lineups, index, isHome, confirmed, event }: ILineupPlayerProps) => {
  const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()

  const player: IPlayers = lineups.players[index]
  let playerSub: IPlayer | null = null
  player.goals = 0


  const handleDisplayPlayerStatis = ({ e, player }: { e: any, player: IPlayer }) => {
    if (!event)
      return
    const subTime = incidents.find((itm) => itm?.playerOut?.id == player.id)?.time
    e.preventDefault();
    setPlayersOverview((prev: any[]) => {
      if (prev.find((item) => item.player.id == player.id && item.event.id == event.id))
        return [...prev]
      return [...prev, { player, event, playerSub, subTime, subType: 'Substitutedoff by:' }]
    });
  };

  incidents.map((it) => {
    if (it.incidentType == "goal" && it.player.id == player.player.id)
      player.goals += 1
    if (it.incidentType == "card" && it.player?.id == player.player?.id)
      it.incidentClass == "yellow" ? player.yellowCard = true : it.incidentClass == 'red' ? player.redCard = true : player.yellowRedCard = true
    if (it.incidentType == "substitution" && it.playerOut?.id == player.player?.id) {
      playerSub = (it.playerIn as IPlayer)
      player.substitute = true
    }
  })

  return <div className=' relative '>
    <Link onClick={(e) => handleDisplayPlayerStatis({ e: e, player: player.player })} href={`/ma/player/${player.player.slug}/${player.player.id}`} className="w-[60px] h-full   rounded-xl flex  flex-col items-center space-y-2">
      <DisplayImage
        onErrorImage='player'
        alt=""
        width={400}
        height={400}
        className=" w-10 h-10 bg-gray-200 rounded-full"
        src={`https://api.sofascore.app/api/v1/player/${player.player.id}/image`}
      />
      <div className=" truncate text-[10px] font-medium">
        {player.player.shortName}
      </div>
    </Link>
    {
      confirmed ?
        <div className={`absolute z-10 bottom-[17px] -left-2 text-white  flex justify-center items-center scale-[62%]`}>
          <DisplayRating rating={player.statistics ? player.statistics.rating : 0} type='in' />
        </div> :
        <div className={`  text-center rounded-sm absolute bottom-[17px] -left-2 text-white  flex justify-center items-center scale-[62%]`}>
          <DisplayRating rating={player.avgRating} type='in' />
        </div>
    }
    {
      player.yellowRedCard ? <div
        className='h-5 w-4 text-center rounded-sm absolute top-[0px]  -right-1 bg-yellow-500'
      >
        <div className="w-4 h-5 bg-red-500 absolute  bottom-1  left-1  border-l-3 border-b-3 border-[#cbedbf]"></div>
      </div> : true
    }
    {(player.yellowCard || player.redCard) && <div className={`  text-[12px] font-semibold h-5 w-3 scale-85  text-center rounded-sm absolute top-[0px]  -right-1  ${player.yellowCard ? 'bg-yellow-500' : "bg-red-500"}`} />}
    {player.substitute ? <Image width={400} height={400} className="rounded-full w-5 h-5 absolute   -top-[70px] scale-80 -left-1 text-white  " src={`/image/repost.png`} alt="" /> : null}
    {player.goals ? <Image width={400} height={400} className="rounded-full w-3.5 h-3.5 absolute bottom-[16px]  right-2 text-white  " src={`/image/ball.svg`} alt="" /> : null}
  </div >
}

interface ILineupsTeamProps {
  incidents: IIncidentsAPIJson[]
  lineups: TeamLineupsInfo
  isHome: boolean
  confirmed: boolean
  event: EventAPIJson | null,
}

const LineupsTeam = ({ incidents, lineups, isHome, confirmed, event }: ILineupsTeamProps) => {
  return (
    <div className={`  flex-1 h-full  flex w-1/2   relative z-20 left-0  p-3  overflow-hidden ${isHome ? 'flex-row' : ' flex-row-reverse '} w-1/2  items-center justify-center`}>
      <div className={` ${isHome ? 'mb-1' : 'mt-1'}`}>
        <LineupPlayer event={event} incidents={incidents} lineups={lineups} isHome={isHome} index={0} confirmed={confirmed} />
      </div>
      <div
        className={` flex    ${isHome ? 'flex-row' : 'flex-row-reverse'}   h-full w-full   justify-around items-center `}
      >
        {
          lineups.formation.split("-").map((value, i) => (
            <div key={i} className={` ${value == '3' ? 'space-y-6' : value == '2' ? 'space-y-10 ' : 'space-y-4'} flex flex-col ${isHome ? ' flex-col-reverse' : ''} `}>
              {[...Array(parseInt(value))].map((_, j) => (
                <LineupPlayer key={j} event={event} incidents={incidents} isHome={isHome} lineups={lineups} index={lastIndex({ lineups: lineups, columnIndex: i }) + j} confirmed={confirmed} />))}
            </div>
          ))
        }
      </div>
    </div>
  )
}

const AverageCard = ({ Teamlineups, teamName }: { Teamlineups: TeamLineupsInfo, teamName: String }) => {
  return <div className="w-[310px] h-20 bg-[#bee8af] rounded-md p-2 flex flex-col justify-between ">
    <div className="flex  justify-between items-center font-medium">
      <div className="flex items-center space-x-2">
        <div className=" text-[20px]  truncate">{teamName}</div>
        <div className="w-4 h-4  border-1  translate-x-2 bg-yellow-500" />

      </div>
      <div className="">
        {Teamlineups.formation}
      </div>
    </div>
    <div className="">
      First XI average age <span className='font-medium'>
        {Math.ceil((Teamlineups.players.filter(it => !it.substitute).reduce((a, b) => a + (new Date().getFullYear() - new Date(b.player.dateOfBirthTimestamp * 1000).getFullYear()), 0) / 11) * 10) / 10}
      </span> yrs
    </div>
  </div>
}

const CheckSubstitutions = ({ item, incidents }: { item: any, incidents: any[] }) => {
  const player = incidents.find((itm) => itm?.playerIn?.id == item.player.id)

  if (player != undefined)
    return (
      <div className="  flex items-center space-x-1">
        <span className='font-[2000] text-green-600 text-2xl'>
          <Image className='w-3.5 h-3.5' alt='subs' src={'/image/repost.png'} width={400} height={400} />
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          {player.time}{`'`}
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          out:
        </span>
        <span className='text-[12px] text-gray-400 font-normal relative top-0.5'>
          {player.playerOut.shortName}
        </span>
      </div>
    )
  return <div className=""></div>
}

interface ILineupSubstitutionsProps {
  event: EventAPIJson | null
  teamlineups: TeamLineupsInfo
  incidents: IIncidentsAPIJson[]
}

const LineupSubstitutions = ({ event, teamlineups, incidents }: ILineupSubstitutionsProps) => {
  const { playersOverview, setPlayersOverview } = usePlayersStatisticCards()

  const handleDisplayPlayerStatis = ({ e, player }: { e: any, player: IPlayer }) => {
    if (!event)
      return
    const subTime = incidents.find((itm) => itm?.playerIn?.id == player.id)?.time
    e.preventDefault();
    const playerSub = incidents.find((itm) => itm?.playerIn?.id == player.id)?.playerOut
    setPlayersOverview((prev: any[]) => {
      if (prev.find((item) => item.player.id == player.id && item.event.id == event.id))
        return [...prev]
      return [...prev, { player, event, playerSub, subTime, subType: 'Substituted on by:' }]
    });
  };
  return <div className="w-1/2 px-4">
    {
      teamlineups.players.map((item, index) =>
        item.substitute && <Link
          onClick={(e) => handleDisplayPlayerStatis({ e: e, player: item.player })} href={`/ma/player/${item.player.slug}/${item.player.id}`}
          key={index}
          className="flex items-start space-x-2 w-full border-b-[1px] border-gray-200  rounded-xl p-2">
          <div className="w-10">
            <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
          </div>
          <div className="w-full  flex justify-between h-full">
            <div className="text-sm  h-10  text-start">
              <div className="text-gray-700">{item.player.name}</div>
              <CheckSubstitutions item={item} incidents={incidents} />
            </div>
            {
              event?.status.description == 'Ended' &&
              <DisplayRating rating={item.statistics ? item.statistics.rating : 0} type='in' />
            }
          </div>
        </Link>
      )
    }
  </div>

}

const MissingPlayers = ({ teamlineups, incidents }: { teamlineups: TeamLineupsInfo, incidents: IIncidentsAPIJson[] }) => {
  return <div className="w-1/2 px-4">
    {
      teamlineups.missingPlayers ? teamlineups.missingPlayers.map((item, index) =>
        <button key={index} className="flex items-center space-x-2 w-full border-b-[1px] border-gray-200  rounded-xl p-2">
          <div className="w-10">
            <DisplayImage onErrorImage='player' className='rounded-full' src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`} width={200} height={200} alt='' />
          </div>
          <div className="text-sm   text-start -space-y-2">
            <div className="text-gray-700">{item.player.name}</div>
            <div className="  flex items-center space-x-1">
              <span className='font-[2000] text-red-600 text-3xl'>
                +
              </span>
              <span className='text-lg text-red-500 font-normal relative top-0.5'>
                out
              </span>
            </div>
          </div>
        </button>
      ) : null
    }
  </div>

}

const Managers = ({ event }: { event: EventAPIJson | null }) => {

  const [managers, setManagers] = useState<ManagerAPIJson>()

  useEffect(() => {
    (
      async () => {
        try {
          if (event == null)
            return
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${event.id}/managers`, {});
          if (response.ok) {
            const data = await response.json()
            setManagers(data)
          }
        } catch (error) {

        }
      }
    )()
  }, [event])

  if (!managers || !event)
    return

  return <div className="flex space-x-10">
    <div className="w-full space-y-2">
      <Link href={`/ma/team/${event.homeTeam.slug}/${event.homeTeam.id}`} className="flex items-center space-x-2 w-full  bg-gray-200/20  rounded-xl p-2">
        <DisplayImage onErrorImage='team'
          className='rounded-full w-10 h-10'
          src={`https://api.sofascore.app/api/v1/team/${event.homeTeam.id}/image`}
          width={200}
          height={200}
          alt=''
        />
        <div className="text-gray-700 text-lg   text-start font-extrabold">{event.homeTeam.name}</div>
      </Link>

      <Link href={`/ma/manager/${managers.homeManager.slug}/${managers.homeManager.id}`} className="flex items-center space-x-2 w-full  bg-gray-200/60  rounded-xl p-2">
        <div className="w-10">
          <DisplayImage onErrorImage='manager' className='rounded-full' src={`https://sofascore.com/api/v1/manager/${managers.homeManager.id}/image`} width={200} height={200} alt='' />
        </div>
        <div className="text-sm   text-start">
          <div className="text-gray-700">{managers.homeManager.name}</div>
          <div className="text-green-500">Manager</div>
        </div>
      </Link>
    </div>


    <div className="w-full space-y-2">
      <Link href={`/ma/team/${event.awayTeam.slug}/${event.awayTeam.id}`} className="flex items-center space-x-2 w-full  bg-gray-200/20  rounded-xl p-2">
        <DisplayImage onErrorImage='player' className='rounded-full w-10 h-10'
          src={`https://api.sofascore.app/api/v1/team/${event.awayTeam.id}/image`}
          width={200} height={200} alt='' />
        <div className="text-gray-700 text-lg   text-start font-extrabold">{event.awayTeam.name}</div>
      </Link>
      <Link href={`/ma/manager/${managers.awayManager.slug}/${managers.awayManager.id}`} className="flex items-center space-x-2 w-full  bg-gray-200/60  rounded-xl p-2">
        <div className="w-10">
          <DisplayImage onErrorImage='manager' className='rounded-full' src={`https://sofascore.com/api/v1/manager/${managers.awayManager.id}/image`} width={200} height={200} alt='' />
        </div>
        <div className="text-sm   text-start">
          <div className="text-gray-700">{managers.awayManager.name}</div>
          <div className="text-green-500">Manager</div>
        </div>
      </Link >
    </div>

  </div>
}

interface ILineupEventProps {
  lineups: IEventLineupAndStatisticsAPIJson | null,
  event: EventAPIJson | null,
  incidents: IIncidentsAPIJson[]

}
const LineupEvent = ({ lineups, incidents, event }: ILineupEventProps) => {

  const [waitdata, setWaitdata] = useState(!true)


  return (
    <div className="MYDeg w-full bg-[#ffffff] rounded-2xl  space-y-2  p-2">
      {
        lineups == null ? <Shimmer_lineupAndStatic /> :
          <div className=" bg-[#cbedbf]  p-5 rounded-xl">
            <div className='    relative   border-white border-2'>
              <ThePitch />
              <div className="flex">
                <LineupsTeam event={event} incidents={incidents} lineups={lineups.home} confirmed={lineups.confirmed} isHome={true} />
                <LineupsTeam event={event} incidents={incidents} lineups={lineups.away} confirmed={lineups.confirmed} isHome={false} />
              </div>
            </div >
            <div className="flex justify-between mt-2">
              <AverageCard teamName={event ? event.homeTeam.shortName : ''} Teamlineups={lineups.home} />
              <AverageCard teamName={event ? event.awayTeam.shortName : ''} Teamlineups={lineups.away} />
            </div>
          </div>
      }
      {
        lineups &&
        <>
          <div className="px-4">
            <Managers event={event} />
          </div>
          <div className="px-4 my-2">
            <div className="text-center py-2 font-bold">Substitutions</div>
            <div className="flex">
              <LineupSubstitutions event={event} teamlineups={lineups.home} incidents={incidents} />
              <LineupSubstitutions event={event} teamlineups={lineups.away} incidents={incidents} />
            </div>
          </div>
          <div className="px-4 my-2">
            <div className="text-center py-2 font-bold">Missing players</div>
            <div className="flex">
              <MissingPlayers teamlineups={lineups.home} incidents={incidents} />
              <MissingPlayers teamlineups={lineups.away} incidents={incidents} />
            </div>
          </div>
        </>
      }

    </div >
  )
}

export default LineupEvent
