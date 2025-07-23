'use client';
import React, { useState } from 'react';
import Menu, { MenuItem, SubMenu } from 'rc-menu';
import { FiDownload, FiFolder, FiTool, FiMap, FiEdit, FiDroplet } from 'react-icons/fi';
import { CiHome } from 'react-icons/ci';
import { IoChevronForward, IoChevronDownSharp } from 'react-icons/io5';
import { BsAppIndicator } from 'react-icons/bs';
import sidebarData from './page-sidebar.json';
import Link from 'next/link';
import usePersistedStore from '@/store/usePersistedStore';
import 'rc-menu/assets/index.css';

const iconMap: Record<string, React.ReactElement> = {
    CiHome: <CiHome className="inline-block text-xl" />,
    BsAppIndicator: <BsAppIndicator className="inline-block text-lg" />,
    FiDownload: <FiDownload className="inline-block stroke-[1.5] text-lg" />,
    FiFolder: <FiFolder className="inline-block stroke-[1.5] text-lg" />,
    FiTool: <FiTool className="inline-block stroke-[1.5] text-xl" />,
    FiMap: <FiMap className="inline-block stroke-[1.5] text-lg" />,
    FiEdit: <FiEdit className="inline-block stroke-[1.5] text-lg" />,
    FiDroplet: <FiDroplet className="inline-block stroke-[1.5] text-lg" />,
};

const PageSidebar = () => {
    const [openKeys, setOpenKeys] = useState<string[]>(['getting-started']);
    const { isSidebarExpand }: any = usePersistedStore();

    /**
     * @param {string[]} keys The latest open keys.
     * @description Keep only one open key at a time.
     */
    const handleOpenChange = (keys: string[]) => {
        // Find the latest open key that is not in `openKeys`.
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        // If there is a latest open key, set `openKeys` to it, otherwise set to an empty array.
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    /**
     * Handles the click event for menu items.
     * @param {Object} param - The parameter object.
     * @param {string} param.key - The key of the clicked menu item.
     */
    const handleClick = ({ key }: { key: string }) => {
        // Log the key of the clicked item for debugging purposes.
        console.log('Clicked:', key);
    };

    return (
        <div id="page-sidebar" className={`overflow-x-hidden p-2 pr-0 ${isSidebarExpand ? 'sidebar-expanded' : ''}`}>
            <Link href="/" id="app-logo" className="m-3 mb-2 ml-2 inline-flex items-center gap-0">
                <img id="logo-img" className={`w-[34px]`} src="/assets/logo.png" alt="logo" />
                <span id="slogan" className="text-xl font-bold uppercase">
                    NeoPanel
                </span>
            </Link>
            <Menu
                mode={isSidebarExpand ? 'vertical' : 'inline'}
                onClick={handleClick}
                openKeys={openKeys}
                selectedKeys={[]}
                onOpenChange={handleOpenChange}
                className="w-full !border-none !bg-transparent p-0 text-sm font-bold !shadow-none"
                inlineIndent={10}
                expandIcon={({ isOpen }) => (
                    <span className="expand-icon mr-1 ml-auto inline-block transform transition-transform duration-200">
                        {isOpen ? <IoChevronDownSharp /> : <IoChevronForward />}
                    </span>
                )}
            >
                {sidebarData.map(section =>
                    section.items ? (
                        <SubMenu
                            key={section.key}
                            className="!mb-2"
                            title={
                                <div className="sidebar-menuItem items-center p-0 py-1 text-black">
                                    <span className="inline-block shrink">{iconMap[section.icon]}</span>
                                    <span className="text flex-1">{section.title}</span>
                                </div>
                            }
                        >
                            {section?.items?.map(item => (
                                <MenuItem
                                    key={item.key}
                                    className="sidebar-sub-menuItem !ml-3 !pl-3 flex cursor-pointer items-center rounded-sm text-black hover:!bg-indigo-200"
                                >
                                    <span className="mr-2 inline-block shrink">{iconMap[item.icon]}</span>
                                    <span className="text flex-1">{item.label}</span>
                                </MenuItem>
                            ))}
                        </SubMenu>
                    ) : (
                        <MenuItem
                            key={section.key}
                            className="sidebar-menuItem !mb-2 !pl-2 cursor-pointer items-center rounded-sm p-0 !py-2 !text-black hover:!bg-indigo-200"
                        >
                            <span className="inline-block shrink">{iconMap[section.icon]}</span>
                            <span className="text flex-1">{section.title}</span>
                        </MenuItem>
                    )
                )}
            </Menu>
        </div>
    );
};

export default PageSidebar;
