import React, { ReactNode } from 'react'

const SvgIcons = ({ iconName, width, height, color }: { iconName: string, height?: string, width?: string, color?: string }) => {
    const image: Array<{ name: string, icon: ReactNode }> = [
        {
            name: 'foot',
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="#0bb32a"  > <path d="m10.5 13.01 1.5 1.5-2.5.5-.5-.5 1.5-1.5zM7.92 1v1l2 1h2l1 6 1.5 4.5-1 1-10-10L5.92 1h2zM8 10.51l1.5 1.5-2.5.5-.5-.5 1.5-1.5zm-2.5-2.5L7 9.51l-2.5.5-.5-.5 1.5-1.5zm5.93.19H9.08l1.41 1.41h1.18l-.24-1.41zM3 5.51l1.5 1.5-2.5.5-.5-.5L3 5.51zm7.91-.01H6.43l1.41 1.41h3.31l-.24-1.41z" fill="#0bb32a" fillRule="evenodd" > </path></svg >
        },
        {
            name: 'penaltyGoals',
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="#0bb32a"><path d="M8.07 5.45c2.63 0 4.77 2.14 4.77 4.77 0 2.63-2.14 4.77-4.77 4.77-2.63 0-4.77-2.14-4.77-4.77 0-2.63 2.14-4.77 4.77-4.77zm.19 1.2h-.2c-.92 0-1.75.35-2.39.92l.63.37-.45 1.69-1.37.49v.12c0 .45.08.89.24 1.29l.64-.33 1.06 1.18-.17.94c.54.32 1.16.5 1.82.5 1.98 0 3.59-1.61 3.59-3.59 0-1.04-.44-1.96-1.14-2.62l-.6.55-1.86-.78.2-.73zm1.52 2.78.95 1.73-1.42 1.56-1.41-.55v-2.06l1.88-.68zM15 1v6.75h-1.5V2.5h-11v5.25H1V1h14z" fill="#0bb32a" fillRule="evenodd"></path></svg>
        },
        {
            name: 'ownGoals',
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="#c7361f" ><path d="M5 1v2.25h8.75V7.1c.77.84 1.25 1.94 1.25 3.17 0 2.61-2.12 4.73-4.73 4.73a4.74 4.74 0 0 1-4.73-4.73c0-2.6 2.13-4.72 4.73-4.72.71 0 1.38.17 1.98.45V4.75H5V7H4L1 4l3-3h1zm5.46 5.73h-.19c-.91 0-1.73.35-2.36.91l.62.37-.45 1.67-1.36.48v.12c0 .45.09.88.24 1.28l.63-.32 1.05 1.17-.17.93c.53.31 1.14.49 1.8.49l.01-.01a3.55 3.55 0 0 0 3.55-3.55c0-1.02-.44-1.94-1.13-2.59l-.59.55-1.84-.78.19-.72zm1.5 2.75.94 1.72-1.4 1.55-1.4-.55v-2.04l1.86-.68z" fill="#c7361f" fillRule="evenodd"></path></svg>
        },
        {
            name: 'swap',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="#0bb32a" ><g fill="#0bb32a" fillRule="evenodd" ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13.5H9V18H8l-4-3.5L8 11h1v2.5h4v2zm3-2.5h-1v-2.5h-4v-2h4V6h1l4 3.5-4 3.5z" fill="secondary.default"></path></g></svg>
        },
        {
            name: 'Injury',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="#c7361f" ><path d="M15 4.5V9h4.5v6h-4.501L15 19.5H9L8.999 15H4.5V9H9V4.5h6z" fill="#c7361f" fillRule="evenodd" ></path></svg>
        },
        {
            name: 'Transfer',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="#374df5" ><g fill="#374df5" fillRule="evenodd" ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-1v-4.5H5v-3h7V6h1l7 6-7 6z" fill="primary.default"></path></g></svg>
        },
        {
            name: 'arraw',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="" ><path fill="" d="m17 9-5 8-5-8h10z" fillRule="evenodd"></path></svg>
        },
        {
            name: 'OKy',
            icon: <svg aria-hidden="true" data-selected="true" role="presentation" viewBox="0 0 17 18"><polyline fill="none" points="1 9 7 14 15 4" stroke="currentColor" stroke-dasharray="22" stroke-dashoffset="44" stroke-linecap="round" strokeLinejoin="round" strokeWidth="1.5" ></polyline></svg>

        },
        {
            name: 'onBench',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(34, 34, 38, 0.45)" ><path d="M21 6H3v5h18V6zM2 13v2h2v4h2v-4h12v4h2v-4h2v-2H2z" fill="rgba(34, 34, 38, 0.45)" fillRule="evenodd"></path></svg>
        },
        {
            name: 'friends',
            icon: <svg width={width ? width : '24'} height={height ? height : '24'} viewBox="0 0 24 24" fill="rgba(34, 34, 38, 0.45)" ><g clip-path="url(#clip0_6014_21692)" width="40" height="40" fill="rgba(34, 34, 38, 0.45)"><path fillRule="evenodd" clip-rule="evenodd" d="M13 21H2V14L4 12H11L13 14V21Z" fill="onSurface.nLv3"></path><path fillRule="evenodd" clip-rule="evenodd" d="M22 21H15V14H20L22 16V21Z" fill="onSurface.nLv3"></path><path d="M7.5 10C9.433 10 11 8.433 11 6.5C11 4.567 9.433 3 7.5 3C5.567 3 4 4.567 4 6.5C4 8.433 5.567 10 7.5 10Z" fill="onSurface.nLv3"></path><path d="M16.5 12C18.433 12 20 10.433 20 8.5C20 6.567 18.433 5 16.5 5C14.567 5 13 6.567 13 8.5C13 10.433 14.567 12 16.5 12Z" fill="onSurface.nLv3"></path></g><defs width="40" height="40" fill="rgba(34, 34, 38, 0.45)"><clipPath id="clip0_6014_21692"><rect width="20" height="18" fill="white" transform="translate(2 3)"></rect></clipPath></defs></svg>
        },
        {
            name: 'rect1',
            icon: <svg width={width ? width : '24'} height={height ? height : '24'} viewBox="0 0 24 24" fill="rgba(34, 34, 38, 0.45)" ><path fill="rgba(34, 34, 38, 0.45)" d="M20 2H2v20h20V2h-2zM4 4h16v2H4V4zm16 16H4V8h16v12z" fillRule="evenodd" width="40" height="40"></path></svg>
        },
        {
            name: 'information',
            icon: <svg width="16" height="16" viewBox="0 0 24 24" className='' fill={color} ><g fill={color} fillRule="evenodd"><path fill="success.default" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 7v6h-2v-6h2zm0-4v2h-2V7h2z"></path></g></svg>
        },
        {
            name: 'menu-1',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--on-surface-nLv1)" ><path fill="var(--on-surface-nLv1)" d="M22 3H2v2h20V3zm-9 14H2v-2h10l1 2zm9-8H2v2h20V9zm-6.86 6 3.43 6L22 15h-6.86z" fillRule="evenodd"></path></svg>
        },
        {
            name: 'decrease',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" ><path fill="inherit" d="m3.5 18 6-6.02 4 4.007L22 6.412 20.59 5l-7.09 7.982-4-4.006L2 16.498z" fillRule="evenodd"></path></svg>
        },
        {
            name: '-',
            icon: <svg width={width ? width : '24'} height={height ? height : '24'} viewBox="0 0 24 24" fill={color ? color : '#374df5'} ><path fill={color ? color : '#374df5'} d="M19 13H5v-2h14z" fillRule="evenodd"></path></svg>
        },
        {
            name: 'x',
            icon: <svg width={width ? width : '24'} height={height ? height : '24'} viewBox="0 0 24 24" fill={color ? color : '#374df5'} ><g fill={color ? color : '#374df5'} fillRule="evenodd"><path fill="primary.default" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>
        },
        {
            name: 'expand',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={color ? color : '#374df5'} ><defs fill={color ? color : '#374df5'}><clipPath id="nlv9fl6eka"><path d="M1440 0v1080H0V0h1440z"></path></clipPath><clipPath id="7fc9kfma8b"><path d="M308 0c6.627 0 12 5.373 12 12v108H0V12C0 5.373 5.373 0 12 0h296z"></path></clipPath><clipPath id="qw2a2vtfmc"><path d="M18 0v8l-3.29-3.29-10 10L8 18H0v-8l3.29 3.29 10-10L10 0h8z"></path></clipPath></defs><g clip-path="url(#nlv9fl6eka)" transform="translate(-656 -976)" fill={color ? color : '#374df5'}><g clip-path="url(#7fc9kfma8b)" transform="translate(400 960)"><g clip-path="url(#qw2a2vtfmc)" transform="translate(259 19)"><path fill="primary.default" d="M0 0h18v18H0V0z"></path></g></g></g></svg>
        }
    ]
    const Icon: ReactNode = image.find((icon) => icon.name == iconName)?.icon
    return Icon
}

export default SvgIcons

