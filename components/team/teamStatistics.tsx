import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { ISeasons, ISeassonStatisticsAPIJson, IUniqueTournament } from '@/interface/api/seassonStatistics'
import SvgIcons from '@/utils/svgIcons'
import CustomDropdown from '@/utils/customDropdown'
import { IOverallStatisticsAPIJson } from '@/interface/api/overallStatistics'
import DisplayImage from '@/utils/displayImage'



interface ISelectTournamentAndSeassonProps {
	type: "team" | "players"
	selectTournament: IUniqueTournament | null
	setSelectTournament: (selectTournament: IUniqueTournament | null) => void
	selectSeason: ISeasons | null
	setSelectSeason: (selectSeason: ISeasons | null) => void
	team: ITeamAPIJson | null
	waitdata: string
	setWaitdata: (waitdata: string) => void
}

export const SelectTournamentAndSeasson = ({ type, team, waitdata, setWaitdata, selectTournament, setSelectTournament, selectSeason, setSelectSeason }: ISelectTournamentAndSeassonProps) => {

	const [seassonStatistics, setSeassonStatistics] = useState<ISeassonStatisticsAPIJson | null>(null)

	useEffect(() => {

		const getThestatisticsSeasons = async () => {
			try {
				if (team == null)
					return
				const response = await fetch(type == 'team' ? `https://sofascore.com/api/v1/team/${team.id}/team-statistics/seasons` : `https://sofascore.com/api/v1/team/${team.id}/player-statistics/seasons`, {})
				if (response.ok) {
					const data = await response.json()
					setSeassonStatistics(data)
					setWaitdata('done')
					setSelectTournament((data as ISeassonStatisticsAPIJson).uniqueTournamentSeasons[0].uniqueTournament)
					setSelectSeason((data as ISeassonStatisticsAPIJson).uniqueTournamentSeasons[0].seasons[0])

				}
			} catch (error) {
				if (setWaitdata)
					setWaitdata('error')
			}
		}
		getThestatisticsSeasons()
	}, [team, setSelectSeason, setSelectTournament, setWaitdata, type])

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

const TeamStatistics = ({ team }: { team: ITeamAPIJson | null }) => {
	const [selectTournament, setSelectTournament] = useState<IUniqueTournament | null>(null)
	const [selectSeason, setSelectSeason] = useState<ISeasons | null>(null)
	const [statistics, setStatistics] = useState<IOverallStatisticsAPIJson | null>(null)
	const [playerStatistics, setPlayerStatistics] = useState<{ [typeName: string]: { [statisName: string]: string | number } } | null>(null)
	const [waitdata, setWaitdata] = useState('wait')

	useEffect(() => {
		(
			async () => {
				try {
					if (!team || !selectSeason || !selectTournament)
						return
					const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team/${team.id}/unique-tournament/${selectTournament.id}/season/${selectSeason.id}/statistics/overall`, {})
					if (response.ok) {
						const data = await response.json()
						setStatistics(data)
						const playerStatistics: { [typeName: string]: { [statisName: string]: string | number } } =
						{
							"Summary": {
								"Matches": data.statistics?.matches ?? 0,
								"Goals scored": data.statistics?.goalsScored ?? 0,
								"Goals conceded": data.statistics?.goalsConceded ?? 0,
								"Assists": data.statistics?.assists ?? 0
							},
							"Attacking": {
								"Goals per game": ((data.statistics?.goalsScored ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Penalty goals": `${data.statistics?.penaltyGoals ?? 0}/${data.statistics?.penaltiesTaken ?? 0}`,
								"Free kick goals": `${data.statistics?.freeKickGoals ?? 0}/${data.statistics?.freeKickShots ?? 0}`,
								"Goals from inside the box": `${data.statistics?.goalsFromInsideTheBox ?? 0}/${data.statistics?.shotsFromInsideTheBox ?? 0}`,
								"Goals from outside the box": `${data.statistics?.goalsFromOutsideTheBox ?? 0}/${data.statistics?.shotsFromOutsideTheBox ?? 0}`,
								"Left foot goals": data.statistics?.leftFootGoals ?? 0,
								"Right foot goals": data.statistics?.rightFootGoals ?? 0,
								"Headed goals": data.statistics?.headedGoals ?? 0,
								"Big chances per game": ((data.statistics?.bigChances ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Big chances missed per game": ((data.statistics?.bigChancesMissed ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Total shots per game": ((data.statistics?.shots ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Shots on target per game": ((data.statistics?.shotsOnTarget ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Shots off target per game": ((data.statistics?.shotsOffTarget ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Blocked shots per game": ((data.statistics?.blockedScoringAttempt ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Succ. dribbles per game": ((data.statistics?.successfulDribbles ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Corners per game": ((data.statistics?.corners ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Hit woodwork": data.statistics?.hitWoodwork ?? 0,
								"Counter attacks": data.statistics?.fastBreaks ?? 0
							},
							"Passes": {
								"Ball possession": `${(data.statistics?.averageBallPossession ?? 0).toFixed(1)}%`,
								"Accurate per game": `${((data.statistics?.accuratePasses ?? 0) / (data.statistics?.matches ?? 1)).toFixed(0)} (${(data.statistics?.accuratePassesPercentage ?? 0).toFixed(1)}%)`,
								"Acc. own half": `${((data.statistics?.accurateOwnHalfPasses ?? 0) / (data.statistics?.matches ?? 1)).toFixed(0)} (${((data.statistics?.accurateOwnHalfPasses ?? 0) / (data.statistics?.totalOwnHalfPasses ?? 1) * 100).toFixed(1)}%)`,
								"Acc. opposition half": `${((data.statistics?.accurateOppositionHalfPasses ?? 0) / (data.statistics?.matches ?? 1)).toFixed(0)} (${((data.statistics?.accurateOppositionHalfPasses ?? 0) / (data.statistics?.totalOppositionHalfPasses ?? 1) * 100).toFixed(1)}%)`,
								"Acc. long balls": `${((data.statistics?.accurateLongBalls ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1)} (${(data.statistics?.accurateLongBallsPercentage ?? 0).toFixed(1)}%)`,
								"Acc. crosses": `${((data.statistics?.accurateCrosses ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1)} (${((data.statistics?.accurateCrosses ?? 0) / (data.statistics?.totalCrosses ?? 1) * 100).toFixed(1)}%)`
							},
							"Defending": {
								"Clean sheets": data.statistics?.cleanSheets ?? 0,
								"Goals conceded per game": ((data.statistics?.goalsConceded ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Tackles per game": ((data.statistics?.tackles ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Interceptions per game": ((data.statistics?.interceptions ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Clearances per game": ((data.statistics?.clearances ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Saves per game": ((data.statistics?.saves ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Errors leading to shot": data.statistics?.errorsLeadingToShot ?? 0,
								"Errors leading to goal": data.statistics?.errorsLeadingToGoal ?? 0,
								"Penalties committed": data.statistics?.penaltiesCommited ?? 0,
								"Penalty goals conceded": data.statistics?.penaltyGoalsConceded ?? 0,
								"Clearance off line": data.statistics?.clearancesOffLine ?? 0,
								"Last man tackle": data.statistics?.lastManTackles ?? 0
							},
							"Other": {
								"Duels won per game": `${((data.statistics?.duelsWon ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1)} (${(data.statistics?.duelsWonPercentage ?? 0).toFixed(1)}%)`,
								"Ground duels won": `${((data.statistics?.groundDuelsWon ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1)} (${(data.statistics?.groundDuelsWonPercentage ?? 0).toFixed(1)}%)`,
								"Aerial duels won": `${((data.statistics?.aerialDuelsWon ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1)} (${(data.statistics?.aerialDuelsWonPercentage ?? 0).toFixed(1)}%)`,
								"Possession lost per game": ((data.statistics?.possessionLost ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Offsides per game": ((data.statistics?.offsides ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Throw-ins per game": ((data.statistics?.throwIns ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Goal kicks per game": ((data.statistics?.goalKicks ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Fouls per game": ((data.statistics?.fouls ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Yellow cards per game": ((data.statistics?.yellowCards ?? 0) / (data.statistics?.matches ?? 1)).toFixed(1),
								"Red cards": data.statistics?.redCards ?? 0
							}
						};
						setPlayerStatistics(playerStatistics)
					}
				} catch (error) {

				}
			}
		)()
	}, [team, selectSeason, selectTournament])
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div className="MYDeg   w-full bg-[#ffffff] rounded-2xl  space-y-2  p-2 ">
			<SelectTournamentAndSeasson
				type='team'
				team={team}
				selectTournament={selectTournament}
				selectSeason={selectSeason}
				setSelectTournament={setSelectTournament}
				setSelectSeason={setSelectSeason}
				waitdata={waitdata}
				setWaitdata={setWaitdata}

			/>
			{

				playerStatistics &&
				<Accordion
					defaultSelectedKeys={windowWidth < 992 ? '' : 'all'}
					selectionMode="multiple"
					showDivider={false}
					// className=''
					// isCompact
					variant="splitted"

				>
					{Object.entries(playerStatistics).map(([typeName, index], _index) => (
						<AccordionItem
							key={_index}
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

export default TeamStatistics

