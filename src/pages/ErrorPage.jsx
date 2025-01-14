import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className='flex flex-col items-center gap-10 mx-auto w-full max-w-[310px] text-center'>
            <p>Hmm...this page doesn’t exist. Try searching for something else.</p>
            <Link className='underline' to={'/'}>Go Back</Link>
        </div>
    )
}

export default React.memo(ErrorPage)