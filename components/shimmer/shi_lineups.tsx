import React from 'react'

const Shimmer_lineups = () => {
    return (
        <div className="animate-pulse pt-2  px-4 space-y-2 opacity-40">
            <div className="w-full h-80 ">
                <div className="flex bg-slate-200 w-full h-full rounded-xl"></div>
            </div>
            <div className="flex w-full space-x-2 items-center   ">
                <div className="w-1/2 h-9 bg-slate-200 rounded-xl"></div>
                <div className="w-1/2 h-9 bg-slate-200 rounded-xl"></div>
            </div>
            {[1, 2, 3, 4].map((item, index) =>
                <div key={index}
                    className="flex h-9 space-x-2 items-center py-3   text-gray-900 text-opacity-75">
                    <div className=" w-14  relative">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    </div>
                    <div className="w-full space-y-2 p-2">
                        <div className="w-20 h-2 bg-slate-200"></div>
                        <div className="w-24 h-2 bg-slate-200"></div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Shimmer_lineups