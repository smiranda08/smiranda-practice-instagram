import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import * as ROUTES from './Constants/routes'
import AuthContext from './Contexts/AuthContext'

import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NotFound from './Pages/NotFound'
import Profile from './Pages/Profile'
import useAuthListener from './Hooks/useAuthListener'
import useUserListener from './Hooks/useUserListener'
import ProtectedRoute from './Helpers/ProtectedRoute'

import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'

export default function App() {
    const authUser = useAuthListener()
    const { currentUserDoc, setcurrentUserDoc } = useUserListener(authUser)
    const authenticated = authUser == undefined ? false : true
    const [progress, setprogress] = useState(0)

    return (
        <AuthContext.Provider
            value={{ authUser, currentUserDoc, setcurrentUserDoc }}
        >
            <BrowserRouter>
                <LoadingBar
                    color="#f11946"
                    progress={progress}
                    waitingTime={500}
                    onLoaderFinished={() => setprogress(0)}
                    loaderSpeed={700}
                />
                <div>
                    <Routes>
                        <Route
                            path={ROUTES.DASHBOARD}
                            element={
                                <ProtectedRoute
                                    path={ROUTES.DASHBOARD}
                                    authUser={authUser}
                                    authenticated={authenticated}
                                >
                                    <Dashboard setprogress={setprogress} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={ROUTES.LOGIN}
                            element={
                                <ProtectedRoute
                                    path={ROUTES.LOGIN}
                                    authUser={authUser}
                                    authenticated={authenticated}
                                >
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={ROUTES.SIGNUP}
                            element={
                                <ProtectedRoute
                                    path={ROUTES.SIGNUP}
                                    authUser={authUser}
                                    authenticated={authenticated}
                                >
                                    <Signup />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={ROUTES.PROFILE}
                            element={<Profile setprogress={setprogress} />}
                        />
                        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}
