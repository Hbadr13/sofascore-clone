import React, { useEffect, useRef, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { CustomScroll } from 'react-custom-scroll';
import DisplayImage from '@/utils/displayImage';

const searchOptions = [
    { name: 'All', slug: 'all' },
    { name: 'Team', slug: 'teams' },
    { name: 'Player', slug: 'player-team-persons' },
    { name: 'Match', slug: 'events' },
    { name: 'Tournament', slug: 'unique-tournaments' }]

interface INavbarProps {
    currentSearchOption: { name: string, slug: string }
    setSuggestions: (suggestions: any[]) => void,
    setCurrentSearchOption: (currentSearchOption: { name: string, slug: string }) => void,
    suggestions: any[]
    waitData: string
    query: string
    setQuery: (query: string) => void
}
const Navbar = ({ waitData, query, setQuery, suggestions, setSuggestions, currentSearchOption, setCurrentSearchOption }: INavbarProps) => {
    const refCardSearch = useRef<any>();
    const refInput = useRef<any>();
    const [clickInInput, setclickInInput] = useState(false)
    const router = useRouter()

    const handelOnKeyDown = (e: any) => {
        if (e.key == 'Enter') {
            const search = query.trim().replace(/\s+/g, ' ')
            if (query.replace(/\s+/g, '')) {
                router.push(`/search?query=${search}`)
            }
        }
    }



    useEffect(() => {
        document.addEventListener('click', (event: any) => {
            if (refCardSearch.current && !refCardSearch.current.contains(event.target) && !refInput.current.contains(event.target)) {
                setclickInInput(false)
            }
        })
        document.addEventListener('click', (event: any) => {
            const clickedElement = event.target;
            if (clickedElement.classList.contains('hidediv')) {
                setclickInInput(false)
            }
        });
    }, []);

    return (
        <>
            <div
                className="  text-on-surface-nLv1 w-[360px] h-10 relative text-md font-extralight bg-white outline-none   rounded-xl"
            >
                <div className=" absolute left-4 h-full flex items-center">
                    <Image alt='' width={28} height={28} className=" " src='/image/search.png' />
                </div>
                <input
                    onClick={() => setclickInInput(true)}
                    value={query}
                    ref={refInput}
                    onChange={(e) => { setQuery(e.target.value) }}
                    autoComplete='off'
                    onKeyDown={handelOnKeyDown}
                    className="Search w-[360px] pl-14 h-10  bg-slate-40  right-0 border-0  sm:border  
                            outline-none block   text-sm  text-gray-900   rounded-xl    duration-300" placeholder="Search" required />
                <button onClick={() => setQuery('')} className="text-white  top-0  absolute right-3  h-full">
                    <Image src={'/image/clean.png'} width={30} height={30} alt="clean"></Image>
                </button>
                {
                    clickInInput &&
                    <div
                        className=" animate-appearance-in  min-h-[400px] max-h-[700px] h-[700px]  overflow-hidden bg-white    absolute  top-12 bg-CusColor_grey   w-[360px]   rounded-xl shadow-xl"
                        ref={refCardSearch}
                    >
                        <div className="flex justify-center py-2 text-[12px]  border-gray-200 border-b-[1px] space-x-1" >
                            {
                                searchOptions.map((item, index) =>
                                    <button
                                        key={index}
                                        onClick={() => { currentSearchOption != item ? setSuggestions([]) : undefined, setCurrentSearchOption(item) }} className={`py-2  hover:bg-blue-100 px-3 rounded-xl  border-blue-600  bg-surface-s2  ${item.name == currentSearchOption.name ? ' border-1' : ''} `}>
                                        {item.name}
                                    </button>
                                )
                            }
                        </div>
                        {waitData == 'done' ? <CustomScroll allowOuterScroll={true} heightRelativeToParent="100%">
                            <div className="p-3 text-[12px]">
                                suggestions
                            </div>
                            <div className="space-y-4">
                                {
                                    suggestions.map((item, index) => (
                                        item.type == 'event' ? <Link
                                            key={index}
                                            href={`/ma/${item.entity.slug}/${item.entity.customId}`}
                                            className='flex items-center space-x-1 hover:bg-custom-default-hover'>

                                            <div className="w-6  flex justify-center">
                                                <DisplayImage
                                                    onErrorImage={item.type == 'team' ? 'team' : item.type == 'player' ? 'player' : item.type == 'tournament' ? 'tournament' : 'flag'}
                                                    width={30}
                                                    height={30}
                                                    alt=''
                                                    src={`https://sofascore.com/api/v1/team/${item.entity.homeTeam.id}/image`} />
                                            </div>
                                            <div className="w-6  flex justify-center">
                                                <DisplayImage
                                                    onErrorImage={item.type == 'team' ? 'team' : item.type == 'player' ? 'player' : item.type == 'tournament' ? 'tournament' : 'flag'}
                                                    width={30}
                                                    height={30}
                                                    alt=''
                                                    src={`https://sofascore.com/api/v1/team/${item.entity.awayTeam.id}/image`} />
                                            </div>




                                            <div className="">
                                                <div className="flex items-center space-x-1.5">
                                                    <p className='text-sm'>
                                                        {item.entity.homeTeam.shortName} vs {item.entity.awayTeam.shortName}
                                                    </p>
                                                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                                    <div className="w-6 flex justify-center items-center opacity-65">
                                                        <Image width={18} height={18} alt='' src={'/image/user-friends.svg'} />
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">2.5M</div>
                                                </div>
                                                <div className="flex items-center space-x-1.5">
                                                    <div className="w-">
                                                        <DisplayImage onErrorImage='flag' width={14} height={14} alt='' src={`https://api.sofascore.app/api/v1/unique-tournament/${item.entity.tournament.uniqueTournament.id}/image`} />
                                                    </div>
                                                    <p className='text-[12px] text-gray-400'>
                                                        {item.entity.tournament.uniqueTournament.name}
                                                    </p>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                    <div className="w-6 opacity-45">
                                                        <Image width={16} height={16} alt='' src={'/image/soccer-ball.svg'} />
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">Soccer</div>
                                                </div>
                                            </div>
                                        </Link> :
                                            <Link
                                                key={index}
                                                href={item.type == 'team' ? `/ma/team/${item.entity.slug}/${item.entity.id}`
                                                    : item.type == 'player' ? `/ma/player/${item.entity.slug}/${item.entity.id}`
                                                        : item.type == 'uniqueTournament' ? `/ma/tournament/soccer/${item.entity.category.slug}/${item.entity.slug}/${item.entity.id}`
                                                            : item.type == 'event' ? `/ma/${item.entity.slug}/${item.entity.customId}`
                                                                : '/'}
                                                className='flex items-center space-x-1 hover:bg-custom-default-hover'>
                                                <div className="w-16  flex justify-center">
                                                    <DisplayImage
                                                        onErrorImage={item.type == 'team' ? 'team' : item.type == 'player' ? 'player' : item.type == 'tournament' ? 'tournament' : 'flag'}
                                                        width={40}
                                                        height={40}
                                                        alt=''
                                                        src={item.type == 'team' ? `https://sofascore.com/api/v1/team/${item.entity.id}/image`
                                                            : item.type == 'uniqueTournament' ? `https://api.sofascore.app/api/v1/unique-tournament/${item.entity.id}/image`
                                                                : `https://api.sofascore.app/api/v1/player/${item.entity.id}/image`} />
                                                </div>




                                                <div className="">
                                                    <div className="flex items-center space-x-1.5">
                                                        <p className='text-sm'>
                                                            {item.entity.name}:{item.type}
                                                        </p>
                                                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                                        <div className="w-6 flex justify-center items-center opacity-65">
                                                            <Image width={18} height={18} alt='' src={'/image/user-friends.svg'} />
                                                        </div>
                                                        <div className="text-[11px] text-gray-400">2.5M</div>
                                                    </div>
                                                    <div className="flex items-center space-x-1.5">
                                                        <div className="w-">
                                                            <DisplayImage onErrorImage='flag' width={14} height={14} alt='' src={`https://api.sofascore.app/static/images/flags/${item.entity.country?.alpha2?.toLowerCase()}.png`} />
                                                        </div>
                                                        <p className='text-[12px] text-gray-400'>
                                                            {item.entity.name}
                                                        </p>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                        <div className="w-6 opacity-45">
                                                            <Image width={16} height={16} alt='' src={'/image/soccer-ball.svg'} />
                                                        </div>
                                                        <div className="text-[11px] text-gray-400">Soccer</div>
                                                    </div>
                                                </div>
                                            </Link>
                                    ))
                                }

                            </div>
                        </CustomScroll>
                            : <div className='w-full h-full'>
                                <div className="h-64 w-full flex justify-center items-center">
                                    <div className="w-10 h-10 rounded-full animate-spin border-r-transparent border-3 border-black" />
                                </div>
                            </div>

                        }

                    </div>

                }
            </div >
        </>
    )
}
export default Navbar


