import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { EventAPIJson } from '@/interface/api/event'
import { RoundsTeamOfWeekAPIJson } from '@/interface/api/TeamOfWeekRounds'
import { teamOfTheWeekAPIJson } from '@/interface/api/teamOfTheWeek'
import Shimmer_TeamOfTheWeek from '../shimmer/shimmer_TeamOfTheWeek'
import { PlayerAPIJson } from '@/interface/api/player'
import { ISeasons, ISeassonStatisticsAPIJson, IUniqueTournament } from '@/interface/api/seassonStatistics'
import SvgIcons from '@/utils/svgIcons'
import CustomDropdown from '@/utils/customDropdown'
import { IOverallStatisticsAPIJson } from '@/interface/api/overallStatistics'
import { addSpaceBeforeUppercase, getRatingColor } from '@/utils/function'
import LastRating from './lastRatingt'
import DisplayRating from '@/utils/displayRating'
import DisplayImage from '@/utils/displayImage'

const PlayersStatisticsKeys = {
	Summary: ['goals', 'goalAssist', 'totalTackle', 'accuratePass', 'Duels (won)', 'groundDuels (won)', 'Aerial duels (won)', 'Position', 'minutesPlayed', 'rating'],
	Attack: ['onTargetScoringAttempt', 'expectedGoals', 'shotOffTarget', 'blockedScoringAttempt', 'totalContest', 'Notes', 'Position', 'rating'],
	Defence: ['defensiveActions', 'totalClearance', 'outfielderBlock', 'interceptionWon', 'totalTackle', 'challengeLost', 'Notes', 'Position', 'rating'],
	Passing: ['touches', 'accuratePasses', 'keyPass', 'totalCross', 'totalLongBalls', 'Notes', 'Position', 'rating'],
	Duels: ['Duels (won)', 'groundDuels (won)', 'Aerial duels (won)', 'possessionLostCtrl', 'fouls', 'wasFouled', 'totalOffside', 'rating',],
	Goalkeeper: ['saves', 'goalsPrevented', 'punches', 'Notes', 'Runs out (succ.)', 'goodHighClaim', 'Position', 'rating'],
}


interface ISelectTournamentAndSeassonProps {
	selectTournament: IUniqueTournament | null
	setSelectTournament: (selectTournament: IUniqueTournament | null) => void
	selectSeason: ISeasons | null
	setSelectSeason: (selectSeason: ISeasons | null) => void
	player: PlayerAPIJson | null
	waitdata: string
	setWaitdata: (waitdata: string) => void
	seassonStatistics: ISeassonStatisticsAPIJson | null
	setSeassonStatistics: (seassonStatistics: ISeassonStatisticsAPIJson | null) => void
}
const SelectTournamentAndSeasson = ({ seassonStatistics, setSeassonStatistics, player, waitdata, setWaitdata, selectTournament, setSelectTournament, selectSeason, setSelectSeason }: ISelectTournamentAndSeassonProps) => {


	useEffect(() => {

		const getThestatisticsSeasons = async () => {
			try {
				if (player == null)
					return
				const response = await fetch(`https://www.sofascore.com/api/v1/player/${player.id}/statistics/seasons`, {})
				if (response.ok) {
					const data = await response.json()
					setSeassonStatistics(data)
					setWaitdata('done')
					setSelectTournament((data as ISeassonStatisticsAPIJson).uniqueTournamentSeasons[0].uniqueTournament)
					setSelectSeason((data as ISeassonStatisticsAPIJson).uniqueTournamentSeasons[0].seasons[0])
				}
			} catch (error) {
				setWaitdata('error')
			}
		}
		getThestatisticsSeasons()
	}, [player, setSeassonStatistics, setSelectSeason, setSelectTournament, setWaitdata])

	if (waitdata == 'wait' || !selectTournament || !selectSeason || !seassonStatistics)
		return <div className='w-full flex items-center justify-center h-52 MYDeg  bg-[#ffffff] rounded-2xl'>
			<div className="w-10 h-10 rounded-full border-2 border-black border-r-transparent animate-spin"></div>
		</div>

	return <div className="  flex justify-between p-2 bg-on-surface-nLv5  shadow-medium rounded-md  m-2">
		<CustomDropdown
			buttonStyle=' w-44'
			buttonContent={
				<div className="  w-28 truncate ">
					{selectTournament.name}
				</div>
			}
			CustomDropdownContent={
				seassonStatistics?.uniqueTournamentSeasons.map((item, index) => (
					<button key={index} onClick={() => { setSelectTournament(item.uniqueTournament), setSelectSeason(item.seasons[0]) }} className={`  ${selectTournament.name == item.uniqueTournament.name ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
						<DisplayImage onErrorImage='tournament' className='w-5 h-5' alt={'tournament:' + item.uniqueTournament.name} src={`https://api.sofascore.app/api/v1/unique-tournament/${item.uniqueTournament.id}/image`} width={500} height={500} />
						<div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
							{item.uniqueTournament.name}
						</div>
						{
							selectTournament.name == item.uniqueTournament.name &&
							<div className="w-[20px] h-[20px] ">
								<SvgIcons iconName='OKy' />
							</div>
						}
					</button>
				))
			} />

		<CustomDropdown
			buttonContent={
				<div className="">
					{selectSeason.year}
				</div>
			}
			CustomDropdownContent={
				seassonStatistics?.uniqueTournamentSeasons.find((it) => it.uniqueTournament.id == selectTournament.id)?.seasons.map((season, index) => (
					<button
						key={index}
						onClick={() => { setSelectSeason(season) }}
						className={`${selectSeason.year == season.year ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-4 py-1`}                >
						<div className="">
							{season.year}
						</div>
						{
							selectSeason.year == season.year &&
							<div className="w-3.5 h-3.5">
								<SvgIcons iconName='OKy' />
							</div>
						}
					</button>
				))
			} />
	</div>
}

const SeassonStatistics = ({ player }: { player: PlayerAPIJson | null }) => {
	const [selectTournament, setSelectTournament] = useState<IUniqueTournament | null>(null)
	const [selectSeason, setSelectSeason] = useState<ISeasons | null>(null)
	const [seassonStatistics, setSeassonStatistics] = useState<ISeassonStatisticsAPIJson | null>(null)
	const [statistics, setStatistics] = useState<IOverallStatisticsAPIJson | null>(null)
	const [playerStatistics, setPlayerStatistics] = useState<{ [typeName: string]: { [statisName: string]: string | number } } | null>(null)
	const [waitdata, setWaitdata] = useState('wait')

	useEffect(() => {
		(
			async () => {
				try {

					if (!player || !selectSeason || !selectTournament)
						return
					const response = await fetch(`https://www.sofascore.com/api/v1/player/${player.id}/unique-tournament/${selectTournament.id}/season/${selectSeason.id}/statistics/overall`, {})
					if (response.ok) {
						const data = await response.json()
						setStatistics(data)
						const playerStatistics: { [typeName: string]: { [statisName: string]: string | number } } =
						{
							'Matches': {
								"Total played": data.statistics?.appearances ?? 0,
								"Started": data.statistics?.matchesStarted ?? 0,
								"Minutes per game": ((data.statistics?.minutesPlayed ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(0),
								"Team of the week": data.statistics?.totwAppearances ?? 0
							},
							"Attacking": {
								"Goals": data.statistics?.goals ?? 0,
								"Expected Goals (xG)": (data.statistics?.expectedGoals ?? 0).toFixed(2),
								"Scoring frequency": `${(data.statistics?.scoringFrequency ?? 0).toFixed()} min`,
								"Goals per game": ((data.statistics?.goals ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Shots per game": ((data.statistics?.totalShots ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Shots on target per game": ((data.statistics?.shotsOnTarget ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Big chances missed": data.statistics?.bigChancesMissed ?? 0,
								"Goal conversion": `${(data.statistics?.goalConversionPercentage ?? 0).toFixed()}%`,
								"Penalty goals": data.statistics?.penaltyGoals ?? 0,
								"Penalty conversion": `${data.statistics?.penaltyConversion ?? 0}%`,
								"Free kick goals": `${data.statistics?.goalKicks ?? 0}/${data.statistics?.shotFromSetPiece ?? 0}`,
								"Free kick conversion": `${((data.statistics?.goalKicks ?? 0) / (data.statistics?.shotFromSetPiece ?? 1) * 100).toFixed()}%`,
								"Goals from inside the box": `${data.statistics?.goalsFromInsideTheBox ?? 0}/${data.statistics?.shotsFromInsideTheBox ?? 0}`,
								"Goals from outside the box": `${data.statistics?.goalsFromOutsideTheBox ?? 0}/${data.statistics?.shotsFromOutsideTheBox ?? 0}`,
								"Headed goals": data.statistics?.headedGoals ?? 0,
								"Left foot goals": data.statistics?.leftFootGoals ?? 0,
								"Right foot goals": data.statistics?.rightFootGoals ?? 0,
								"Penalty won": data.statistics?.penaltyWon ?? 0
							},
							"Passing": {
								"Assists": data.statistics?.assists ?? 0,
								"Expected Assists (xA)": (data.statistics?.expectedAssists ?? 0).toFixed(2),
								"Touches": ((data.statistics?.touches ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Big chances created": data.statistics?.bigChancesCreated ?? 0,
								"Key passes": ((data.statistics?.keyPasses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Accurate per game": `${((data.statistics?.accuratePasses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.accuratePassesPercentage ?? 0).toFixed(0)}%)`,
								"Acc. own half": `${((data.statistics?.accurateOwnHalfPasses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${((data.statistics?.accurateOwnHalfPasses ?? 0) / (data.statistics?.totalOwnHalfPasses ?? 1) * 100).toFixed()}%)`,
								"Acc. opposition half": `${((data.statistics?.accurateOppositionHalfPasses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${((data.statistics?.accurateOppositionHalfPasses ?? 0) / (data.statistics?.totalOppositionHalfPasses ?? 1) * 100).toFixed()}%)`,
								"Acc. long balls": `${((data.statistics?.accurateLongBalls ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.accurateLongBallsPercentage ?? 0).toFixed(0)}%)`,
								"Acc. chipped passes": `${((data.statistics?.accurateChippedPasses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${((data.statistics?.accurateChippedPasses ?? 0) / (data.statistics?.totalChippedPasses ?? 1) * 100).toFixed()}%)`,
								"Acc. crosses": `${((data.statistics?.accurateCrosses ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${((data.statistics?.accurateCrosses ?? 0) / (data.statistics?.totalCross ?? 1) * 100).toFixed()}%)`
							},
							"Defending": {
								"Interceptions per game": ((data.statistics?.interceptions ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Tackles per game": ((data.statistics?.tackles ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Possession won": ((data.statistics?.possessionWonAttThird ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Balls recovered per game": ((data.statistics?.ballRecovery ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Dribbled past per game": ((data.statistics?.dribbledPast ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Clearances per game": ((data.statistics?.clearances ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Error led to shot": data.statistics?.errorLeadToShot ?? 0,
								"Error led to goal": data.statistics?.errorLeadToGoal ?? 0,
								"Penalties committed": data.statistics?.penaltyConceded ?? 0
							},
							"Other": {
								"Succ. dribbles": `${((data.statistics?.successfulDribbles ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.successfulDribblesPercentage ?? 0).toFixed(0)}%)`,
								"Total duels won": `${((data.statistics?.totalDuelsWon ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.totalDuelsWonPercentage ?? 0).toFixed(0)}%)`,
								"Ground duels won": `${((data.statistics?.groundDuelsWon ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.groundDuelsWonPercentage ?? 0).toFixed(0)}%)`,
								"Aerial duels won": `${((data.statistics?.aerialDuelsWon ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)} (${(data.statistics?.aerialDuelsWonPercentage ?? 0).toFixed(0)}%)`,
								"Possession lost": ((data.statistics?.possessionLost ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Fouls": ((data.statistics?.fouls ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Was fouled": ((data.statistics?.wasFouled ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1),
								"Offsides": ((data.statistics?.offsides ?? 0) / (data.statistics?.appearances ?? 1)).toFixed(1)
							},
							"Cards": {
								"Yellow": data.statistics?.yellowCards ?? 0,
								"Yellow-Red": data.statistics?.yellowRedCards ?? 0,
								"Red cards": data.statistics?.redCards ?? 0
							}
						}
						setPlayerStatistics(playerStatistics)
					}

				} catch (error) {

				}
			}
		)()
	}, [player, selectSeason, selectTournament])

	return (
		<div className="MYDeg   w-full bg-[#ffffff] rounded-2xl  space-y-2  p-2">
			<SelectTournamentAndSeasson
				player={player}
				selectTournament={selectTournament}
				selectSeason={selectSeason}
				setSelectTournament={setSelectTournament}
				setSelectSeason={setSelectSeason}
				waitdata={waitdata}
				setWaitdata={setWaitdata}
				seassonStatistics={seassonStatistics}
				setSeassonStatistics={setSeassonStatistics}

			/>
			{statistics && <div className="p-2 flex items-center justify-between">
				<div className="font-semibold">Average Sofascore Rating</div>
				<div className="font-semibold flex items-center  space-x-2 scale-85">
					{
						<DisplayRating rating={statistics?.statistics.rating} type='out' />
					}
				</div>
			</div>}
			<LastRating
				player={player}
				selectTournament={selectTournament}
				selectSeason={selectSeason}
			/>

			{

				playerStatistics &&
				<Accordion
					defaultSelectedKeys={'all'}
					selectionMode="multiple"
					showDivider={false}
					// className=''
					// isCompact
					variant="splitted"

				>
					{Object.entries(playerStatistics).map(([typeName, index]) => (
						<AccordionItem
							key={typeName}
							indicator={<SvgIcons iconName='arraw' />}
							subtitle={<div className='font-semibold text-black'>{typeName}</div>}
						>
							{Object.getOwnPropertyDescriptor(playerStatistics, typeName) && Object.entries(Object.getOwnPropertyDescriptor(playerStatistics, typeName)?.value).map(([statisName, value]) =>
								<div key={statisName} className='w-full flex justify-between text-sm leading-8'>
									<div className="">

										{statisName}
									</div>
									<div className="">
										{(value as string)}
									</div>
								</div>
							)}
						</AccordionItem>
					))}
				</Accordion>
			}


		</div >
	)
}

export default SeassonStatistics

