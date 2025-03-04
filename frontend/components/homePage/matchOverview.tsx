
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
            <div className={`${scrollType == '1' ? 'sticky top-[124px] text-white' : 'text-white'} `}>
                <div className='  text-black  w-full  justify-between  bg-white rounded-2xl'>
                    <div style={scrollType == '1' ? { height: 'calc(100vh - 170px)' } : { height: '700px' }} className='   pb-2 rounded-b-2 w-full items top-[120px] justify-between  rounded-2xl'>
                        <CustomScroll className='w-full' allowOuterScroll={true} heightRelativeToParent="100%" >
                            <div className=" ">
                                <div className="flex h-7 justify-between items-center px-3 truncate ">
                                    <div className="flex text-[12px] font-black  text-blue-600  space-x-1  truncate">
                                        <Link href={'/'} className=" hover:underline">{currentMatch?.tournament.category.name}</Link>
                                        <Image className=' rotate-180' width={10} height={10} alt='' src={'/image/arraw.svg'} />
                                        <Link
                                            href={`/ma/tournament/soccer/${currentMatch?.tournament.category.name}/${currentMatch?.tournament.uniqueTournament.slug}/${currentMatch?.tournament.uniqueTournament.id}?id:${currentMatch?.season.id}`}
                                            className="hover:underline">{currentMatch?.tournament.name}, Round {currentMatch?.roundInfo?.round}</Link>
                                        <Image className=' rotate-180' width={10} height={10} alt='' src={'/image/arraw.svg'} />
                                        <Link href={`/ma/${currentMatch?.slug}/${currentMatch?.customId}#id:${currentMatch?.id}`} className="hover:underline">{currentMatch?.awayTeam.shortName} - {currentMatch?.homeTeam.shortName}</Link>
                                    </div>
                                    <button onClick={() => setCurrentMatch(null)} className='p-2 text-center  rounded-xl'>
                                        <Image className=' rotate-180' width={30} height={30} alt='' src={'/image/clean.png'} />
                                    </button>
                                </div>
                                <MatchStatus event={currentMatch} incidents={incidents} />

                                <div className="w-full flex justify-center my-6">
                                    <Link href={`/ma/${currentMatch?.slug}/${currentMatch?.customId}#id:${currentMatch?.id}`} className="py-1.5 px-4 text-center bg-blue-600 text-white rounded-3xl hover:bg-blue-500 ">SHOW MORE</Link>
                                </div>
                                <div className="w-full flex justify-between  text-[14px] ">
                                    {
                                        options.map((item, index) =>
                                            <button
                                                key={index}
                                                onClick={() => setCurrentoption(item.name)}
                                                className={`${options.length > 5 ? 'text-[12px]' : ' text-[14px]'} text-center     w-1/4 py-2 ${item.name == currentOption ? 'border-b-1 border-blue-600 text-blue-600' : 'text-blue-300'}`}
                                            >
                                                {item.name}
                                            </button>
                                        )
                                    }
                                </div>
                                {
                                    currentOption == 'DETAILS' ? <MatchDetails currentMatch={currentMatch} incidents={incidents} setIncidents={setIncidents} /> :
                                        currentOption == 'LINEUPS' ? <MatchLineups currentMatch={currentMatch} /> :
                                            currentOption == 'MATCHES' ? <Matches currentMatch={currentMatch} /> :
                                                currentOption == 'COMMENTARY' ? <Commentary incidents={incidents} event={currentMatch} hideTitle={true} /> :
                                                    currentOption == 'STATISTICS' ? <MatchStatistics event={currentMatch} hideTitle={true} /> :
                                                        <Standings currentMatch={currentMatch} type='small' />
                                }
                                <div className="h-3 bg-white w-full rounded-2xl"></div>
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

