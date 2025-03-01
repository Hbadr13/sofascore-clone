import React from 'react'
import { CurrentMatchProvider } from '@/context/EventDateContext'
const layout = (Props: any) => {
    return (
        <CurrentMatchProvider>
            <div className="">
                {Props.children}
            </div>
        </CurrentMatchProvider>
    )
}

export default layout
