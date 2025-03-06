import React from 'react'

const Shi_StatisticsTable = () => {
    return <div className="p-3 space-y-8">
        {
            'www.sofa..'.split('').map((item, index) =>
            (
                <div key={index} className=" ">
                    <div className="animate-pulse flex items-center ">
                        <div className="h-8  w-full bg-slate-200/60 rounded col-start-1 col-end-4"></div>
                    </div>
                </div>
            ))}
        <div className="w-full h-20 "></div>
    </div>
}

export default Shi_StatisticsTable