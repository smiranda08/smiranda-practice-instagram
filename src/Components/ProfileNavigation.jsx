import { useState } from 'react'
import { GrGrid } from 'react-icons/gr'
import { RiVideoLine } from 'react-icons/ri'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsPersonLinesFill } from 'react-icons/bs'
import { IconContext } from 'react-icons'

const ProfileNavigation = () => {
    const [curr, setcurr] = useState('POSTS')
    const navMap = [
        {
            page: 'POSTS',
            icon: <GrGrid />,
        },
        {
            page: 'REELS',
            icon: <MdOutlineVideoLibrary />,
        },
        {
            page: 'VIDEOS',
            icon: <RiVideoLine />,
        },
        {
            page: 'TAGGED',
            icon: <BsPersonLinesFill />,
        },
    ]

    return (
        <div className="flex justify-center">
            <nav aria-label="profile navigation bar">
                <IconContext.Provider value={{ size: '0.75em' }}>
                    <ul className="flex list-none gap-4 font-medium text-md text-gray-800 space-x-16">
                        {navMap.map((entry, i) => (
                            <button
                                onClick={() => setcurr(entry.page)}
                                className={`pt-2 px-2 hover:opacity-100 ${
                                    curr === entry.page &&
                                    'border-t border-t-zinc-900'
                                } ${!(curr === entry.page) && 'opacity-50'}`}
                                key={i}
                            >
                                <div className="flex gap-2 items-center">
                                    {entry.icon}
                                    {entry.page}
                                </div>
                            </button>
                        ))}
                    </ul>
                </IconContext.Provider>
            </nav>
        </div>
    )
}

export default ProfileNavigation
