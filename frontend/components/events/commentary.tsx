import { EventAPIJson } from '@/interface/api/event'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import { IMatchStatisticsAPIJson } from '@/interface/api/matchStatistics'
import { Button, CircularProgress, Progress } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { addSpaceBeforeUppercase } from '@/utils/function'
import ShiComments from '../shimmer/shiComments'
import DisplayImage from '@/utils/displayImage'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { TakeOverview } from '../matchInfo/incidents'
import { IPlayer } from '@/interface/api/lineups'
import { usePlayersStatisticCards } from '@/context/playersStatisticCardsContext'

interface ICommentaryProps {
    event: EventAPIJson | MatchDetailsAPIJson | null
    hideTitle: boolean,
    incidents: IIncidentsAPIJson[]
}
const Commentary = ({ event, hideTitle, incidents }: { event: EventAPIJson | MatchDetailsAPIJson | null, hideTitle: boolean, incidents: IIncidentsAPIJson[] }) => {
    const { setPlayersOverview } = usePlayersStatisticCards()
    const [player1, setPlayer1] = useState<IPlayer | null>(null);
    const [player2, setPlayer2] = useState<IPlayer | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);

    const [keyEvent, setkeyEvent] = useState('ALL')
    const [comments, setcomments] = useState<IIncidentsAPIJson[]>([])
    const [ShowMore, setShowMore] = useState(false)
    const [waitdata, setWaitdata] = useState('wait')
    const [indexOfTheFirst10KeyEvents, setIndexOfTheFirst10KeyEvents] = useState<number>(0)
    useEffect(() => {
        const getTheBestPlayersSummary = async () => {
            try {
                if (!event)
                    return
                const response = await fetch(`https://sofascore.com/api/v1/event/${event.id}/comments`, {})
                if (response.ok) {
                    const data = await response.json()
                    setcomments(data.comments)
                    let number = 0
                    const index = (data.comments as Array<IIncidentsAPIJson>).map((comment, index) => {
                        if (comment.type == 'yellowCard'
                            || comment.type == 'matchEnded'
                            || comment.type == 'redCard'
                            || comment.type == 'substitution'
                            || comment.type == 'scoreChange'
                            || comment.type == 'yellowRedCard'
                            || comment.type == 'videoAssistantReferee'
                        )
                            number++
                        if (number == 10)
                            setIndexOfTheFirst10KeyEvents(index)
                    })
                    setWaitdata('done')
                }
            } catch (error) {
                setWaitdata('error')
            }
        }
        getTheBestPlayersSummary()
    }, [event])
    const handleDisplayPlayerStatis = ({ e, player }: { e: any, player: IPlayer }) => {
        if (!event)
            return
        e.preventDefault();

        let subTime = incidents.find((itm) => itm?.playerOut?.id == player.id)?.time
        if (!subTime)
            subTime = incidents.find((itm) => itm?.playerIn?.id == player.id)?.time
        let playerSub = incidents.find((itm) => itm?.playerOut?.id == player.id)?.playerIn
        if (!playerSub)
            playerSub = incidents.find((itm) => itm?.playerIn?.id == player.id)?.playerOut
        setPlayersOverview((prev: any[]) => {
            if (prev.find((item) => item.player.id == player.id && item.event.id == event.id))
                return [...prev]
            return [...prev, { player, event, playerSub, subTime, subType: 'Substituted on by:' }]
        });

    };

    if (waitdata == 'wait')
        return <ShiComments />
    if (waitdata == 'error')
        return
    return (
        <div className=' MYDeg text-black  w-full  bg-white rounded-2xl'>
            <div hidden={hideTitle} className="p-3 text-xl font-medium">
                comments
            </div>
            <div className="space-x-4 p-2 ">
                <Button size='sm' onClick={() => setkeyEvent('ALL')} className={` font-semibold py-1 px-2 rounded-lg border-1 border-slate-300 ${keyEvent == 'ALL' ? 'bg-blue-500/35 text-blue-800' : ' text-gray-700 bg-slate-100'}`}>ALL</Button>
                <Button size='sm' onClick={() => setkeyEvent('KEY EVENTS')} className={`font-semibold py-1 px-2 rounded-lg border-1 border-slate-300 ${keyEvent == 'KEY EVENTS' ? 'bg-blue-500/35 text-blue-800' : ' text-gray-700 bg-slate-100'}`}>KEY EVENTS</Button>
            </div>
            <div className="w-full h-[1px] bg-slate-200 mt-2"></div>
            <div className="p-5 space-y-2 ">
                {
                    comments.slice(0, ShowMore ? comments.length : keyEvent == 'KEY EVENTS' ? indexOfTheFirst10KeyEvents : 10).map((comment, index) =>
                        (comment.type == 'yellowCard'
                            || comment.type == 'matchEnded'
                            || comment.type == 'redCard'
                            || comment.type == 'substitution'
                            || comment.type == 'scoreChange'
                            || comment.type == 'yellowRedCard'
                            || comment.type == 'videoAssistantReferee'
                            || keyEvent == 'ALL'
                        ) &&
                        <div
                            key={index}
                            className=' flex text-[12px]   justify-start'
                        >
                            <div className="w-12 flex flex-col justify-center items-center  rounded-md space-y-1">
                                {
                                    comment.type == 'yellowCard' ?
                                        <div
                                            className='w-4 h-5 bg-yellow-400 rounded-[2px]'
                                        /> :
                                        comment.type == 'redCard' ?
                                            <div
                                                className='w-4 h-5 bg-red-400 rounded-[2px]'
                                            /> :
                                            comment.type == 'yellowRedCard' ?
                                                <div
                                                    className='w-4 h-5 bg-yellow-400 rounded-[2px]  relative'
                                                >
                                                    <div className="w-4 h-5 bg-red-500 absolute  bottom-1  left-1  border-l-3 border-b-3 border-white"></div>
                                                </div>
                                                : comment.type == 'substitution' || comment.type == 'scoreChange' || comment.type == 'videoAssistantReferee' ? <div className="w-5 h-4">
                                                    <Image src={`/image/${comment.type == 'substitution' ? 'repost.png' : comment.type == 'scoreChange' ? 'ball.svg' : 'var-replay.png'}`} alt='repost' width={400} height={400} />
                                                </div> : comment.type == 'matchEnded' ?
                                                    <svg width="20" height="20" viewBox="0 0 16 16">
                                                        <g fillRule="evenodd">
                                                            <path fill="none" d="M0 0h16v16H0z"></path>
                                                            <path d="M7.925 2.743c3.219 0 5.816 2.647 5.835 5.905 0 3.257-2.616 5.904-5.835 5.904-3.22 0-5.836-2.647-5.836-5.904 0-3.258 2.617-5.905 5.836-5.905zm3.5 3.657H8v.857h1.186v3.657h1.016V7.257h1.224V6.4zm-3.84 0H4.857v4.495h1.017v-1.81h1.6v-.818h-1.6V7.238h1.713V6.4zm-2.86-4.952.339.952A6.749 6.749 0 0 0 1.58 6.171L.64 5.83a7.868 7.868 0 0 1 4.085-4.381zm6.4 0a7.905 7.905 0 0 1 4.047 4.266l-.941.343A6.787 6.787 0 0 0 10.786 2.4l.339-.952z" fill="#A4A9B3"></path>
                                                        </g>
                                                    </svg> :
                                                    null
                                }
                                <div className="">
                                    {comment.type == 'matchEnded' || comment.time == 0 ? '-' : `${comment.time}'`}
                                </div>
                            </div>
                            <div className="bg-gray-200/50  rounded-[7px] p-1 w-full flex justify-between space-x-3">
                                <div className="w-full flex flex-col  justify-center">
                                    {
                                        (
                                            comment.type == 'yellowCard'
                                            || comment.type == 'redCard'
                                            || comment.type == 'substitution'
                                            || comment.type == 'scoreChange'
                                            || comment.type == 'videoAssistantReferee'
                                        )
                                        && <div className="p-2 text-lg font-semibold opacity-85  capitalize">
                                            {
                                                comment.type == 'scoreChange' ? 'GOAL !' : comment.type == 'videoAssistantReferee' ? 'VAR decision' : addSpaceBeforeUppercase(comment.type).toLowerCase()
                                            }
                                        </div>
                                    }
                                    {

                                        comment.type == 'substitution' ?
                                            <button
                                                onClick={() => { setPlayer1(comment.playerOut), setPlayer2(comment.playerIn), openModal() }}
                                                className="p-2">
                                                <div className="w-full flex items-center space-x-2">
                                                    <div className="w-7 h-7 relative">
                                                        <DisplayImage onErrorImage='player'
                                                            className='rounded-full'
                                                            alt={'player' + String(comment.playerIn.id)}
                                                            width={500}
                                                            height={500}
                                                            src={`https://api.sofascore.app/api/v1/player/${comment.playerIn.id}/image`}
                                                        />
                                                    </div>
                                                    <div className="">{comment.playerIn.name}</div>
                                                    <div className="text-green-400">(In)</div>
                                                </div>
                                                <div className="w-full flex items-center space-x-2">
                                                    <div className="w-7 h-7 relative">
                                                        <DisplayImage onErrorImage='player'
                                                            className='rounded-full'
                                                            alt={'player' + String(comment.playerIn.id)}
                                                            width={500}
                                                            height={500}
                                                            src={`https://api.sofascore.app/api/v1/player/${comment.playerOut.id}/image`}
                                                        />
                                                    </div>
                                                    <div className="">{comment.playerIn.name}</div>
                                                    <div className="text-red-400">(Out)</div>
                                                </div>
                                            </button>
                                            : comment.player ? <button
                                                onClick={(e) => handleDisplayPlayerStatis({ e: e, player: (comment.player as IPlayer) })}
                                                className="w-full p-1">
                                                {comment.text}
                                            </button> :
                                                <div
                                                    className="w-full p-1">
                                                    {comment.text}
                                                </div>
                                    }
                                </div>
                                {
                                    comment.player && comment.type != 'substitution' &&
                                    <div className="w-10 h-10 relative">
                                        <DisplayImage onErrorImage='player'
                                            className='rounded-full border-2'
                                            alt={'player' + String(comment.player.id)}
                                            width={500}
                                            height={500}
                                            src={`https://api.sofascore.app/api/v1/player/${comment.player.id}/image`}
                                        />
                                        <div className="w-3.5 h-3.5 absolute  bottom-1.5  left-0">
                                            <DisplayImage onErrorImage='team'
                                                className='rounded-full'
                                                alt={'player' + String(comment.isHome ? event?.homeTeam.id : event?.awayTeam.id)}
                                                width={500}
                                                height={500}
                                                src={`https://api.sofascore.app/api/v1/team/${comment.isHome ? event?.homeTeam.id : event?.awayTeam.id}/image`}
                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    comment.type == 'substitution' &&
                                    <div className="w-8 h-8 relative">
                                        <DisplayImage onErrorImage='team'
                                            className='rounded-full'
                                            alt={'player' + String(comment.isHome ? event?.homeTeam.id : event?.awayTeam.id)}
                                            width={500}
                                            height={500}
                                            src={`https://api.sofascore.app/api/v1/team/${comment.isHome ? event?.homeTeam.id : event?.awayTeam.id}/image`}
                                        />
                                    </div>

                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={`${waitdata == 'wait' ? 'hidden' : 'block'} w-full p-3 flex space-x-2  justify-end items-center`}>
                <button onClick={() => setShowMore((prv) => !prv)} className=" flex space-x-2 items-center">
                    <div className=" font-medium text-blue-600 ">
                        {ShowMore ? 'Show less' : 'Show more'}
                    </div>
                    <Image className={` w-4 ${ShowMore ? 'rotate-90 ' : '-rotate-90'}`} src="/image/blue-arraw.svg" alt="blue-arraw" />
                </button>
            </div>
            {
                player1 && player2 && <TakeOverview incidents={incidents} event={event} player1={player1} player2={player2} isOpen={isOpen} setIsOpen={setIsOpen} />
            }
        </div >
    )
}

export default Commentary