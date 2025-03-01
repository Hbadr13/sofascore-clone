import React from 'react'

const ShiStatistics = () => {
    return (
        <div className="animate-pulse MYDeg text-black  w-full  justify-between  bg-white rounded-2xl p-2">
            <div className="p-1 text-xl font-medium">
                Statistics
            </div>
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
                    <div key={index} className="flex justify-between items-center py-3   px-2 text-gray-900 text-opacity-75">
                        <div className="">
                            <div className=" w-14  relative">
                                <div className="w-10 h-10 rounded-full bg-slate-200/50"></div>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-full space-y-2 p-2">
                                <div className="w-20 h-2 bg-slate-200/50"></div>
                                <div className="w-24 h-2 bg-slate-200/50"></div>
                            </div>
                        </div>
                        <div className="">
                            <div className=" w-14  relative">
                                <div className="w-10 h-10 rounded-full bg-slate-200/50"></div>
                            </div>

                        </div>
                    </div>
                )}

        </div>
    )
}

export default ShiStatistics
