import React, { useEffect, useRef, useState } from 'react'
import { Switch } from '@nextui-org/react'
import { Dayjs } from 'dayjs'
import AllMatch from './allMatch'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { useCurrentMatch } from '@/context/EventDateContext'
import { extractFormDate } from '@/utils/function'
import moment from 'moment'

const MainComp = ({ matchesDate }: { matchesDate: Dayjs | null }) => {
    const [allOrLive, setAllOrLive] = useState('all')
    const [waitdata, setWaitdata] = useState(false)
    const [matchs, setMatchs] = useState<Array<MatchDetailsAPIJson>>([])
    const elementRef = useRef<any>(null);
    const { currentMatch, setCurrentMatch } = useCurrentMatch();

    useEffect(() => {
        (
            async () => {
                try {
                    if (matchesDate == null)
                        return
                    setMatchs([])
                    setWaitdata(false)
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sport/football/scheduled-events/${extractFormDate(matchesDate.toDate())}`, {});
                    if (response.ok) {
                        const data = await response.json()
                        const events: MatchDetailsAPIJson[] = (data.events as MatchDetailsAPIJson[]).filter(item => moment((item.startTimestamp + (moment().utcOffset() * 60)) * 1000).isSame(matchesDate.toString(), 'day'))
                        setMatchs(events)
                        setWaitdata(true)
                    }
                } catch (error) {

                }
            }
        )()
    }, [matchesDate])

    return (
        <div >
            <div className="flex justify-between items-center  px-4 pt-4">
                <div className="border-[2px] h-10 flex rounded-3xl font-semibold text-lg bg-[#edf1f6]">
                    <button onClick={() => setAllOrLive('all')} className={`text-green-500  text-sm border-green-500 rounded-xl py-0.5 px-4 -m-[2px] ${allOrLive == 'all' ? 'border-[1px] bg-white' : ''}`}>
                        ALL
                    </button>
                </div>

            </div>
            <div ref={elementRef}>

                {
                    allOrLive == 'all' ?
                        <AllMatch matchs={matchs} setMatchs={setMatchs} currentMatch={currentMatch} setCurrentMatch={setCurrentMatch} matchesDate={matchesDate} waitdata={waitdata} />
                        :
                        <div className="w-full  bg-white ">
                            <div className="p-4 font-bold opacity-65">
                                Pinned Leagues
                            </div>
                        </div >

                }
            </div>
        </div>
    )
}

export default MainComp


