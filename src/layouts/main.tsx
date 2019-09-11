import React from 'react';
import { Aside } from '../components/global/aside-nav';

import 'normalize.css';
import '../styles/styles.scss';

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