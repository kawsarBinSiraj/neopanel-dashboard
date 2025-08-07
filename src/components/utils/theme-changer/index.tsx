'use-client';
import React from 'react';
import { useTheme } from 'next-themes';
import { WiDaySunny } from 'react-icons/wi';
import { HiOutlineMoon } from 'react-icons/hi2';

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <button
                type="button"
                onClick={e => {
                    e.preventDefault();
                    if (theme === 'dark') setTheme('light');
                    else setTheme('dark');
                }}
                className="focus:none flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent p-0 shadow-none outline-none"
            >
                 {theme == 'dark' ? <WiDaySunny size={'1.4rem'} /> : <HiOutlineMoon size={'1.4rem'} />}
            </button>
        </>
    );
};

export default ThemeChanger;
