import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import DisplayImage from '@/utils/displayImage'


export interface TopleaguesApi {
    uniqueTournaments: Array<TopleaguesAPIJson>
}

export interface TopleaguesAPIJson {
    name: string
    slug: string
    primaryColorHex: string
    secondaryColorHex: string
    category: {
        name: string
        slug: string
        sport: {
            name: string
            slug: string
            id: Number
        },
        id: Number
        flag: string
    },
    userCount: Number
    id: Number
    displayInverseHomeAwayTeams: boolean
}


const Topleagues = () => {
    const [leagues, setLeagues] = useState<Array<TopleaguesAPIJson>>([])
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/config/top-unique-tournaments/MA/football`, {})
                    if (response.ok) {
                        const data: TopleaguesApi = await response.json()
                        setLeagues(data.uniqueTournaments)
                    }
                } catch (error) {

                }
            }
        )()
    }, [])
    return (
        < div className="MYDeg   space-y-1 pb-4  rounded-2xl bg-white" >
            <div className=" p-4 font-medium text-black">Top leagues</div>
            {leagues.map((item, index) =>
                <Link key={index} href={`/ma/tournament/soccer/${item.category.slug}/${item.slug}/${item.id}`} className="w-full flex   items-center  px-5 py-0.5 space-x-5 hover:bg-slate-100"                >
                    <DisplayImage onErrorImage='tournament' alt='' width={25} height={25} src={`https://sofascore.com/api/v1/unique-tournament/${item.id}/image`} />
                    <div className="text-[16px] font-thin opacity-90">
                        {item.name}
                    </div>
                </Link>
            )}
        </div >
    )
}
export default Topleagues

