import React from 'react';
import { Nav } from '../components/global/nav';
import SEO from '../components/global/seo';

interface IMainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function Main({ children, title }: IMainLayoutProps) {
    return (
        <>
            <SEO title={title} />

            <Nav />

            <main className="main">
                <div className="main__container">{children}</div>
            </main>
        </>
    );
}
