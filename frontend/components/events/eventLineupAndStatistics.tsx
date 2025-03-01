import { PlayerStatisticsAPIjson } from "@/interface/api/PlayerStatistics";
import { EventAPIJson } from "@/interface/api/event";
import { StandingsAPIJson } from "@/interface/api/standings";
import { useEffect, useState } from "react";
import Shi_StatisticsTable from "../shimmer/shi_StatisticsTable";
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { CountUpAnimation } from "../tournament/teamOfTheWeek";
import Image from "next/image";
import { addSpaceBeforeUppercase } from "@/utils/function";
import { IEventLineupAndStatisticsAPIJson } from "@/interface/api/eventLineupAndStatistics";
import LineupEvent from "./LineupEvent";
import { IIncidentsAPIJson } from "@/interface/api/incidents";
import DisplayRating from "@/utils/displayRating";
import DisplayImage from "@/utils/displayImage";
import Link from "next/link";
import { IPlayer } from "@/interface/api/lineups";

const PlayersStatisticsKeys = {
    Summary: ['goals', 'goalAssist', 'totalTackle', 'accuratePass', 'Duels (won)', 'groundDuels (won)', 'Aerial duels (won)', 'Position', 'minutesPlayed', 'rating'],
    Attack: ['onTargetScoringAttempt', 'expectedGoals', 'shotOffTarget', 'blockedScoringAttempt', 'totalContest', 'Notes', 'Position', 'rating'],
    Defence: ['defensiveActions', 'totalClearance', 'outfielderBlock', 'interceptionWon', 'totalTackle', 'challengeLost', 'Notes', 'Position', 'rating'],
    Passing: ['touches', 'accuratePasses', 'keyPass', 'totalCross', 'totalLongBalls', 'Notes', 'Position', 'rating'],
    Duels: ['Duels (won)', 'groundDuels (won)', 'Aerial duels (won)', 'possessionLostCtrl', 'fouls', 'wasFouled', 'totalOffside', 'rating',],
    Goalkeeper: ['saves', 'goalsPrevented', 'punches', 'Notes', 'Runs out (succ.)', 'goodHighClaim', 'Position', 'rating'],
}

interface ItemTableHeaderProps {
    item: string
    filter: string
    setFilter: (filter: string) => void
}

const ItemTableHeader = ({ item, filter, setFilter }: ItemTableHeaderProps) => {
    return <button onClick={() => filter == '-' + item ? setFilter(item) : setFilter('-' + item)} className={`  w-full max-w-[70px]  ${item == 'rating' ? 'min-w-[60px]' : ''} truncat  h-full text-center text-gray-800 flex flex-col justify-end items-center`}>
        <div className="truncat capitalize flex flex-col items-center justify-center pt-2   h-full ">
            {/* {item} */}
            {addSpaceBeforeUppercase(item == 'challengeLost' ? 'dribbledPast'
                : item == 'outfielderBlock' ? 'shotsBlocked' :
                    item == 'totalCross' ? 'Crosses (acc.)' :
                        item == 'totalContest' ? 'dribbleAttempts (succ.) ' :
                            item == 'onTargetScoringAttempt' ? 'shotsOnTarget' :
                                item == 'blockedScoringAttempt' ? 'shotsBlocked' :
                                    item == 'totalLongBalls' ? 'Long balls (acc.)' :
                                        item).replace(' ', '|').replace(' (', '|(').split('|').map((str, index) => <div key={index} className='truncate'>{str}</div>)}
        </div>
        <Image alt='arraw' className={`${filter == '-' + item ? ' -rotate-90' : filter == item ? 'rotate-90' : ' -rotate-90'}`} src={filter == item || filter == '-' + item ? '/image/blue-arraw.svg' : '/image/arraw.svg'} width={20} height={20} />
    </button >
}


interface StatisticsTableProps {
    PlayerStatistics: PlayerStatisticsAPIjson[],
    filter: string
    setFilter: (filter: string) => void
    event: EventAPIJson
    selectOption: string
    selectTeam: string
    setselectTeam: (selectTeam: string) => void

}
const StatisticsTable = ({ selectTeam, setselectTeam, selectOption, event, PlayerStatistics, setFilter, filter }: StatisticsTableProps) => {

    const notes = ['bigChanceCreated', 'bigChanceMissed', 'savedShotsFromInsideTheBox']
    return (
        <Table fullWidth className=' w-full ' isStriped aria-label="Example static collection table">
            <TableHeader className=''  >

                {
                    ['1', '2'].concat(Object.getOwnPropertyDescriptor(PlayersStatisticsKeys, selectOption)?.value).map((column, index) =>
                        index == 0 ?
                            (

                                <TableColumn key={index} className=''>
                                    <div className=" p-0 h-[60px] flex items-center text-gray-800">
                                        {'Name'}
                                    </div>
                                </TableColumn>
                            ) :
                            index == 1 ?
                                (
                                    <TableColumn key={index} className=''>
                                        <div className=" p-0 h-[60px] flex items-center text-gray-800 space-x-1">
                                            <button onClick={() => setselectTeam('both')} className={`flex items-center space-x-0.5 p-0.5  rounded-lg ${selectTeam == 'both' ? 'bg-blue-500/25 border-blue-500/55 border-1' : ''}`}>
                                                <DisplayImage onErrorImage='team' className="w-6 h-6" src={`https://sofascore.com/api/v1/team/${event.awayTeam.id}/image`} alt='/h' width={400} height={400} />
                                                <div className="">+</div>
                                                <DisplayImage onErrorImage='team' className="w-6 h-6" src={`https://sofascore.com/api/v1/team/${event.homeTeam.id}/image`} alt='/h' width={400} height={400} />
                                            </button>
                                            <button onClick={() => setselectTeam('home')} className={`flex p-0.5  rounded-lg ${selectTeam == 'home' ? 'bg-blue-500/25 border-blue-500/55 border-1' : ''}`}>
                                                <DisplayImage onErrorImage='team' className="w-6 h-6" src={`https://sofascore.com/api/v1/team/${event.homeTeam.id}/image`} alt='/h' width={400} height={400} />
                                            </button>
                                            <button onClick={() => setselectTeam('away')} className={`flex p-0.5  rounded-lg ${selectTeam == 'away' ? 'bg-blue-500/25 border-blue-500/55 border-1' : ''}`}>
                                                <DisplayImage onErrorImage='team' className="w-6 h-6" src={`https://sofascore.com/api/v1/team/${event.awayTeam.id}/image`} alt='/h' width={400} height={400} />
                                            </button>

                                        </div>
                                    </TableColumn>
                                )
                                :
                                (
                                    <TableColumn key={index} className=' p-0   h-[70px]  text-center '>
                                        <ItemTableHeader item={column} setFilter={setFilter} filter={filter} />
                                    </TableColumn>
                                )
                    )
                }
            </TableHeader>

            <TableBody items={PlayerStatistics}>
                {(item) => <TableRow className={``} key={item.player.id}>
                    {
                        ['1', '2'].concat(Object.getOwnPropertyDescriptor(PlayersStatisticsKeys, selectOption)?.value).map((column: string, index) =>
                            index == 0 ?
                                <TableCell key={index} className='p-1 '>
                                    <DisplayImage onErrorImage='team' className="w-6 h-6" src={`https://sofascore.com/api/v1/team/${item.isHome ? event.homeTeam.id : event.awayTeam.id}/image`} alt='/h' width={400} height={400} />
                                </TableCell>
                                : index == 1 ?
                                    <TableCell key={index} className=" p-1">
                                        <Link href={`/ma/player/${item.player.slug}/${item.player.id}`} className=" hover:text-blue-500 duration-150 truncate  text-[13px]">{item.player.name}</Link>
                                    </TableCell>
                                    : column == 'rating' ?
                                        <TableCell key={index}>
                                            <div className=" flex items-center space-x-2">
                                                <div className={`font-extrabold  text-center  w-7 flex justify-center items-center   text-[12px]   `} >
                                                    {item.rating ?
                                                        <DisplayRating rating={item.rating} type='in' />
                                                        : '-'
                                                    }
                                                </div>

                                            </div>
                                        </TableCell>
                                        : <TableCell key={index} className={`  ${column == 'Notes' ? 'text-[10px] p-[0px] ' : 'p-[1px]'} text-center `}>
                                            {
                                                column == 'Duels (won)' ? `${(item.duelWon || 0) + (item.duelLost || 0)} (${item.duelWon || 0})` :
                                                    column == 'Aerial duels (won)' ? `${(item.aerialWon || 0) + (item.aerialLost || 0)} (${item.aerialWon || 0})` :
                                                        column == 'groundDuels (won)' ? `G duels` :
                                                            column == 'Position' ? item.player.position :
                                                                column == 'goalsPrevented' ? item.goalsPrevented ? item.goalsPrevented.toFixed(2) : 0 :
                                                                    column == 'totalCross' ? `${item.totalCross || 0}/(${(item.accurateCross || 0)})` :
                                                                        column == 'totalContest' ? `${item.totalContest || 0}/(${(item.wonContest || 0)})` :
                                                                            column == 'Runs out (succ.)' ? `${item.totalKeeperSweeper || 0}/(${(item.accurateKeeperSweeper || 0)})` :
                                                                                column == 'totalLongBalls' ? `${item.totalLongBalls || 0}/(${(item.accurateLongBalls || 0)})` :
                                                                                    column == 'accuratePasses' ? `${item.accuratePass || 0}/${(item.totalPass || 1)} (${String(((item.accuratePass || 1) * 100) / (item.totalPass || 1)).split('.')[0]}%)` :
                                                                                        column == 'defensiveActions' ? (item.totalClearance || 0) + (item.interceptionWon || 0) + (item.totalTackle || 0) + (item.outfielderBlock || 0) :
                                                                                            column == 'Notes' ? `${item.bigChanceMissed ? `big Chance Missed : ${item.bigChanceMissed}` : '-'}`
                                                                                                :
                                                                                                (Object.getOwnPropertyDescriptor(item, column)?.value || 0)
                                            }
                                        </TableCell>
                        )
                    }
                </TableRow>
                }
            </TableBody>
        </Table>
    );
}


interface PlayerStatisticsProps {
    incidents: IIncidentsAPIJson[]
    setIncidents: (incidents: IIncidentsAPIJson[]) => void
    event: EventAPIJson | null
}

const EventLineup = ({ event, incidents, setIncidents }: PlayerStatisticsProps) => {
    const [PlayerStatistics, setPlayerStatistics] = useState<PlayerStatisticsAPIjson[]>([])
    const [lineups, setlineups] = useState<IEventLineupAndStatisticsAPIJson | null>(null)
    const [selectOption, setselectOption] = useState<string>('Summary')
    const [displayMode, setDisplayMode] = useState('LINEUP');
    const [selectTeam, setselectTeam] = useState<string>('both')
    const [filter, setFilter] = useState<string>('-rating')
    const [waitdata, setWaitdata] = useState(true);
    const performanceDetails = ['Summary', 'Attack', 'Defence', 'Passing', 'Duels', 'Goalkeeper']
    const [error, setError] = useState(false)
    useEffect(() => {
        const getLineups = async () => {
            try {
                if (event == null)
                    return
                setWaitdata(true)
                const response = await fetch(`https://sofascore.com/api/v1/event/${event.id}/lineups`, {})
                if (response.ok) {
                    const data = await response.json()
                    setlineups(data)
                    setWaitdata(false)
                }
            } catch (error) {
                setError(true)
            }
        }
        getLineups()
    }, [event])

    useEffect(() => {
        if (!lineups || !lineups.confirmed)
            return
        let statistic_: Array<PlayerStatisticsAPIjson> = []
        if (selectTeam == 'both' || selectTeam == 'home')
            Array.from(lineups.home.players).map((player: any, index) => {
                if (event?.status.description != 'Ended')
                    return
                if (selectOption == 'Goalkeeper' && player.position != 'G')
                    return
                if (selectOption != 'Goalkeeper' && player.position == 'G')
                    return
                let item_: PlayerStatisticsAPIjson
                item_ = player.statistics
                // item_.
                item_.player = player.player
                item_.player.shirtNumber = player.shirtNumber
                item_.player.jerseyNumber = player.jerseyNumber
                item_.player.position = player.position
                item_.player.substitute = player.substitute
                item_.isHome = true
                if (item_.minutesPlayed)
                    statistic_.push(item_)
            })
        if (selectTeam == 'both' || selectTeam == 'away')
            Array.from(lineups.away.players).map((player: any, index) => {
                if (event?.status.description != 'Ended')
                    return
                if (selectOption == 'Goalkeeper' && player.position != 'G')
                    return
                let item_: PlayerStatisticsAPIjson
                item_ = player.statistics
                item_.player = player.player
                item_.player.shirtNumber = player.shirtNumber
                item_.player.jerseyNumber = player.jerseyNumber
                item_.player.position = player.position
                item_.player.substitute = player.substitute
                item_.isHome = false
                if (item_.minutesPlayed)
                    statistic_.push(item_)
            })

        if (filter == 'Duels (won)' || filter == '-Duels (won)')
            statistic_.sort((a, b) => (filter == 'Duels (won)' ? 1 : -1) * (((a.duelWon || 0) + (a.duelLost || 0)) - ((b.duelWon || 0) + (b.duelLost || 0))))

        else if (filter == 'Aerial duels (won)' || filter == '-Aerial duels (won)')
            statistic_.sort((a, b) => (filter == 'Aerial duels (won)' ? 1 : -1) * (((a.aerialWon || 0) + (a.aerialLost || 0)) - ((b.aerialWon || 0) + (b.aerialLost || 0))))

        else if (filter == 'shotsBlocked' || filter == '-shotsBlocked')
            statistic_.sort((a, b) => (filter == 'shotsBlocked' ? 1 : -1) * ((a.outfielderBlock || 0) - (b.outfielderBlock || 0)))

        else if (filter == 'accuratePasses' || filter == '-accuratePasses')
            statistic_.sort((a, b) => (filter == 'accuratePasses' ? 1 : -1) * ((a.accuratePass || 0) - (b.accuratePass || 0)))

        else if (filter == 'defensiveActions' || filter == '-defensiveActions')
            statistic_.sort((a, b) => (filter == 'defensiveActions' ? 1 : -1) * (((a.totalClearance || 0) + (a.interceptionWon || 0) + (a.totalTackle || 0) + (a.outfielderBlock || 0)) - ((b.totalClearance || 0) + (b.interceptionWon || 0) + (b.totalTackle || 0) + (b.outfielderBlock || 0))))
        else
            statistic_.sort((a, b) => (filter[0] == '-' ? 1 : -1) * ((Object.getOwnPropertyDescriptor(b, filter[0] == '-' ? filter.slice(1) : filter)?.value || 0) - (Object.getOwnPropertyDescriptor(a, filter.slice(1))?.value || 0)))
        setPlayerStatistics(statistic_)
    }, [lineups, selectOption, filter, selectTeam, event])

    useEffect(() => { setFilter('-rating') }, [selectOption])

    if (error)
        return <div className="bg-[#ffffff] MYDeg rounded-2xl  h-32" />


    return (
        <div className="bg-[#ffffff] MYDeg rounded-2xl ">
            <div className={`p-4 space-x-4 ${event?.status.description == 'Ended' ? 'block' : 'hidden'}`}>
                <Button onClick={() => setDisplayMode('LINEUP')} className={`py-1 px-2 rounded-lg border-1 ${displayMode == 'LINEUP' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>LINEUP</Button>
                <Button onClick={() => setDisplayMode('SPLAYER STATISTICS')} className={`py-1 px-2 rounded-lg border-1 ${displayMode == 'SPLAYER STATISTICS' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>SPLAYER STATISTICS</Button>
            </div>
            {
                displayMode == 'LINEUP' ?
                    <LineupEvent event={event} lineups={lineups} incidents={incidents} />
                    :
                    <div className="">

                        <div className="w-full text-center text-lg font-semibold  pb-5 pt-2">Player Statistics</div>
                        <div className=" flex items-center font-medium space-x-3 text-sm pl-4">
                            {
                                performanceDetails.map((item, index) =>
                                    <button key={index} onClick={() => setselectOption(item)} className={`py-1 px-2 rounded-lg border-1 ${selectOption == item ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>{item}</button>
                                )
                            }
                        </div>
                        {
                            !waitdata && event ? <div className='w-full p-3'>
                                <StatisticsTable selectOption={selectOption} event={event} PlayerStatistics={PlayerStatistics} filter={filter} setFilter={setFilter} selectTeam={selectTeam} setselectTeam={setselectTeam} />
                            </div>
                                : <Shi_StatisticsTable />
                        }
                    </div>
            }
        </div >
    )
}

export default EventLineup