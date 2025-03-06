'use client'
import { useHash } from '@/app/ma/sl/[[...slug]]/page';
import { Button } from '@nextui-org/react'
import { Image } from '@nextui-org/react';

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
export interface FooterbarDataProps {
    name: string,
    activeSVG: React.ReactNode
    noneSVG: React.ReactNode
    url: string,
    id: number
}
const Footer = () => {
    const hash = useHash()

    const pathname = usePathname()
    let button = 'Matches'
    if (pathname == '/favorites')
        button = 'Favourites'

    const [currentbutton, setCurrentbutton] = useState<string>(button)
    const [menuActive, setMenuActive] = useState(false)
    const router = useRouter()
    const footerbarData: FooterbarDataProps[] = [
        {
            name: 'Matches',
            activeSVG: < svg width="24" height="24" viewBox="0 0 24 24" fill="#374df5" > <g fill="#374df5" fillRule="evenodd" height={24} width={24} >     <path fill="primary.default" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.24 15.26L11 13.02h.01l-.01-.01V6h2v6.19l3.66 3.66-1.41 1.41h-.01z">     </path> </g> </svg >,
            noneSVG: < svg width="24" height="24" viewBox="0 0 24 24" > <g fillRule="evenodd" height={24} width={24} ><path fill="onSurface.nLv1" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 2v6.19l3.66 3.65-1.42 1.42L11 13.01l.01-.01H11V6h2z"></path></g></svg >,
            url: '/',
            id: 0
        },
        {
            name: 'Leagues',
            activeSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="#374df5" ><path d="m22 10-4 4v1l-2 2H8l-2-2v-1l-4-4V4h3v2H4v3l2 2V2h12v9l2-2V6h-1V4h3v6zM7 22v-2h4v-2h2v2h4v2H7z" fill="#374df5" fillRule="evenodd" height="24" width="24"  ></path></svg>,
            noneSVG: <svg width="24" height="24" viewBox="0 0 24 24" ><path d="m22 10-4 4v1l-2 2H8l-2-2v-1l-4-4V4h3v2H4v3l2 2V2h12v9l2-2V6h-1V4h3v6zm-6-6H8v10.17l.83.83h6.34l.83-.83V4zM7 22v-2h4v-2h2v2h4v2H7z" fillRule="evenodd" height={24} width={24} ></path></svg>,
            url: '/ma/sl/#leagues',
            id: 1
        },
        {
            name: 'Calendar',
            activeSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="#374df5" className="SvgWrapper fyGiev"><path fill="#374df5" d="M20 2H2v20h20V2h-2zM4 4h16v2H4V4zm16 16H4V8h16v12z" fill-rule="evenodd"></path></svg>,
            noneSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-default)" className="SvgWrapper fyGiev"><path fill="var(--primary-default)" d="M20 2H2v20h20V2h-2zM4 4h16v2H4V4zm16 16H4V8h16v12z" fill-rule="evenodd"></path></svg>,
            url: '/ma/sl/#calendar',
            id: 2
        },
        // {
        //     name: 'Menu',
        //     activeSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="#374df5" ><path fill="#374df5" d="M4 4H2v4h2V6h18V4H4zm16 14H2v2h20v-4h-2v2zm2-7H2v2h20v-2z" fillRule="evenodd" height={24} width={24} ></path></svg>,
        //     noneSVG: <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M4 4H2v4h2V6h18V4H4zm16 14H2v2h20v-4h-2v2zm2-7H2v2h20v-2z" fillRule="evenodd" height={24} width={24} ></path></svg>,
        //     url: '/',
        //     id: 3
        // },
    ]
    useEffect(() => {
        if (hash == "#calendar")
            setCurrentbutton('Calendar')
        else if (hash == "#leagues")
            setCurrentbutton('Leagues')
        else
            setCurrentbutton('Matches')
    }, [hash])


    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY && currentScrollY > 50) {
                // Scroll down → Hide Navbar
                setIsVisible(false);
            } else {
                // Scroll up → Show Navbar
                setIsVisible(true);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    return (
        <div className={``}>
            <div className=" bg-[#2c3ec4]  flex  capitalize max-w-full  flex-col items-center     mt-10">
                <div className=" w-full hidden tablet:flex  desktop:w-[1344px] tablet:w-[992px] space-x-14 py-10 text-white">
                    <div className="w-1/2  space-y-4">
                        <div className="text-xl ">About</div>
                        <p className="text-[14px] font-normal  ">Live scores service at Sofascore livescore offers sports
                            live scores,
                            results and tables.
                            Follow your favourite teams right here live! Live score on Sofascore.com livescore is
                            automatically updated and you don{`'`}t need to refresh it manually. With adding games you want
                            to follow in {`"`}My games{`"`} following your matches livescores, results and statistics will be
                            even more simple.</p>
                    </div>
                    <div className="w-1/2 text-[16px]  font-semibold space-y-4">
                        <div className="text-xl">Top live scores and streaming</div>
                        <div className="text-[14px] font-normal">
                            <div>Atlético Madrid - Barcelona</div>
                            <div>Manchester United - Liverpool</div>
                            <div>Manchester City - Newcastle United</div>
                            <div>Inter - Napoli</div>
                            <div>Real Sociedad - Cádiz</div>
                            <div>Sinner J. - Alcaraz C.</div>
                            <div>Paul T. - Medvedev D.</div>
                            <div>Los Angeles Lakers - Golden State Warriors</div>
                            <div>Boston Bruins - Philadelphia Flyers</div>
                            <div>France - England</div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 bg-opacity-15 w-full hidden tablet:flex tablet:flex-col flex-row justify-center">
                    <div
                        className=" w-full flex  flex-col    tablet:block  items-center justify-center desktop:w-[1344px] tablet:w-[992px] text-white py-[32px] px-[8px]"
                    >
                        <div className="flex items-center justify-center space-x-1 ">
                            <Image width={100} height={100} alt='club2' className=" w-8 h-8" src='/image/club2.png' />
                            <div className=" text-3xl">sofascore</div>
                        </div>
                        <div className="w-full flex space-x-2 items-center justify-center">
                            <div className="">
                                When the fun stops, STOP
                            </div>
                            <Image width={100} height={100} alt='club2' className=" w-8 h-8" src='/image/club2.png' />
                        </div>
                    </div>
                    <div className="w-full tablet:hidden ">
                        <div className=" w-full flex-col justify-center  text-white">
                            <div className="flex flex-col w-full items-center p-6 space-y-4">
                                <div className=" w-full  flex justify-center space-x-2">
                                    <Image width={100} height={100} alt='club' className=" w-8 h-8" src='/image/club.png' />
                                    <div className=" text-2xl">sofascore</div>
                                </div>
                                <div className=" w-full flex  justify-center space-x-2">
                                    <Image width={100} height={100} alt='club' className=" w-6 h-6" src='/image/club.png' />
                                    <div className="">
                                        When the fun stops, STOP
                                    </div>
                                </div>
                            </div>
                            <button className="flex flex-col w-full bg-gray-900 bg-opacity-15  space-y-5 items-center p-10">
                                <div className=" capitalize">download sofascore<br /> livescore app</div>
                                <div className="flex flex-col space-y-3">
                                    <div className="w-36 h-10 bg-black rounded-sm flex justify-between items-center p-2">
                                        <Image width={100} height={100} alt='club' className=" w-7 h-7" src='/image/club.png' />
                                        <div className=" text-start opacity-90">
                                            <div className="text-[10px]">GET IT ON</div>
                                            <div className="">Google Play</div>
                                        </div>
                                    </div>
                                    <div className="w-36 h-10 bg-black rounded-sm flex justify-between items-center p-2">
                                        <Image width={100} height={100} alt='club' className=" w-7 h-7" src='/image/club.png' />
                                        <div className=" text-start opacity-90">
                                            <div className="text-[10px]">Download on the</div>
                                            <div className="">App Store</div>
                                        </div>
                                    </div>
                                </div>

                            </button>
                            <div className="flex flex-col w-full   space-y-5 items-center pt-10 ">
                                <div className="">Visit us</div>
                                <div className="flex space-x-10 ">
                                    <button>
                                        <Image width={100} height={100} alt='1' className=" w-8 h-8" src='/image/club2.png' />
                                    </button>
                                    <button>
                                        <Image width={100} height={100} alt='12' className=" w-8 h-8" src='/image/club2.png' />
                                    </button>
                                    <button>
                                        <Image width={100} height={100} alt='13' className=" w-8 h-8" src='/image/club2.png' />
                                    </button>
                                    <button>
                                        <Image width={100} height={100} alt='14' className=" w-8 h-8" src='/image/club2.png' />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=" w-full  flex  justify-center ">
                        <div
                            className=" w-full flex  items-center justify-between desktop:w-[1344px] tablet:w-[992px] text-white py-[3px] px-[0px] tablet:px-[8px]">
                            <div
                                className="flex    
                    flex-col-reverse tablet:flex-row space-y-10 tablet:space-y-0 space-x-0 tablet:space-x-5 items-center w-full justify-center   text-[15px]">
                                <div className=" w-full text-center tablet:w-1/4 whitespace-nowrap mt-8  tablet:mt-0">© 2024
                                    Sofascore –
                                    All Rights
                                    Reserved.
                                </div>
                                <div
                                    className=" flex w-full py-10 flex-col  justify-end tablet:flex-row space-y-8 bg-gray-900 tablet:bg-inherit bg-opacity-15 tablet:bg-opacity-100 tablet:space-y-0 space-x-0   tablet:space-x-2   desktop:space-x-5 items-center whitespace-nowrap">
                                    <button className="">PRIVACY & COOKIE POLICY</button>
                                    <button className="">SEND FEEDBACK</button>
                                    <button className="">ADVERTISE</button>
                                    <button className="">CONTACT</button>
                                    <button className="">SOFASCORE LIVESCORE APP</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" block tablet:hidden w-full h-36  border-t-[0.5px] border-blue-300  mt-8"></div>
                </div>


                <div
                    className={` transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"} w-full text-[13px] pt-2   h-[60px] px-4  border-b-2  bg-white border-gray-300 fixed z-50  bottom-0   tablet:hidden flex justify-between items-center `}>
                    {footerbarData.map((item, index) =>
                        <Button key={index} onClick={() => { setCurrentbutton(item.name); router.push(item.url) }} className={` relative ${currentbutton == item.name ? 'text-blue-500' : ' text-gray-800'} flex  flex-col  bg-white  h-14  -space-y-1.5  px-5 w-1/4`}>
                            {currentbutton == item.name
                                ? item.activeSVG
                                : item.noneSVG
                            }
                            <div className="   ">{item.name}</div>
                            <div hidden={currentbutton != item.name} className=" absolute w-14 h-0.5 bg-blue-700  bottom-0"></div>
                        </Button>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Footer