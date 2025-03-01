import React, { useEffect, useState } from 'react'
import { getRatingColor } from './function'

export const CountUpAnimation = ({ initialValue, targetValue, }: { initialValue: number, targetValue: number }) => {
    const [count, setCount] = useState(initialValue);
    const duration = 300; // 4 seconds

    useEffect(() => {
        let startValue = initialValue;
        const interval = Math.floor(
            duration / (targetValue - initialValue));

        const counter = setInterval(() => {
            startValue += 1;
            setCount(startValue);
            if (startValue >= targetValue) {
                setCount(targetValue);
                clearInterval(counter);
            }
        }, interval);

        return () => {
            clearInterval(counter);
        };
    }, [targetValue, initialValue]);

    return (
        <span className="num">{count.toFixed(1)}</span>
    );
};


const DisplayRating = ({ rating, type }: { rating: string | number, type: 'in' | 'out' }) => {
    if (rating)
        rating = Number(rating) < 10 ? Number(rating).toFixed(1) : Number(rating)
    if (type == 'in')
        return (
            <div className={` RatingBigBoxAnimation p-1   w-7 h-7  rounded-[1.5px] text-sm font-semibold  flex justify-center items-center text-white  ${rating ? getRatingColor('baground', rating) : 'bg-slate-400'}`}>
                {(rating ? rating : '-')}
            </div>
        )
    else
        return (
            <div className="flex items-center space-x-1.5">

                <div className={` RatingBoxAnimation  w-5 h-5  rounded-[1.5px]  flex justify-center items-center text-white   ${rating ? getRatingColor('baground', rating) : 'bg-slate-400'}`} />
                <div className="text-xl  font-bold w-6  ">
                    {
                        rating ? <CountUpAnimation initialValue={0} targetValue={Number(rating)} /> : '-'
                    }
                </div>
            </div>
        )
}

export default DisplayRating