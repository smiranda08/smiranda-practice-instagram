import { useState, useEffect } from 'react'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { db } from '../Lib/firebase'

export default function useUserListener(authUser) {
    const [currentUserDoc, setcurrentUserDoc] = useState({})

    useEffect(() => {
        async function getUserProfileInfo() {
            const q = query(
                collection(db, 'users'),
                where('userId', '==', authUser.uid)
            )
            const querySnapshot = await getDocs(q)
            const thisDoc = querySnapshot.docs[0]
            setcurrentUserDoc({ ...thisDoc.data(), docID: thisDoc.id })
        }
        if (authUser) {
            getUserProfileInfo()
        }
    }, [authUser])

    return { currentUserDoc, setcurrentUserDoc }
}
