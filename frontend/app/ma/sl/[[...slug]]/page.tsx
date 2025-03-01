'use client'

import MainComp from "@/components/homePage/MainComp";
import { extractFormDate } from "@/utils/function";
import dayjs, { Dayjs } from "dayjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const pathname = usePathname()
    const pages = pathname.split('/').slice(1, pathname.split('/').length)
    let date
    if (pathname == '/ma/sl')
        date = extractFormDate(new Date())
    else
        date = extractFormDate(new Date(pages[2]))
    const [matchesDate, setMatchesDate] = useState<Dayjs | null>(dayjs(date));

    return <MainComp matchesDate={matchesDate} />
}
