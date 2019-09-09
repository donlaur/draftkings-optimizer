import React from 'react';

import { Aside } from '../components/global/aside-nav';

export function Main({ children }) {
    return (
        <>
            <Aside/>

            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}