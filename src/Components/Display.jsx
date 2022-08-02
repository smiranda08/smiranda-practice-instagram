import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import AuthContext from '../Contexts/AuthContext'
import {
    followUserForwards,
    followUserBackwards,
    unfollowBackwards,
    unfollowForwards,
} from '../Services/firebase'
import { TbDots } from 'react-icons/tb'
import { BsCheck2 } from 'react-icons/bs'

const Display = ({ userData, totalPhotos }) => {
    const { currentUserDoc } = useContext(AuthContext)

    return (
        <div className="flex justify-center pt-6 pb-10">
            <div className="flex justify-start">
                <LargeAvatar username={userData.username} />
                <DisplayContent
                    userData={userData}
                    totalPhotos={totalPhotos}
                    currentUserDoc={currentUserDoc}
                />
            </div>
        </div>
    )
}

Display.propTypes = {
    userData: PropTypes.object,
    totalPhotos: PropTypes.number,
}

const LargeAvatar = ({ username }) => {
    return (
        <div className="flex mr-20 aspect-square items-center">
            <img
                src={`/images/avatars/${username}.jpg`}
                className="border rounded-full w-48 h-48 object-cover aspect-square"
                alt="profile picture avatar"
            ></img>
        </div>
    )
}

LargeAvatar.propTypes = {
    username: PropTypes.string,
}

const DisplayContent = ({ userData, totalPhotos, currentUserDoc }) => {
    const { username, following, followers } = userData
    const [isFollowing, setisFollowing] = useState(
        followers.includes(currentUserDoc.userId)
    )
    const [totalFollowing, settotalFollowing] = useState(following?.length)

    const handleFollow = () => {
        followUserForwards(userData.userId, currentUserDoc.docID)
        followUserBackwards(currentUserDoc.userId, userData.docID)
        setisFollowing((value) => !value)
        settotalFollowing((value) => value + 1)
    }

    const handleUnfollow = () => {
        unfollowForwards(userData.userId, currentUserDoc.docID)
        unfollowBackwards(currentUserDoc.userId, userData.docID)
        setisFollowing((value) => !value)
        settotalFollowing((value) => value - 1)
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-start gap-2 pb-6">
                <h2 className="font-light text-3xl">{username}</h2>
                <button className="ml-6 pl-2 pr-2 border border-gray-300 rounded font-medium outline-none">
                    Message
                </button>
                <FollowButton
                    isFollowing={isFollowing}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    userData={userData}
                    currentUserDoc={currentUserDoc}
                />
                <button>
                    <TbDots size="1.50em" />
                </button>
            </div>
            <div className="flex justify-start">
                <div className="flex justify-start text-lg gap-1 mr-10">
                    <p className="font-semibold">{totalPhotos}</p>
                    <p>posts</p>
                </div>
                <button type="button">
                    <div className="flex justify-start text-lg gap-1 mr-10">
                        <p className="font-semibold">{followers.length}</p>
                        {followers.length !== 1 ? (
                            <p>followers</p>
                        ) : (
                            <p>follower</p>
                        )}
                    </div>
                </button>
                <button type="button">
                    <div className="flex justify-start text-lg gap-1 mr-10">
                        <p className="font-semibold">{totalFollowing}</p>
                        <p>following</p>
                    </div>
                </button>
            </div>

            <div className="mt-4 text-lg">
                <p className="font-semibold text-gray-800 whitespace-normal">
                    {userData.fullName}
                </p>
                <p className="text-gray-400">Profile title here</p>
                <p className="">Profile biography here</p>
            </div>
        </div>
    )
}

DisplayContent.propTypes = {
    userData: PropTypes.object,
    totalPhotos: PropTypes.number,
    currentUserDoc: PropTypes.object,
}

const FollowButton = ({
    isFollowing,
    userData,
    currentUserDoc,
    handleFollow,
    handleUnfollow,
}) => {
    return isFollowing ? (
        <button
            type="button"
            onClick={handleUnfollow}
            className="bg-none border font-medium text-gray-900 rounded-md pl-8 pr-8"
        >
            <div className="flex items-center">
                {`Followed `}
                <BsCheck2 className="ml-2" size={'1.4em'} />
            </div>
        </button>
    ) : (
        <button
            type="button"
            className="bg-blue-medium font-medium text-white rounded-md pl-8 pr-8"
            onClick={handleFollow}
        >
            Follow
        </button>
    )
}

FollowButton.propTypes = {
    isFollowing: PropTypes.bool,
    userData: PropTypes.object,
    currentUserDoc: PropTypes.object,
    handleFollow: PropTypes.func,
    handleUnfollow: PropTypes.func,
}

export default Display
