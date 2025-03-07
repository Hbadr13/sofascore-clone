
import React, { useEffect, useState } from 'react'
import { CustomScroll } from 'react-custom-scroll'
import Link from 'next/link'
import { Image } from '@nextui-org/react';

import MatchDetails from '../matchInfo/details'
import MatchLineups from '../matchInfo/lineups'
import Matches from '../matchInfo/matches'
import Standings from '../matchInfo/standings'
import { useCurrentMatch } from '@/context/EventDateContext'
import { IIncidentsAPIJson } from '@/interface/api/incidents'
import MatchStatus from '../matchInfo/matchStatus'
import Commentary from '../events/commentary'
import MatchStatistics from '../events/matchStatistics'
const MatchOverview = ({ scrollType }: { scrollType: string }) => {
    const { currentMatch, setCurrentMatch } = useCurrentMatch();
    const [incidents, setIncidents] = useState<IIncidentsAPIJson[]>([])

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
    const [options, setOptions] = useState<Array<{ name: string }>>([{ name: 'DETAILS' }])

    useEffect(() => {
        (
            async () => {
                if (!currentMatch)
                    return
                let opts: { name: string }[] = [{ name: 'DETAILS' }]
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournament/${currentMatch.tournament.id}/season/${currentMatch.season.id}/standings/total`, {});
                    if (response.ok)
                        opts.push({ name: 'STANDINGS' })
                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch?.id}/lineups`, {});
                    if (response.ok)
                        opts.push({ name: 'LINEUPS' })

                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/statistics`, {})
                    if (response.ok)
                        opts.push({ name: 'STATISTICS' })

                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/comments`, {})
                    if (response.ok)
                        opts.push({ name: 'COMMENTARY' })

                } catch (error) {
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.customId}/h2h/events`, {});
                    if (response.ok)
                        opts.push({ name: 'MATCHES' })

                } catch (error) {

                }
                setOptions(opts)
            }
        )()
    }, [currentMatch])
    // useEffect(() => {
    //     (
    //         async () => {
    //             if (!currentMatch)
    //                 return
    //             let opts: Array<{ name: string }> = [{ name: 'DETAILS' }, { name: 'STANDINGS' }, { name: 'MATCHES' }, { name: 'LINEUPS' }, { name: 'COMMENTARY' }, { name: 'STATISTICS' }]

    //             try {
    //                 await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournament/${currentMatch.tournament.id}/season/${currentMatch.season.id}/standings/total`, {});

    //             } catch (error) {
    //                 opts = opts.filter((item) => item.name != 'STANDINGS')
    //             }
    //             try {
    //                 await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch?.id}/lineups`, {});
    //             } catch (error) {
    //                 opts = opts.filter((item) => item.name != 'LINEUPS')
    //             }
    //             try {
    //                 await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/statistics`, {})
    //             } catch (error) {
    //                 opts = opts.filter((item) => item.name != 'STATISTICS')
    //             }
    //             try {
    //                 await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.id}/comments`, {})
    //             } catch (error) {
    //                 opts = opts.filter((item) => item.name != 'COMMENTARY')
    //             }
    //             try {
    //                 await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/${currentMatch.customId}/h2h/events`, {});
    //             } catch (error) {
    //                 opts = opts.filter((item) => item.name != 'MATCHES')

    //             }
    //             setOptions(opts)
    //         }
    //     )()
    // }, [currentMatch])

    const [currentOption, setCurrentoption] = useState('DETAILS')

    return (
        <>
            <div className={`mb-5 ${scrollType == '1' ? ' -translate-y-6 sticky top-[124px] text-white' : 'text-white'} `}>

                <div className='  text-black  w-full  justify-between   rounded-2xl'>
                    {/* <div className={`${scrollType == '1' ? 'h-[calc(100vh - 170px)]' : ' h-full tablet:h-[700px]'}   pb-2 rounded-b-2 w-full items top-[120px] justify-between  rounded-2xl`}> */}
                    <div style={scrollType == '1' ? { height: 'calc(100vh - 170px)' } : { height: windowWidth < 992 ? 'auto' : '700px' }} className='   pb-2 rounded-b-2 w-full items top-[120px] justify-between  rounded-2xl'>
                        <CustomScroll className='w-full' allowOuterScroll={true} heightRelativeToParent="100%" >
                            <div className="">
                                <div className=" bg-white">

                                    <div className="flex h-7 justify-between items-center px-3 truncate  bg-white">
                                        <div className="flex items-center  text-[10px] tablet:text-[12px] font-black  text-blue-600  space-x-1  truncate">
                                            <Link href={'/'} className=" hover:underline">{currentMatch?.tournament.category.name}</Link>
                                            <Image className=' rotate-180' width={10} height={10} alt='' src={'/image/arraw.svg'} />
                                            <Link
                                                href={`/ma/tournament/soccer/${currentMatch?.tournament.category.name}/${currentMatch?.tournament.uniqueTournament.slug}/${currentMatch?.tournament.uniqueTournament.id}?id:${currentMatch?.season.id}`}
                                                className="hover:underline">{currentMatch?.tournament.name}, Round {currentMatch?.roundInfo?.round}</Link>
                                            <Image className=' rotate-180' width={10} height={10} alt='' src={'/image/arraw.svg'} />
                                            <Link href={`/ma/${currentMatch?.slug}/${currentMatch?.customId}#id:${currentMatch?.id}`} className="hover:underline">{currentMatch?.awayTeam.shortName} - {currentMatch?.homeTeam.shortName}</Link>
                                        </div>
                                        {windowWidth > 992 && <button onClick={() => setCurrentMatch(null)} className='p-2 text-center  rounded-xl'>
                                            <Image className=' rotate-180' width={30} height={30} alt='' src={'/image/clean.png'} />
                                        </button>}
                                    </div>
                                    <MatchStatus event={currentMatch} incidents={incidents} />

                                    <div className="w-full flex justify-center my-6 bg-white">
                                        <Link href={`/ma/${currentMatch?.slug}/${currentMatch?.customId}#id:${currentMatch?.id}`} className="py-1.5 px-4 text-center bg-blue-600 text-white rounded-3xl hover:bg-blue-500 ">SHOW MORE</Link>
                                    </div>
                                    <div className={`${windowWidth < 992 ? 'hideScroll' : ''} w-full overflow-x-auto   whitespace-nowrap    tablet:text-sm `}>
                                        {options.map((tab, index) => <button key={index} onClick={() => setCurrentoption(tab.name)} className={` min-w-20 ${currentOption == tab.name ? 'text-blue-600 border-b-blue-600 font-semibold border-b-2' : 'text-blue-400 border-b-blue-300 border-b-1'} text-sm w-1/4 py-3 `}>{tab.name}</button>)}
                                    </div>
                                </div>
                                <div className="px-3 tablet:px-0 mt-3">
                                    <div className=" bg-white rounded-xl">

                                        {
                                            currentOption == 'DETAILS' ? <MatchDetails currentMatch={currentMatch} incidents={incidents} setIncidents={setIncidents} /> :
                                                currentOption == 'LINEUPS' ? <MatchLineups currentMatch={currentMatch} /> :
                                                    currentOption == 'MATCHES' ? <Matches currentMatch={currentMatch} /> :
                                                        currentOption == 'COMMENTARY' ? <Commentary incidents={incidents} event={currentMatch} hideTitle={true} /> :
                                                            currentOption == 'STATISTICS' ? <MatchStatistics event={currentMatch} hideTitle={true} /> :
                                                                <Standings currentMatch={currentMatch} type='small' />
                                        }
                                    </div>
                                </div>
                            </div>

                        </CustomScroll >
                    </div>
                </div >
            </div >
            {scrollType == '1' && <div className="mt-[40px] h-[2000px]">
            </div>}
        </>
    )
}

export default MatchOverview



const StickyHeader = () => {
    return (
        <div className='h-full'>
            <div className="sticky top-20 bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Header</h1>
            </div>
            <div className="mt-36 p-4 h-[400px]">
            </div>
        </div>
    );
};

// export default StickyHeader;

