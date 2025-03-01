import React from 'react'

const Shimmer1 = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
    (
        <div key={index} className=" border-b-[0.5px] p-4 ">
            <div className="animate-pulse flex space-x-4">
                <div className=" space-y-2">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="bg-slate-200 h-2 w-10"></div>
                    <div className="bg-slate-200 h-2 w-10"></div>
                </div>
                <div className="flex-1 space-y-6 py-">
                    <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                    <div className="h-2 w-2/5 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-start-1 col-end-3"></div>
                            <div className="h-2 bg-slate-200 rounded col-start-1 col-end-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))
}

export default Shimmer1