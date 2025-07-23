'use client';
import React from 'react';
import PageHeader from '@/components/dist/PageHeader';
import PageSidebar from '@/components/dist/PageSidebar';
import usePersistedStore from '@/store/usePersistedStore';

/**
 * A strongly-typed React component that wraps children in a dashboard layout.
 * @param props The component props.
 * @returns A JSX element representing the dashboard layout.
 */

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { isSidebarExpand }: any = usePersistedStore();

    return (
        <>
            <main id="main" className={`${isSidebarExpand ? 'sidebar-expanded' : ''}`}>
                <aside id="sidebar" className="h-screen">
                    <PageSidebar />
                </aside>
                <div id="body-wrapper" className="m-3 mt-0">
                    <header id="header" className="h-[70px] px-10 py-4">
                        <PageHeader />
                    </header>
                    <div
                        id="main-body"
                        className="h-[calc(100vh-85px)] overflow-x-hidden rounded-lg border border-gray-200 bg-white p-4 dark:bg-gray-800"
                    >
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardLayout;
