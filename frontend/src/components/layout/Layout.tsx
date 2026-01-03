import React from 'react';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)]">
            {!isAuthPage && <Navbar />}
            <main className={`${!isAuthPage ? 'pt-16' : ''}`}>
                {children}
            </main>
        </div>
    );
};
