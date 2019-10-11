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

            <main>
				<div className="container">
                	{children}
				</div>
            </main>
        </>
    )
}