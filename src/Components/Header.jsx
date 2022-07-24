/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import * as ROUTES from '../Constants/routes'
import { signOut } from 'firebase/auth'
import { auth } from '../Lib/firebase'
import { RiMessengerLine } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai'
import { FiPlusSquare } from 'react-icons/fi'
import { MdOutlineExplore } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { AiOutlineHeart } from 'react-icons/ai'

export default function Header() {
    let navigate = useNavigate()
    const signOutUser = async () => {
        await signOut(auth).catch((error) => console.log(error.code))
        console.log('sign out complete')
        navigate(`/${ROUTES.LOGIN}`)
    }

    const { authUser } = useContext(AuthContext)
    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8 top-0 sticky">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full ">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        {/* this first one contains the instagram logo */}
                        <h1 className="flex justify-center w-full">
                            <Link
                                to={ROUTES.DASHBOARD}
                                aria-label="Instagram logo"
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Instagram"
                                    className="mt-2 w-7/12"
                                />
                            </Link>
                        </h1>
                    </div>
                    {/* This next div is for the icons */}
                    <IconContext.Provider value={{ size: '1.8em' }}>
                        <div className="text-gray-700 text-center flex items-center align-items gap-6">
                            {authUser ? (
                                <>
                                    <Link
                                        to={ROUTES.DASHBOARD}
                                        aria-label="Dashboard"
                                        replace
                                    >
                                        <AiFillHome />
                                    </Link>
                                    <RiMessengerLine />
                                    <FiPlusSquare />
                                    <MdOutlineExplore />
                                    <AiOutlineHeart
                                        type="button"
                                        onClick={console.log('clicked!!')}
                                    />

                                    <div className="flex items-center cursor-pointer">
                                        <Link to={`/p/${authUser.displayName}`}>
                                            <img
                                                className="rounded-full h-8 w-8 flex border-gray-50 border"
                                                src={`/images/avatars/${authUser.displayName}.jpg`}
                                                alt={`${authUser.displayName} profile`}
                                            />
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                // Empty fragment for no user
                                <></>
                            )}
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </header>
    )
}
