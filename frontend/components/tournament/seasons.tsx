import { StandingsAPIJson } from '@/interface/api/standings'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import Shi_standings from '../shimmer/shi_standings'
import { MatchDetailsAPIJson } from '@/interface/api/matchs'
import { EventAPIJson } from '@/interface/api/event'
import { seasonsAPIJson } from '@/interface/api/seasons'
import { useRouter } from 'next/navigation'
import CustomDropdown from '@/utils/customDropdown'


interface SeasonsProps {
    tournamentId: number
    seasonId: string | null
}



const Seasons = ({ tournamentId, seasonId }: SeasonsProps) => {
    const [featuredEvent, setFeaturedEvent] = useState<EventAPIJson>()
    const router = useRouter()
    const [selectedSeasons, setSelectedSeasons] = React.useState<string>("");
    const [waitdata, setWaitdata] = React.useState(true);
    const [seasonsData, setSeasonsData] = useState<seasonsAPIJson[]>([])
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
                if (featuredEvent == null)
                    return
                setWaitdata(true)

                let api = ''
                if (tournamentId && seasonId) {
                    api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${tournamentId}/seasons`
                }
                else {
                    api = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/seasons`
                }
                const response = await fetch(api, {})
                if (response.ok) {
                    let flag = false
                    const data = await response.json()
                    setSeasonsData(data.seasons)
                    const seas = data.seasons.find((item: seasonsAPIJson) => item.id == Number(seasonId))
                    if (seas)
                        setSelectedSeasons(seas.year);
                    else
                        setSelectedSeasons(data.seasons[0].year);
                    setWaitdata(false)
                }
            }
        )()
    }, [featuredEvent, seasonId, tournamentId])


    useEffect(() => {
        (
            async () => {
                if (!tournamentId)
                    return

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/unique-tournament/${tournamentId}/featured-events`, {});
                if (response.ok) {
                    const data = await response.json()
                    setFeaturedEvent(data.featuredEvents[0])
                    setWaitdata(false)
                }

            }
        )()
    }, [tournamentId])

    if (!featuredEvent && !waitdata)
        return <div className="bg-[#ffffff] MYDeg rounded-2xl h-40 transition flex items-center bg-gradient-to-r from-slate-500 to-slate-600"></div>
    return (
        <div className="flex  w-full   relative   rounded-sm tablet:rounded-2xl">
            <div className="  w-full  h-full overflow-hidden  absolute top-0 z-10   rounded-sm tablet:rounded-2xl">
                <div style={{ backgroundImage: `url(https://api.sofascore.app/api/v1/unique-tournament/${tournamentId}/image)` }} className="BoxSeasonBlur z-10 rounded-2xl"></div>
            </div>
            <div className=" z-20 relative w-full  space-x-4 rounded-2xl h-40 transition flex items-center px-3 md:px-5">
                <div className="w-24 h-24 md:h-32 md:w-32 border-2 border-white bg-white rounded-[7px]">
                    {featuredEvent && <Image
                        alt={`unique-tournament:${featuredEvent.tournament.uniqueTournament.id}`}
                        isZoomed
                        isBlurred
                        className='w-24 h-24 truncate md:h-32 md:w-32'
                        width={1000}
                        height={1000}
                        src={`https://api.sofascore.app/api/v1/unique-tournament/${featuredEvent.tournament.uniqueTournament.id}/image`}
                    />}
                </div>
                <div className="flex-1 flex h-full items-center    justify-between w-full">
                    <div className="  pr-5  w-full flex flex-col justify-center space-y-0 md:space-y-2 h-full">

                        {featuredEvent ? <div className="  text-xl md:text-2xl tablet:text-3xl font-extrabold text-white">{featuredEvent?.tournament.name.split(',')[0]}</div> :
                            <div className=" w-36 tablet:w-44 rounded-xl h-8 bg-on-surface-nLv4 animate-pulse"></div>

                        }
                        <div className="flex items-center  space-x-2 ">
                            <div className=" w-5 h-5 md:w-7 md:h-7">
                                {!featuredEvent ? <div className="h-full w-full bg-on-surface-nLv4 animate-pulse rounded-full"></div> : <Image alt='flags' width={1000} height={1000} src={`https://api.sofascore.app/static/images/flags/${featuredEvent.tournament.category.alpha2 ? featuredEvent.tournament.category.alpha2.toLocaleLowerCase() : featuredEvent.tournament.uniqueTournament.category.slug.toLocaleLowerCase()}.png`} />}
                            </div>
                            {
                                featuredEvent ?
                                    <div className=" text-lg md:text-xl font-semibold text-white">{featuredEvent?.tournament.category.name}</div> :
                                    <div className=" w-32 tablet:w-40 rounded-xl h-8 bg-on-surface-nLv4 animate-pulse"></div>
                            }
                            <div hidden={Array.from(selectedSeasons)[0] == ''} className=" ">

                                <CustomDropdown
                                    buttonStyle=' w-16 md:w-20'
                                    buttonContent={
                                        <div
                                            className='z-0 text-xs p-0.5 md:text-base border-0  text-white font-medium'
                                        >
                                            {selectedSeasons}
                                        </div>
                                    }
                                    CustomDropdownStyle={{
                                    }}
                                    CustomDropdownContent={
                                        seasonsData.map((item, index) => (
                                            <button
                                                onClick={() => router.push(`/ma/tournament/soccer/${featuredEvent?.tournament.category.slug}/${featuredEvent?.tournament.slug}/${featuredEvent?.tournament.uniqueTournament.id}?id=${item.id}`)}
                                                key={item.year}
                                                className={`capitalize   text-start pl-5  ${selectedSeasons == item.year ? 'text-blue-500' : ''}`}
                                            >
                                                {item.year}
                                            </button>
                                        ))
                                    }
                                />
                            </div>
                        </div>
                        <div className=" ">
                            <div className="w-full  h-1 md:h-2 bg-slate-600 rounded-xl">
                                <div className="w-[60%]  h-1 md:h-2 bg-white rounded-xl"></div>
                            </div>
                            <div className="w-full flex justify-between text-white text-[10px]">
                                <div className="">Aug 23</div>
                                <div className="">May 22</div>
                            </div>
                        </div>
                    </div>
                    {windowWidth > 992 ? < div className=" relative h-[70px]  w-[170px]   rounded-xl   flex justify-between items-center">
                        <div className="SmallboxSeasonBlur rounded-xl z-10"></div>
                        <div className="z-20  text-center w-full h-full flex flex-col items-center justify-center">
                            <button className='bg-white w-28  flex items-center justify-between rounded-lg p-2 '>
                                <div className="text-sm text-blue-500">FOLLOW</div>
                                <Image alt='notifications' width={20} height={20} src={`/image/notifications-none.svg`} />
                            </button>
                            <div className="text-white text-[13px] text-end">
                                1.7M followers
                            </div>
                        </div>
                    </div> :
                        <button className='bg-white w-8 h-8  flex items-center justify-between rounded-lg p-2 '>
                            <Image alt='notifications' width={20} height={20} src={`/image/notifications-none.svg`} />
                        </button>
                    }
                </div>
            </div>
        </div >
    )
}

export default Seasons
