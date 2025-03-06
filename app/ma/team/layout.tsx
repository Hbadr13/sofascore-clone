'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Layout = ({ children, params }: { children: React.ReactNode, params: { username: string } }) => {
    params.username = 'hamza badr'
    const [username, setusername] = useState('hamza')
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout
