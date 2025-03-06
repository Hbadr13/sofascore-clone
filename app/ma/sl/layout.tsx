'use client'

import AllLeagues from "@/components/homePage/AllLeagues";
import CalendarComp from "@/components/homePage/CalendarComp";
import FeaturedMatch from "@/components/homePage/FeaturedMatch";
import Highlights from "@/components/homePage/Highlights";
import TopPlayers from "@/components/homePage/TopPlayers";
import Topleagues from "@/components/homePage/Topleagues";
import LiveSoccer from "@/components/homePage/liveSoccer";
import MatchOverview from "@/components/homePage/matchOverview";
import { useCurrentMatch } from "@/context/EventDateContext";
import { EventAPIJson } from "@/interface/api/event";
import DisplayImage from "@/utils/displayImage";
import { extractFormDate } from "@/utils/function";
import dayjs, { Dayjs } from "dayjs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [featuredEvent, setFeaturedEvent] = useState<EventAPIJson | null>(null)

    const pathname = usePathname()
    const pages = pathname.split('/').slice(1, pathname.split('/').length)
    let date
    if (pathname == '/ma/sl')
        date = extractFormDate(new Date())
    else
        date = extractFormDate(new Date(pages[2]))
    const handleHashChange = async () => {
        const fragment = window.location.hash.substring(1);
        const id = fragment.split(':')[1];
        if (id) {
        }
    };
    const { currentMatch, setCurrentMatch } = useCurrentMatch();
    useEffect(() => {
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [])
    const [matchesDate, setMatchesDate] = useState<Dayjs | null>(dayjs(date));


    return (
        <>
            <main className=" w-full  flex flex-col items-center justify-start bg-[#edf1f6] b-black px-3 mb-10">
                <div className="w-full desktop:w-[1344px] tablet:w-[992px] flex space-x-0 tablet:space-x-5 ">
                    <p className=" font-bold text-sm opacity-40 my-2">
                        Soccer live scores and today schedule
                    </p>
                </div>
                <div className="w-full max-w-[1344px] mx-auto flex items-start space-x-0 tablet:space-x-5 ">
                    <div className=" overflow-hidden w-[28%] max:w-[324px] hidden tablet:block  rounded-2xl  space-y-5">
                        <CalendarComp matchesDate={matchesDate} setMatchesDate={setMatchesDate} />
                        <Topleagues />
                        <AllLeagues />
                    </div>
                    <div className="MYDeg w-full tablet:w-[44%] max:w-[540px]   mb-10 tablet:mb-0 bg-[#ffffff]   rounded-2xl  px-1 ">
                        {children}
                    </div>
                    <div className=" relative w-[28%] max:w-[432px] hidden tablet:block  rounded-2xl  space-y-5">
                        {
                            currentMatch ?
                                <MatchOverview scrollType={'1'} />
                                :
                                <>
                                    {/* <Highlights /> */}
                                    <FeaturedMatch featuredEvent={featuredEvent} setFeaturedEvent={setFeaturedEvent} tournamentId={17} />
                                    <TopPlayers />
                                    <LiveSoccer />
                                </>
                        }
                    </div>
                </div>

            </main>
        </>
    );
}
