import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    updateDisplayName,
} from 'firebase/auth'
import { doesUsernameExist } from '../Services/firebase'
import * as ROUTES from '../Constants/routes'
import { addUser } from '../Lib/firebase'

const Signup = () => {
    const [emailAddress, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [username, setUserName] = useState('')
    const [fullName, setFullName] = useState('')

    const [error, setError] = useState('')
    const isInvalid =
        password === '' ||
        emailAddress === '' ||
        checkPassword === '' ||
        username === '' ||
        fullName === ''

    let navigate = useNavigate()

    // Handle the signup event
    const handleSignup = async (event) => {
        event.preventDefault()
        const auth = getAuth()

        const userExists = await doesUsernameExist(username)
        if (userExists) {
            setError('Username already taken.')
            setUserName('')
        } else if (password != checkPassword) {
            setError('Passwords do not match! Please try again.')
            setPassword('')
            setCheckPassword('')
        } else {
            // console.log('username', username)
            // console.log('email', emailAddress)
            // console.log('fullname', fullName)
            createUserWithEmailAndPassword(auth, emailAddress, password)
                .then(async (userCredential) => {
                    const user = userCredential.user
                    await updateProfile(user, { displayName: username })
                    // create a new user document in the firestore
                    addUser({
                        userId: user.uid,
                        fullName: fullName,
                        username: username.toLowerCase(),
                        emailAddress: emailAddress.toLowerCase(),
                        followers: [],
                        following: [],
                        dateCreated: Date.now(),
                    })
                    navigate(ROUTES.DASHBOARD)
                })
                .catch((error) => {
                    if (error.code == 'auth/weak-password') {
                        setError('Password should be at least 6 characters')
                        setPassword('')
                        setCheckPassword('')
                    } else if (error.code == 'auth/email-already-in-use') {
                        setError('This email address has already been taken!')
                        setEmail('')
                    }
                })
        }
    }

    useEffect(() => {
        document.title = 'Signup - Instagram'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen backgroun">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone photo" />
            </div>
            <div className="flex flex-col w-2/5">
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="Instagram" />
                </h1>
                {error && (
                    <p className=" w-full justify text-xs text-red-500">
                        {error}
                    </p>
                )}
                <div className="mb-4">
                    <form
                        onSubmit={handleSignup}
                        method="POST"
                        className="mt-2"
                    >
                        <input
                            type="text"
                            aria-label="Enter your full name"
                            placeholder="Full name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            type="text"
                            aria-label="Enter your email address"
                            placeholder="Email address"
                            className=" text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={emailAddress}
                        />
                        <input
                            type="text"
                            aria-label="New username"
                            placeholder="New username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUserName(target.value)}
                            value={username}
                        />
                        <input
                            type="password"
                            aria-label="Enter your password"
                            placeholder="New password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <input
                            type="password"
                            aria-label="Re-enter password"
                            placeholder="Re-enter password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) =>
                                setCheckPassword(target.value)
                            }
                            value={checkPassword}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded py-2 font-bold ${
                                isInvalid && 'opacity-90'
                            }`}
                        >
                            Sign up!
                        </button>
                    </form>
                    <div className="flex justify-center mt-4 items-center flex-col w-full bg-white p-2 border rounded border-gray-primary">
                        <p className="text-bold ">
                            {'Already have an account? '}
                            <Link
                                to={`../${ROUTES.LOGIN}`}
                                className="font-semibold"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

/**
 * To do: add to tailwind config
 * bg-blue-medium
 * text-red-primary
 * text-gray-base
 * border-gray-primary
 */
