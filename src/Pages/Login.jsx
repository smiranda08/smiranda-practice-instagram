import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import * as ROUTES from '../Constants/routes'

const Login = () => {
    const [emailAddress, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === ''

    let navigate = useNavigate()

    // Handle the login event
    const handleLogin = (event) => {
        event.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(() => {
                navigate(ROUTES.DASHBOARD)
            })
            .catch((error) => {
                setEmail('')
                setPassword('')
                setError(
                    'Invalid login credentials - please check username or password.'
                )
            })
    }

    useEffect(() => {
        document.title = 'Login - Instagram'
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
                    <form onSubmit={handleLogin} method="POST">
                        <input
                            type="text"
                            aria-label="Enter your emailAddress address"
                            placeholder="Email address"
                            className="mt-2 text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={emailAddress}
                        />
                        <input
                            type="password"
                            aria-label="Enter your password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded py-2 font-bold ${
                                isInvalid && 'opacity-90'
                            }`}
                        >
                            Log In
                        </button>
                    </form>
                    <div className="flex justify-center mt-4 items-center flex-col w-full bg-white p-2 border rounded border-gray-primary">
                        <p className="text-bold ">
                            {"Don't have an account? "}
                            <Link
                                to={`../${ROUTES.SIGNUP}`}
                                className="font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

/**
 * To do: add to tailwind config
 * bg-blue-medium
 * text-red-primary
 * text-gray-base
 * border-gray-primary
 */
