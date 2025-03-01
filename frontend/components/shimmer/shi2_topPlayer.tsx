import React from 'react'

const Shimmer_topPlayer = () => {
    return (
        <div className="animate-pulse">
            <div
                className="flex space-x-2 items-center   px-2 text-gray-900 text-opacity-75">
                <div className=" w-14  relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                </div>
                <div className="w-full space-y-2 p-2">
                    <div className="w-20 h-2 bg-slate-200"></div>
                    <div className="w-24 h-2 bg-slate-200"></div>
                </div>
            </div>
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
                    <div key={index}
                        className="flex space-x-2 items-center py-3   px-2 text-gray-900 text-opacity-75">
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

export default Shimmer_topPlayer
 