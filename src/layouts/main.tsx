import React from 'react';
import { Nav } from '../components/global/nav';

import 'normalize.css';
import 'bootstrap/scss/bootstrap-grid.scss';
import '../styles/styles.scss';
import SEO from '../components/global/seo';

export function Main({ children }) {
    return (
        <>
            <SEO />
            <Nav/>

            <main className="main">
                {/* <div className="main__header">
                     <h2>Optimize</h2>
                </div> */}
				{/* <div className="main__container container"> */}
                	{children}
				{/* </div> */}
            </main>
        </>
    )
}