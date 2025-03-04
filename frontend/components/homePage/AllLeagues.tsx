import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem } from "@nextui-org/react";
import DisplayImage from '@/utils/displayImage';
import Link from 'next/link';


export interface AllLeaguesAPIJson {
    name: string
    slug: string
    sport: {
        name: string
        slug: string
        id: Number
    },
    priority: number
    id: number
    flag: string
    alpha2: string | undefined
    LeaguesByCountry: LeaguesByCountryAPIJson[] | undefined
}

export interface LeaguesByCountryAPIJson {
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
            id: string
        },
        id: number
        flag: string
        alpha2: string
    },
    userCount: number
    id: number
    displayInverseHomeAwayTeams: boolean
}

const AllLeagues = () => {

    const [waitdata, setWaitdata] = useState(true)
    const [leagues, setLeagues] = useState<Array<AllLeaguesAPIJson>>([])
    const [leaguesFilter, setLeaguesFilter] = useState<Array<AllLeaguesAPIJson>>([])
    const [selectItem, setselectItem] = useState(0)
    const [query, setQuery] = useState<string>('')
    useEffect(() => {
        (
            async () => {
                try {
                    setWaitdata(true)
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sport/football/categories`, {})
                    if (response.ok) {
                        const data: any = await response.json()
                        setLeagues(data.categories)
                        setWaitdata(false)

                    }
                } catch (error) {

                }
            }
        )()
    }, [])
    useEffect(() => {
        const data = leagues.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && item.name != 'Israel')
        setLeaguesFilter(data)

    }, [query, leagues])
    const handelClickAccordionItem = async (countryId: number) => {
        const response = await fetch(`https://api.sofascore.com/api/v1/category/${countryId}/unique-tournaments`, {});
        if (response.ok) {
            const data = await response.json()
            const uniqueTournaments = data.groups[0].uniqueTournaments
            const nowLeagues = leagues.map((item) => {
                if (item.id == countryId)
                    item.LeaguesByCountry = uniqueTournaments
                return item
            })
            setLeagues(nowLeagues)
        }
    }
    if (waitdata)
        return <div className='w-full h-[500px] bg-white rounded-xl'></div>
    return (
        <div className="MYDeg   space-y-2  rounded-2xl bg-white min-h-36">
            <div className=" font-medium text-black px-4 pt-4">All leagues</div>
            <div className=" relative  p-2">
                <input
                    value={query}
                    placeholder="Filter"
                    onChange={(e) => setQuery(e.target.value)}
                    className=" border-2 outline-none relative font-thin text-gray-600 pl-12 py-1  w-full rounded-xl"
                    type="text" />
                <Image width={400} height={400} alt='' className=" absolute top-3 left-5 h-6 w-6 " src='/image/search.png' />
                <button onClick={() => setQuery('')} className="text-white  top-0  absolute right-3  h-full">
                    <Image className='w-6 h-6' src={'/image/clean.png'} width={300} height={300} alt="clean"></Image>
                </button>
            </div>
            <Accordion selectionMode="multiple"
                showDivider={false}
                className=''
                isCompact
                variant="light"
            >
                {leaguesFilter.map((item, index) => (
                    <AccordionItem
                        onPress={() => handelClickAccordionItem(item.id)}
                        className='hover:bg-slate-100'
                        key={index}
                        indicator={({ isOpen }) => (isOpen ? <Image width={20} height={20} className=" -rotate-180 opacity-4" src="/image/arraw.svg" alt="" />
                            : <Image width={20} height={20} className="-rotate-90 opacity-45" src="/image/arraw.svg" alt="" />
                        )}
                        subtitle={
                            <div key={index} className="relative w-full flex  items-center  justify-between px-5  space-x-5 " >
                                <div className="flex  items-center space-x-4  w-full">
                                    {
                                        item.alpha2 ?
                                            <DisplayImage onErrorImage='team' className='w-6 h-6' alt='' width={500} height={500} src={`https://cdn.alkora.app/static/images/flags/${item.alpha2.toLowerCase()}.png`} />
                                            : <DisplayImage onErrorImage='team' className='w-6 h-6' alt='' width={500} height={500} src={`https://cdn.alkora.app/static/images/flags/${item.flag}.png`} />
                                    }
                                    <div className="">
                                        {item.name}
                                    </div>
                                </div>
                                <div className=" text-[11px]">
                                    <div className=" opacity-70">
                                        {item.priority != 0 ? item.priority : ''}
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className="w-full space-y-1 flex flex-col ">
                            {
                                item.LeaguesByCountry?.map((league, index) =>
                                    <Link
                                        href={`/ma/tournament/soccer/${league.category.name}/${league.slug}/${league.id}`}
                                        key={index}
                                        className='hover:bg-slate-200 w-full pl-10 p-1 flex items-center space-x-2'>
                                        <Image alt={`unique-tournament/${league.id}`} width={300} height={300} className='w-5 h-5' src={`https://www.sofascore.com/api/v1/unique-tournament/${league.id}/image`} />
                                        <div className="">
                                            {league.name}
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default AllLeagues


