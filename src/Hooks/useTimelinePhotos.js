import { useState, useEffect, useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import { getPhotos } from '../Services/firebase'

const useTimelinePhotos = () => {
    const [photos, setphotos] = useState(undefined)
    const { currentUserDoc } = useContext(AuthContext)
    const currentUserID = currentUserDoc.userId

    useEffect(() => {
        const getTimelinePhotos = async () => {
            const followingUIDs = currentUserDoc.following
            let timelinePhotos = []

            if (followingUIDs.length > 0) {
                timelinePhotos = await getPhotos(followingUIDs, currentUserID)
            }

            timelinePhotos.sort((a, b) => b.dateCreated - a.dateCreated)
            setphotos(timelinePhotos)
        }

        getTimelinePhotos()
    }, [currentUserDoc])

    return photos
}

export default useTimelinePhotos
