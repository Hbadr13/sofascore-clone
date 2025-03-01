import Image from 'next/image'
import React, { useState } from 'react'

const Highlights = () => {

    const [waitdata, setwaitdata] = useState(true)
    setInterval(() => setwaitdata(false), 1000)
    const highlights = [{
        match: 'Real Madrid VS Barcelona',
    },
    {
        match: 'Manchester United VS Liverpool',
    },
    {
        match: 'Bayern Munich VS Borussia Dortmund',
    },
    {
        match: 'Juventus VS Inter Milan',
    },
    {
        match: 'Paris Saint-Germain VS Olympique Marseille',
    }]

    return (

        <div>
            <div className="MYDeg w-full bg-[#ffffff] rounded-2xl p-3">
                <p>Highlights</p>
                <div className="flex overflow-hidden space-x-2">
                    {
                        waitdata && [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
                            <div key={index} className=" border-b-[0.5px] ">
                                <div className="animate-pulse flex space-x-1">
                                    <div className="w-[92px] h-[140px] relative bg-slate-200 rounded-2xl p-2 ">
                                        <div className="w-14 h-6 bg-slate-300 bg-opacity-40 absolute  top-2 left-2 px-2 rounded-lg"></div>
                                        <div className="w-[80%] h-2 bg-slate-300 bg-opacity-40 absolute bottom-4 px-2 rounded-lg"></div>
                                        <div className="w-[80%] h-2 bg-slate-300 absolute bg-opacity-40 bottom-8 px-2 rounded-lg"></div>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex overflow-hidden space-x-2">
                    {!waitdata && highlights.map((item, index) =>
                        <div key={index} v-for="(item, index) in Highlights" className=" rounded-xl">
                            <div className="w-[92px] h-[140px] relative">
                                <div
                                    className="absolute top-1 left-1 bg-blue-400 text-white font-medium py-[2px] px-2.5 text-[9px] rounded-xl">
                                    NEW
                                </div>
                                <Image alt='messi-ronaldo' className=" object-cover   w-full h-full rounded-xl" src="/image/messi-ronaldo.png" />
                                <div
                                    className="absolute  Z2 -bottom-7 h-1/2 w-full left-1 text-sm text-white font text-ellipsis overflow-hidden">
                                    {item.match}
                                </div>
                                <div className="MFDeg Z1 w-full h-10 bottom-0 absolute  rotate-180 opacity-60  rounded-xl"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Highlights
