import React from 'react';
import { Nav } from '../components/global/nav';
// import SEO from '../components/global/seo';

export function Main({ children }) {
	return (
		<>
			<Nav/>

			<main className="main">
				<div className="main__container">
					{children}
				</div>
			</main>
		</>
	)
}