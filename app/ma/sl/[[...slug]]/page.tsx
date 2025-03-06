'use client'

import AllLeagues from "@/components/homePage/AllLeagues";
import CalendarCompPhone from "@/components/homePage/CalendarCompPhone";
import MainComp from "@/components/homePage/MainComp";
import { extractFormDate } from "@/utils/function";
import dayjs, { Dayjs } from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import Topleagues from "@/components/homePage/Topleagues";


const getHash = () =>
    typeof window !== 'undefined' ? window.location.hash : ''

const useHash = () => {
    const [isClient, setIsClient] = useState(false)
    const [hash, setHash] = useState<string>(getHash())
    const params = useParams()

    useEffect(() => {
        setIsClient(true)
        setHash(getHash())
    }, [params])

    return isClient ? hash : ''
}

const HashDisplay = () => {
    const hash = useHash()
    const pathname = usePathname()

    const pages = pathname.split('/').slice(1, pathname.split('/').length)
    let date
    if (pathname == '/ma/sl')
        date = extractFormDate(new Date())
    else
        date = extractFormDate(new Date(pages[2]))
    const [matchesDate, setMatchesDate] = useState<Dayjs | null>(dayjs(date));
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
        windowWidth < 992 ?
            <>
                {hash === "#calendar" && <CalendarCompPhone />}
                {hash === "#leagues" && <div className=" space-y-3">
                    <Topleagues />
                    <AllLeagues />
                </div>
                }
                {!hash && <MainComp matchesDate={matchesDate} />}
            </>
            :
            <MainComp matchesDate={matchesDate} />
    )
}

export default HashDisplay