import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import { Button } from '@nextui-org/react'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import Link from 'next/link'
import MatchOverview from '../homePage/matchOverview'
import { useCurrentMatch } from '@/context/EventDateContext'
import { CustomScroll } from 'react-custom-scroll'
import { IRoundProps, IRoundsAPIJson } from '@/interface/api/rounds'
import { TimestampConverter } from '@/utils/function'
import { IGroupsAPIjson } from '@/interface/api/groups'
import { setgroups } from 'process'
import DisplayImage from '@/utils/displayImage'
import CustomDropdown from '@/utils/customDropdown'
import SvgIcons from '@/utils/svgIcons'
import DisplayEventDate from '@/utils/displayEventDate'
import { useRouter } from 'next/navigation';

interface StandingsProps {
    featuredEvent: EventAPIJson | null
    seasonId: string | null
    pageName: string
}

export interface RoundsButton1Props { rounds: IRoundsAPIJson | undefined, setSelectRound: (selectRound: IRoundProps | undefined) => void, selectRound: IRoundProps | undefined }

const RoundsButton1 = ({ rounds, setSelectRound, selectRound }: RoundsButton1Props) => {
    if (!rounds || !selectRound)
        return <></>
    return <CustomDropdown
        buttonStyle=''
        buttonContent={
            <div className=" min-w-16 text-center  truncate font-semibold ">
                {selectRound.name && selectRound.prefix ? selectRound.prefix + ' ' + selectRound.name : selectRound.name ? selectRound.name : 'Round ' + selectRound.round}
            </div>
        }
        CustomDropdownStyle={{
            right: '-5px'
        }}
        CustomDropdownContent={
            rounds.rounds.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setSelectRound(item)} className={`  ${selectRound == item ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex items-center justify-between w-full px-1 py-1`}>
                    <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
                        {item.name && item.prefix ? item.prefix + ' ' + item.name : item.name ? item.name : 'Round ' + item.round}
                    </div>
                    {
                        selectRound == item &&
                        <div className="w-[20px] h-[20px] ">
                            <SvgIcons iconName='OKy' />
                        </div>
                    }
                </button>
            ))

        } />

}

export interface RoundsButton2Props { groups: IGroupsAPIjson[], setSelectGroup: (selectGroup: IGroupsAPIjson | undefined) => void, selectGroup: IGroupsAPIjson | undefined }

const RoundsButton2 = ({ groups, setSelectGroup, selectGroup }: RoundsButton2Props) => {
    if (!groups || !selectGroup)
        return <></>
    return <CustomDropdown
        buttonStyle=''
        buttonContent={
            <div className=" min-w-16 text-center  truncate font-semibold ">

                {selectGroup.groupName}
            </div>
        }
        CustomDropdownStyle={{
            right: '-5px'
        }}
        CustomDropdownContent={
            groups.map((group, index) => (
                <button
                    key={index}
                    onClick={() => setSelectGroup(group)}
                    className={`  ${selectGroup == group ? ' bg-score-rating-s00/20' : ''}  hover:bg-on-surface-nLv4 rounded-lg flex groups-center justify-between w-full px-1 py-1`}>
                    <div className=" whitespace-break-spaces text-sm w-full  text-start px-2">
                        {group.groupName}
                    </div>
                    {
                        selectGroup == group &&
                        <div className="w-[20px] h-[20px] ">
                            <SvgIcons iconName='OKy' />
                        </div>
                    }
                </button>
            ))

        } />
}


const Matches = ({ featuredEvent, seasonId, pageName }: StandingsProps) => {
    const [navigationOption, setNavigationOption] = useState<string>('');
    const [matches, setmatches] = useState<MatchDetailsAPIJson[]>([]);
    const [lastMatches, setLastmatches] = useState<MatchDetailsAPIJson[]>([]);
    const [rounds, setRounds] = useState<IRoundsAPIJson>()
    const [selectRound, setSelectRound] = useState<IRoundProps>()

    const [groups, setGroups] = useState<IGroupsAPIjson[]>([])
    const [selectGroup, setSelectGroup] = useState<IGroupsAPIjson>()

    const [groupingOption, setGroupingOption] = useState<string>('BY DATE');
    const [waitdata, setWaitdata] = React.useState(true);
    const { currentMatch, setCurrentMatch } = useCurrentMatch();
    const [page, setPage] = useState<number>(0)
    const [lastMatchesInfo, setLastMatchesInfo] = useState<{ index: number, lengh: number, hasNextPage: boolean, eventLength: number }>({ index: 0, lengh: 0, hasNextPage: true, eventLength: 0 })
    const router = useRouter()
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

    useEffect(() => {
        (
            async () => {

                if (featuredEvent == null || groupingOption == 'BY DATE')
                    return
                setWaitdata(true)
                let api = ''
                if (groupingOption == 'BY ROUND')
                    api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/rounds`
                else
                    api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/7/season/52162/groups`
                const response = await fetch(api, {})
                if (response.ok) {
                    const data = await response.json()
                    if (groupingOption == 'BY ROUND') {
                        data.rounds.map((item: IRoundProps, index: number) => {
                            item.id = index
                            if (item.round == data.currentRound.round &&
                                item.name == data.currentRound.name &&
                                item.slug == data.currentRound.slug &&
                                item.prefix == data.currentRound.prefix
                            ) data.currentRound.id = index
                        })
                        setRounds(data)
                        setSelectRound(data.currentRound)
                    }
                    else {
                        setGroups(data.groups)
                        setSelectGroup(data.groups[0])
                    }
                }

                try {
                } catch (error) {
                }
            }

        )()
    }, [featuredEvent, seasonId, groupingOption])
    useEffect(() => {
        (
            async () => {
                try {
                    if (featuredEvent == null)
                        return
                    setWaitdata(true)
                    let api = ''
                    if (groupingOption == 'BY ROUND') {
                        if (!selectRound)
                            return
                        const round = `${selectRound.round}` + `${selectRound.slug ? `/slug/${selectRound.slug}` : ''}` + `${selectRound.prefix ? `/prefix/${selectRound.prefix}` : ''}`
                        if (!round)
                            return
                        api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/events/round/${round}`
                    }
                    else if (groupingOption == 'BY GROUP') {
                        api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournament/${selectGroup?.tournamentId}/season/${featuredEvent.season.id}/events`
                    }
                    else {
                        api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/season/${featuredEvent.season.id}/events/last/${page}`
                    }
                    const response = await fetch(api, {})
                    if (response.ok) {
                        const data = await response.json()
                        if (groupingOption == 'BY ROUND') {
                            setmatches(data.events)
                            setCurrentMatch(data.events[0])
                            setWaitdata(false)
                        }
                        else if (groupingOption == 'BY GROUP') {
                            setmatches(data.events)
                        }
                        else {
                            const events: any[] = Array.from(data.events).reverse()
                            const prIndex = lastMatches.length
                            const _lstmatch = lastMatches.concat(events)
                            setmatches(Array.from(_lstmatch.slice(prIndex, prIndex + 10)).reverse())
                            setLastmatches(_lstmatch)
                            setLastMatchesInfo({ index: prIndex, lengh: _lstmatch.length, hasNextPage: true, eventLength: events.length })
                        }
                    }
                } catch (error) {
                    setLastMatchesInfo({ index: lastMatchesInfo.index, lengh: lastMatchesInfo.lengh, hasNextPage: false, eventLength: lastMatchesInfo.eventLength })
                }
            }
        )()
    }, [featuredEvent, selectRound, groupingOption, page, selectGroup])

    useEffect(() => {

        setLastmatches([])
        setPage(0)
        setLastMatchesInfo({ index: 0, lengh: 0, hasNextPage: true, eventLength: 0 })
        setNavigationOption('')
    }, [groupingOption])


    const handelClickPreviousRoundButton = () => {
        if (groupingOption == 'BY ROUND') {

            if (!selectRound || !rounds)
                return
            rounds.rounds.map((round) => {
                if (selectRound.id - 1 == round.id)
                    setSelectRound(round)
            })
            setNavigationOption('previousRound')
        }
        else if (groupingOption == 'BY DATE') {
            setNavigationOption('previous')
            if (lastMatchesInfo.index + 10 >= lastMatchesInfo.lengh)
                setPage(page + 1)
            else {
                setmatches(Array.from(lastMatches.slice(lastMatchesInfo.index + 10, lastMatchesInfo.index + 20)).reverse())
                setLastMatchesInfo({ index: lastMatchesInfo.index + 10, lengh: lastMatchesInfo.lengh, hasNextPage: lastMatchesInfo.hasNextPage, eventLength: lastMatchesInfo.eventLength })
            }
        } else {
            if (selectGroup)
                setSelectGroup(groups[groups.indexOf(selectGroup) - 1])
        }
    }

    const handelClickNextRoundButton = () => {
        if (groupingOption == 'BY ROUND') {
            if (!selectRound || !rounds)
                return
            rounds.rounds.map((round) => {
                if (selectRound.id + 1 == round.id)
                    setSelectRound(round)
            })
            setNavigationOption('nextRound')
        }
        else if (groupingOption == 'BY DATE') {
            setNavigationOption('next')
            setmatches(Array.from(lastMatches.slice(lastMatchesInfo.index - 10, lastMatchesInfo.index).reverse()))
            setLastMatchesInfo({ index: lastMatchesInfo.index - 10, lengh: lastMatchesInfo.lengh, hasNextPage: lastMatchesInfo.hasNextPage, eventLength: lastMatchesInfo.eventLength })
        }
        else {
            if (selectGroup)
                setSelectGroup(groups[groups.indexOf(selectGroup) + 1])
        }
    }

    const isDispay = (navigation: string): boolean => {
        if (groupingOption == 'BY ROUND') {

            if (!selectRound || !rounds)
                return false
            if (navigation == 'next') {
                return !(Number(selectRound.id) + 1 > rounds?.rounds[rounds.rounds.length - 1].id)
            }
            if (navigation == 'previous') {
                return !(Number(selectRound.id) - 1 < rounds?.rounds[0].id)
            }
            return false
        }
        else {
            if (!selectGroup || !groups)
                return false
            if (navigation == 'next') {
                return groups.indexOf(selectGroup) + 1 < groups.length
            }
            if (navigation == 'previous') {
                return groups.indexOf(selectGroup) > 0
            }
            return false
        }
    }


    return (
        <div className="bg-[#ffffff] bg-green- MYDeg rounded-2xl min-h-[740px] flex flex-col">
            <div className=" flex flex-col  h-[100px]  justify-between">
                <div className="w-full text-center text-lg font-semibold  pt-2">Matches {groupingOption}</div>
                <div className="flex px-5 text-sm  border-b-1 pb-2">
                    <div className=" flex items-center  space-x-4 font-semibold">
                        <button onClick={() => setGroupingOption('BY DATE')} className={`py-1.5 px-2 rounded-lg border-1 ${groupingOption == 'BY DATE' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>BY DATE</button>
                        <button onClick={() => setGroupingOption('BY ROUND')} className={`py-1.5 px-2 rounded-lg border-1 ${groupingOption == 'BY ROUND' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>BY ROUND</button>
                        {featuredEvent?.tournament.isGroup && <button onClick={() => setGroupingOption('BY GROUP')} className={`py-1.5 px-2 rounded-lg border-1 ${groupingOption == 'BY GROUP' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>BY GROUP</button>}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex  rounded-2xl   w-full ">
                <div className=" w-full tablet:w-1/2 h-full  tablet:border-r-1">
                    {
                        groupingOption == 'BY DATE' ?
                            <div className="flex justify-between border-b-1 py-2 px-4 text-sm">
                                <button onClick={lastMatchesInfo.hasNextPage ? handelClickPreviousRoundButton : undefined} className={`${lastMatchesInfo.hasNextPage ? '' : 'opacity-30 cursor-not-allowed'} rounded-md ${navigationOption == 'previous' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                    <div className="m-[3px]  space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                        <Image src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                        <div className="">
                                            Previous
                                        </div>
                                    </div>
                                </button>

                                <button onClick={lastMatchesInfo.index > 0 ? handelClickNextRoundButton : undefined} className={`${lastMatchesInfo.index > 0 ? '' : 'opacity-30 cursor-not-allowed'} rounded-md ${navigationOption == 'next' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                    <div className="m-[3px] space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                        <div className="">
                                            Next
                                        </div>
                                        <Image className=' rotate-180' src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                    </div>
                                </button>
                            </div>
                            : groupingOption == 'BY ROUND' ?
                                <div className="flex justify-between border-b-1 py-2 px-4 text-sm">
                                    {isDispay('previous') ? <button onClick={handelClickPreviousRoundButton} className={`w-12 rounded-md ${navigationOption == 'previousRound' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                        <div className="m-[3px]  space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                            <Image src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                        </div>
                                    </button> : <div className='w-12'></div>}
                                    <RoundsButton1 rounds={rounds} setSelectRound={setSelectRound} selectRound={selectRound} />

                                    {isDispay('next') ? <button onClick={handelClickNextRoundButton} className={` w-12  rounded-md ${navigationOption == 'nextRound' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                        <div className="m-[3px] space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                            <Image className=' rotate-180' src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                        </div>
                                    </button> : <div className='w-12'></div>}
                                </div>
                                :
                                <div className="flex justify-between border-b-1 py-2 px-4 text-sm">
                                    {isDispay('previous') ? <button onClick={handelClickPreviousRoundButton} className={`w-12 rounded-md ${navigationOption == 'previousRound' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                        <div className="m-[3px]  space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                            <Image src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                        </div>
                                    </button> : <div className='w-12'></div>}
                                    <RoundsButton2 groups={groups} selectGroup={selectGroup} setSelectGroup={setSelectGroup} />

                                    {isDispay('next') ? <button onClick={handelClickNextRoundButton} className={` w-12  rounded-md ${navigationOption == 'nextRound' ? 'bg-blue-500/25 text-blue-700' : ' text-gray-700 bg-slate-100'}`}>
                                        <div className="m-[3px] space-x-1 border-blue-600 border-1 py-1 px-2 rounded-md  flex items-center justify-between">
                                            <Image className=' rotate-180' src={'/image/blue-arraw.svg'} height={20} width={20} alt='arraw' />
                                        </div>
                                    </button> : <div className='w-12'></div>}
                                </div>
                    }
                    <div className="">
                        {
                            matches.map((item, _index) => (
                                <div key={_index} className={`   w-full space-y- text-[14px]`}>
                                    {
                                        _index == 0 && groupingOption != 'BY GROUP' &&
                                        <div className="w-full flex">
                                            <div className="w-[20%] flex justify-center items-center ">
                                                <DisplayImage onErrorImage='tournament' alt='' width={25} height={25} src={`https://sofascore.com/api/v1/unique-tournament/${item.tournament.uniqueTournament.id}/image`} />
                                            </div>
                                            <div className=" relative w-full flex justify-between pr-[60px] items-center">
                                                <div className="">
                                                    <p>
                                                        <Link href={`/ma/tournament/soccer/${item.tournament.category.name}/${item.tournament.uniqueTournament.slug}/${item.tournament.uniqueTournament.id}`} className=" text-gray-400  hover:text-blue-600 text-[12px]"> {item.tournament.name}</Link>
                                                    </p>
                                                    <p>
                                                        <Link href={'/'} className=" text-gray-600  font-semibold hover:text-blue-600 text-[13px]"> {item.tournament.category.name}</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        groupingOption == 'BY GROUP' && matches[_index].roundInfo.round != matches[_index - 1]?.roundInfo.round && <div className="w-full ">
                                            <div className="text-[14px]   border-[#b8b9bda7] opacity-50 p-2">
                                                Round: {item.roundInfo.round}
                                            </div>
                                        </div>
                                    }
                                    <button
                                        onClick={() => { windowWidth < 992 ? router.push(`/ma/${item.slug}/${item.customId}#id:${item.id}`) : setCurrentMatch(item) }}
                                        className={` active:opacity-65 w-full flex items-center space-x-3  py-1 hover:bg-custom-default-hover ${currentMatch?.id == item.id ? 'bg-custom-default-hover' : ''}`}>

                                        <div className="w-[20%] text-[12px]  flex flex-col justify-center items-center border-r-[1px] border-[#b8b9bda7] opacity-50 ">
                                            <DisplayEventDate event={item} />
                                            {/* {TimestampConverter(item.startTimestamp).getHours()}:{TimestampConverter(item.startTimestamp).getMinutes()}
                                            {_index % 10 == 0 && <p className={`${(item.status.description == 'Postponed' || item.status.description == 'Canceled') ? 'text-red-700  font-bold ' : ''}`}>{item.status.description == 'Ended' ? 'FT' : item.status.description == 'Not started' ? '-' : item.status.description}</p>} */}
                                        </div>
                                        <div className=" relative w-full   flex  justify-between  items-center border--[1px]  pr-[60px] border-[#b8b9bda7]  text-[14px]">
                                            <div className="">
                                                <div className="flex space-x-1 items-center ">
                                                    <div className="w-5 h-5">
                                                        <DisplayImage onErrorImage='team' alt='' width={400} height={400} src={`https://sofascore.com/api/v1/team/${item.homeTeam.id}/image`} />
                                                    </div>
                                                    <div className="opacity-80">
                                                        {item.homeTeam.shortName}
                                                    </div>
                                                </div>
                                                <div className="flex space-x-1 items-center">
                                                    <div className="w-5 h-5">
                                                        <DisplayImage onErrorImage='team' alt='' width={400} height={400} src={`https://sofascore.com/api/v1/team/${item.awayTeam.id}/image`} />
                                                    </div>
                                                    <div className=" opacity-80">
                                                        {item.awayTeam.shortName}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex space-x-5">

                                                <div className="">
                                                    <div className="">{item.homeScore.display}</div>
                                                    <div className="">{item.awayScore.display}</div>
                                                </div>
                                            </div>
                                            <button className=" absolute w-[50px] right-0 top-0 pl-1 flex  justify-center items-center  h-full  border-l-[1px] border-[#b8b9bda7] ">
                                                <Image alt='' width={30} height={30} className="p-0.5 hover:bg-blue-100  rounded-md" src='/image/notifications-none.svg' />
                                            </button>
                                        </div>
                                    </button>
                                    <div>

                                    </div>

                                </div >
                            ))
                        }

                    </div>
                </div>
                {windowWidth >= 992 && <div className=" w-0 hidden tablet:block tablet:w-1/2  ">
                    <CustomScroll className='w-full' allowOuterScroll={true} heightRelativeToParent="100%" >
                        {currentMatch &&
                            <MatchOverview scrollType={'2'} />
                        }
                    </CustomScroll>
                </div>}
            </div >
        </div >
    )
}

export default Matches