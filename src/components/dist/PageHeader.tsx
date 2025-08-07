'use client';
import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { BsLayoutSidebar } from 'react-icons/bs';
import ThemeChanger from '@/components/utils/theme-changer';
import usePersistedStore from '@/store/usePersistedStore';
import { CiSearch } from 'react-icons/ci';
import { deleteSession } from '@/helper/auth';
import { useRouter } from 'next/navigation';

/**
 * A component that renders the header of the page with a dropdown menu that
 * shows the user's profile and account settings.
 *
 * @returns {JSX.Element} The page header component.
 */
const PageHeader = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { isSidebarExpand, setSidebarExpand }: any = usePersistedStore();

    /**
     * A function that logs out the user from the application.
     * This function will be replaced with the actual logout functionality.
     */
    const logout = async () => {
        // Implement logout functionality here
        await deleteSession();
        console.log('User logged out');
        router.push('/signin'); // Redirect to the signin page after logout
    };

    return (
        <div id="page-header">
            <div className="flex items-center gap-5">
                <button
                    type="button"
                    onClick={() => setSidebarExpand(!isSidebarExpand)}
                    className="focus:none flex cursor-pointer items-center gap-2 bg-transparent p-0 shadow-none outline-none"
                >
                    <BsLayoutSidebar
                        size={'1.4rem'}
                        style={{ transform: isSidebarExpand ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                </button>
                <div id="global-search" className="relative ml-auto w-full max-w-[500px]">
                    <CiSearch size={'25px'} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                    <input
                        type="search"
                        id="global-search"
                        name="global-search"
                        placeholder="Search..."
                        className="w-full rounded-sm border border-gray-200 bg-white px-5 py-2 pl-12 shadow-none outline-0 transition duration-300 ease-in-out focus:border-indigo-600"
                    />
                </div>
                <div className="ml-auto flex-col">
                    <div className="flex items-center gap-4">
                        <ThemeChanger />
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="focus:none flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 shadow-none outline-none"
                                >
                                    <img src="https://github.com/shadcn.png" alt="" className="h-9 w-9 rounded-full" />
                                    <span className="user-name font-bold">John Doe</span>
                                    <span className="caret font-bold">
                                        {open ? <GoChevronUp size={'18px'} /> : <GoChevronDown size={'18px'} />}
                                    </span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 shadow-xs" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        My Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Account Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer !text-red-600" onClick={logout}>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
