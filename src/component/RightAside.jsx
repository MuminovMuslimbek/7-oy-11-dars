import React, { useContext } from 'react'
import { ThemeContext } from '../App';
import { NavLink } from 'react-router-dom';
import Moon from '../assets/moon.svg';
import Sun from '../assets/sun.svg';

function RightAside() {
    const { theme, setTheme } = useContext(ThemeContext)
    const isLocalStorege = localStorage.getItem('user') ? true : false

    function handleChangeTheme(e) {
        e.preventDefault();
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div className='dark:border-[#ffffff5e] col-start-5 row-span-5 bg-white dark:bg-black p-5 border-black border-l'>
            <button className="flex justify-end items-center gap-1 hover:opacity-90 mb-4 pr-5 w-full font-medium text-lg transition-opacity" onClick={handleChangeTheme} >
                <img className="w-5 h-5" src={theme === 'light' ? Moon : Sun} alt="Theme Icon" /> {theme === 'light' ? 'Dark Mode' : 'Light Mode'} </button>
            <ul className='flex flex-col items-start gap-2 w-full'>
                {
                    isLocalStorege && <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/users'}>Users</NavLink>
                }
            </ul>
        </div>
    )
}

export default RightAside