import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function LeftAside() {
    const navigate = useNavigate()

    const isLocalStorage = localStorage.getItem('user') ? true : false;

    function handleLogOut() {
        const isLogOut = confirm('Rostdan ham chiqib ketmoqchimisiz??')
        if (isLogOut) {
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    return (
        <div className='flex flex-col gap-1 dark:border-[#ffffff5e] row-span-5 bg-white dark:bg-black p-5 border-r border-black'>
            <Link to={'/'}><img src={Logo} className='w-[90px]' alt="logo" /></Link>
            <div className='flex flex-col justify-between h-full'>
                <ul className='flex flex-col items-start gap-2'>
                    <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/'}>Home</NavLink>
                    <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/article-list'}>Article List</NavLink>
                    {
                        isLocalStorage &&
                        <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/create-article'}>Create Article</NavLink>
                    }
                </ul>
                <ul className='flex flex-col items-start gap-2 w-full'>
                    {
                        isLocalStorage ?
                            <button onClick={handleLogOut} className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]'>Log Out</button>
                            :
                            <>
                                <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/login'}>Login</NavLink>
                                <NavLink className='dark:hover:bg-[#121212] hover:bg-[#dcdcdc] px-4 py-2 rounded-[20px] font-normal text-[25px] transition-[0.3s]' to={'/register'}>Register</NavLink>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
}

export default LeftAside;
