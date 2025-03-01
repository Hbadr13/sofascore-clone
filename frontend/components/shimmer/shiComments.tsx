import React from 'react'

const ShiComments = () => {
    return (
        <div className="animate-pulse MYDeg text-black  w-full  justify-between  bg-white rounded-2xl p-2">
            <div className="p-1 text-xl font-medium">
                Comments
            </div>
            <div className=" space-y-3">

                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) =>
                        <div key={index} className="w-full h-12 rounded-xl bg-slate-200/50" />
                    )
                }
            </div>

        </div >
    )
}

export default ShiComments
