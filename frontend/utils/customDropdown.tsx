'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@nextui-org/react';
import SvgIcons from '@/utils/svgIcons';


interface ICustomDropdown {
    buttonStyle?: string
    width?: number
    CustomDropdownStyle?: React.CSSProperties; // Updated to be an object for inline styles
    height?: number
    buttonContent: ReactNode
    CustomDropdownContent: ReactNode
}

const CustomDropdown = ({ CustomDropdownContent, CustomDropdownStyle, width, height, buttonContent, buttonStyle }: ICustomDropdown) => {
    const ref = useRef<any>();
    const ref2 = useRef<any>();
    const [click, setclick] = useState(false)

    useEffect(() => {
        document.addEventListener('click', (event: any) => {
            if (ref2.current && !ref2.current.contains(event.target) && !ref.current.contains(event.target)) {
                setclick(false)
            }
        })
        document.addEventListener('click', (event: any) => {
            const clickedElement = event.target;
            if (clickedElement.classList.contains('hidediv')) {
                setclick(false)
            }
        });
    }, []);

    return (
        <div className="   relative   h-10 "  >
            <Button
                className={' px-1 relative bg-on-surface-nLv5   flex items-center justify-around' + buttonStyle}
                onClick={() => setclick((pr) => !pr)}
                ref={ref}
            >
                <div className="">
                    {buttonContent}
                </div>
                <div className={` ${click ? ' rotate-180' : ''}`}>
                    <SvgIcons iconName='arraw' />
                </div>
            </Button>
            {
                click &&
                <div
                    style={{
                        ...{
                            top: 44,
                            maxHeight: '400px',
                            width: width ? `${width}px` : '200px'
                        },
                        ...(CustomDropdownStyle || null)
                    }}
                    className={'   animate-appearance-in    absolute z-30 hideScroll  overflow-auto   bg-white   w-full rounded-xl shadow-medium'}
                    ref={ref2}
                >
                    < div onClick={() => setclick((pr) => !pr)} className="space-y-1 flex flex-col  p-1.5 ">
                        {CustomDropdownContent}
                    </div>
                </div>
            }
        </div >
    )
}
export default CustomDropdown
