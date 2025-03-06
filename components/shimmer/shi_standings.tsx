import React from 'react'

const Shi_standings = () => {
    return <div className="py-3 pb-3 pt-10">
        <div hidden className="flex space-x-4 p-4">
            {/* {[1, 2, 3].map((item) => <div key={item} className='h-10 w-20 rounded-xl bg-slate-200' />)} */}
        </div>
        <div className="p-4">
            {
                'www.sofascore.app25'.split('').map((item, index) =>
                (
                    <div key={index} className=" py-1 ">
                        <div className="animate-pulse flex items-center space-x-4">
                            <div className="rounded-full bg-slate-200 h-6 w-6"></div>
                            <div className="h-5  w-full bg-slate-200 rounded col-start-1 col-end-4"></div>
                        </div>
                    </div>
                ))}
        </div>
        <div className="w-full h-20 "></div>
    </div>
}

export default Shi_standings