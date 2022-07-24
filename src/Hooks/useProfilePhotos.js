import { useState, useEffect } from 'react'
import { getProfilePhotos } from '../Services/firebase'

const useProfilePhotos = (userId) => {
    const [photos, setphotos] = useState(null)

    useEffect(() => {
        const getPhotos = async (userId) => {
            const profilePhotos = await getProfilePhotos(userId)
            profilePhotos.sort((a, b) => b.dateCreated - a.dateCreated)
            setphotos(profilePhotos)
        }
        getPhotos(userId)
    }, [userId])

    return photos
}

export default useProfilePhotos
