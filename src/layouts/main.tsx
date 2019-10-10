import React from 'react';
import { Aside } from '../components/global/aside-nav';

import 'normalize.css';
import 'bootstrap/scss/bootstrap-grid.scss';
import '../styles/styles.scss';

export function Main({ children }) {
    return (
        <>
            <Aside/>

            <main>
                {children}
            </main>
        </>
    )
}