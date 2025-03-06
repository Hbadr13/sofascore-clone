
'use client'

import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react';

import Link from 'next/link'
import Search from './search'

const Navbar = () => {
    const [waitData, setWaitData] = useState('wait')
    const [query, setQuery] = useState('')
    const [query1, setQuery1] = useState('')
    const sports: Array<string> = [
        'Soccer',
    ]
    const [suggestions, setSuggestions] = useState<Array<any>>([])
    const [currentSearchOption, setCurrentSearchOption] = useState<{ name: string, slug: string }>({ name: 'All', slug: 'all' })

    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1);
    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure we are on the client

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial value after mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        (

            async () => {
                try {
                    setWaitData('wait')
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/${query1 == '' ? `suggestions/${currentSearchOption.slug == 'all' ? 'default' : currentSearchOption.slug}` : `${currentSearchOption.slug}?q=${query1} `}`, {});
                    if (response.ok) {
                        const data = await response.json()
                        setSuggestions(Array.from(data.results))
                        setWaitData('done')
                    }
                } catch (error) {
                    setWaitData('error')
                }
            }
        )()
    }, [currentSearchOption, query1])
    useEffect(() => {
        if (query.length >= 2 || query.length == 0)
            setQuery1(query)
    }, [query])
    return (
        <header className="w-full z-40 top-0 sticky">
            <div className=" max-w-full flex flex-col items-center ">
                <div className="w-full bg-[#2c3ec4]  px-2   h-[65px] flex justify-center items-center">
                    <div className="w-full desktop:w-[1360px] tablet:w-[992px]  ">
                        <div className=" relative w-full  flex justify-center items-center tablet:h-[64px]">
                            <Link href=" /" className="h-full w-1/2 ">
                                <Image
                                    className='max-w-[200px]'
                                    width={300}
                                    height={50}
                                    src="/sofa-logo.png"
                                    alt="logo"
                                >
                                </Image>
                            </Link>
                            <div className=" relative w-[360px] -left-10  desktop:left-0 hidden tablet:block">
                                <Search
                                    waitData={waitData}
                                    query={query}
                                    setQuery={setQuery}
                                    currentSearchOption={currentSearchOption}
                                    setSuggestions={setSuggestions}
                                    setCurrentSearchOption={setCurrentSearchOption}
                                    suggestions={suggestions} />
                            </div>
                            <div
                                className="flex h-full w-1/2 uppercase  items-center justify-end py-2 space-x-3 tablet:space-x-5  text-white font-extralight">
                                <div className="hidden tablet:flex items-center space-x-1 mx-2">
                                    <div className="whitespace-nowrap">
                                        dropping odds
                                    </div>
                                    <Image width={20} height={20} alt='' src='/image/decrease.svg' className=' ' />
                                </div>
                                <div className="hidden tablet:flex items-center space-x-1">
                                    <div className="">
                                        favorites
                                    </div>
                                    <Image width={20} height={20} alt='' className="hidden tablet:block w-5 h-5" src='/image/notification.svg' />
                                </div>
                                {windowWidth < 992 && <button className='active:opacity-50' onClick={() => setOpen((prv) => !prv)}>
                                    <Image alt='' width={28} height={28} className=" " src='/image/search.png' />
                                </button>}
                                <Link href={'/user/login'}>
                                    <Image width={32} height={32} alt='' className="block" src='/image/player.svg' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && windowWidth < 992 && <div className="fixed top-4 z-20 pr-1 h-screen w-screen  flex justify-center">
                <div className="relative z-10 h-10">
                    <div className="relative z-0">
                        <Search
                            waitData={waitData}
                            query={query}
                            setQuery={setQuery}
                            currentSearchOption={currentSearchOption}
                            setSuggestions={setSuggestions}
                            setCurrentSearchOption={setCurrentSearchOption}
                            suggestions={suggestions} />
                    </div>
                    <button onClick={() => setOpen(false)} className='10 h-10 flex justify-center items-center  bg-white z-10 absolute inset-y-0  right-2 rounded-xl'  >
                        <Image src={'/image/clean.png'} width={30} height={30} alt="clean"></Image>
                    </button>
                </div>
                <div onClick={() => setOpen(false)} className="h-full bg-slate-400 opacity-20 w-full absolute z-0"></div>
            </div>}

        </header >
    )
}

export default Navbar
