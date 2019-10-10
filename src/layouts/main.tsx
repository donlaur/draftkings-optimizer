import React from 'react';
import { Aside } from '../components/global/aside-nav';

import 'normalize.css';
import 'bootstrap/scss/bootstrap-grid.scss';
import '../styles/styles.scss';
import SEO from '../components/global/seo';

export function Main({ children }) {
    return (
        <>
            <SEO />
            <Aside/>

            <main>
                {children}
            </main>
        </>
    )
}