import React from 'react'

const ShiPLayerSummary = () => {
    return (
        <div className="animate-puls h-96  bg-white MYDeg  p-6 rounded-2xl flex  space-x-4">
            <div className="animate-pulse flex w-1/2   bg-surface-s2   h-full rounded-xl"></div>
            <div className="animate-pulse w-1/2 h-full flex justify-center   flex-col space-y-2">

                {[1, 2, 3, 4, 5, 6].map((item, index) =>
                    <div key={index} className="flex h-9  space-x-2 items-center py-3   text-gray-900 text-opacity-75">
                        <div className=" w-14  relative">
                            <div className="w-10 h-10 rounded-full  bg-surface-s2"></div>
                        </div>
                        <div className="w-full space-y-2 p-2">
                            <div className="w-40 h-2  bg-surface-s2"></div>
                            <div className="w-48 h-2  bg-surface-s2"></div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ShiPLayerSummary