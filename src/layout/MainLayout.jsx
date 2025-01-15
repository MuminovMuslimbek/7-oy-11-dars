import React from 'react'
import LeftAside from '../components/LeftAside'
import RightAside from '../components/RightAside'

function MainLayout({ children }) {
    return (
        <div className='grid grid-cols-5 grid-rows-5 h-screen text-black dark:text-white transition-[0.3s] select-none'>
            <LeftAside />
            <main className="scrollbar-hidden col-span-3 row-span-5 bg-white dark:bg-black px-5 py-10 max-h-screen overflow-x-hidden overflow-y-auto">
                {children}
            </main>
            <RightAside />
        </div>
    )
}

export default React.memo(MainLayout)