import { useState, useEffect } from 'react'
import { Skeleton } from 'react-loading-skeleton'
import { getUserByUsername } from '../Services/firebase'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'
import PropTypes from 'prop-types'
import Display from '../Components/Display'
import ProfilePhotos from '../Components/ProfilePhotos'
import useProfilePhotos from '../Hooks/useProfilePhotos'
const Profile = ({ setprogress }) => {
    const { username } = useParams()
    const [userData, setuserData] = useState(undefined)
    const loading = userData === undefined
    const userExists = userData ? true : false
    document.body.style.zoom = '90%'

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserByUsername(username)
            if (user) {
                setuserData(user)
            } else {
                setuserData(null)
            }
        }
        getUser()
    }, [username])

    useEffect(() => {
        setprogress(loading ? 0 : 100)
    }, [loading])

    return loading ? null : userExists ? (
        <ProfilePage userData={userData} />
    ) : (
        <h1>This profile does not exist</h1>
    )
}

Profile.propTypes = {
    setprogress: PropTypes.func,
}

const ProfilePage = ({ userData }) => {
    const photos = useProfilePhotos(userData.userId)
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="flex flex-col ">
                <Display userData={userData} totalPhotos={photos?.length} />
                <ProfilePhotos photos={photos} />
            </div>
        </div>
    )
}

export default Profile

ProfilePage.propTypes = {
    userData: PropTypes.object,
}
