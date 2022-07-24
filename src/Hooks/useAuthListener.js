import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebase } from '../Lib/firebase'
import { getAuth } from 'firebase/auth'

export default function useAuthListener() {
    const [authUser, setauthUser] = useState(undefined)
    useEffect(() => {
        const auth = getAuth(firebase)
        const listener = onAuthStateChanged(auth, (user) => {
            if (user) {
                // an authUser is logged in
                console.log('authUser signed in', user.uid)
                setauthUser(user)
            } else {
                // the authUser was signed out
                console.log('authUser signed out', user)
                setauthUser(null)
            }
        })

        return () => listener()
    }, [firebase])
    return authUser
}
