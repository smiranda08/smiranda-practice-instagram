import PropTypes from 'prop-types'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import { followUserForwards } from '../Services/firebase'
import { TbDots } from 'react-icons/tb'

const Display = ({ userData, totalPhotos }) => {
    return (
        <div className="flex justify-center pt-6 pb-10">
            <div className="flex justify-start">
                <LargeAvatar username={userData.username} />
                <DisplayContent userData={userData} totalPhotos={totalPhotos} />
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
                className=" border rounded-full w-48 h-48 object-cover aspect-square"
                alt="profile picture avatar"
            ></img>
        </div>
    )
}
LargeAvatar.propTypes = {
    username: PropTypes.string,
}

const DisplayContent = ({ userData, totalPhotos }) => {
    const { username, following, followers } = userData

    return (
        <div className="flex flex-col">
            <div className="flex justify-start gap-2 pb-6">
                <h2 className="font-light text-3xl">{username}</h2>
                <button className="ml-6 pl-2 pr-2 border border-gray-300 rounded font-semibold text-gray-600">
                    Message
                </button>
                <FollowButton followers={followers} />
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
                        <p className="font-semibold">{following.length}</p>
                        <p>following</p>
                    </div>
                </button>
            </div>

            <div className="mt-4 text-lg">
                <p className="font-semibold text-gray-800 whitespace-normal">
                    {userData.fullName}
                </p>
                <p className="text-gray-400">Musician</p>
                <p className="">Insert biography here</p>
            </div>
        </div>
    )
}
DisplayContent.propTypes = {
    userData: PropTypes.object,
    totalPhotos: PropTypes.number,
}

const FollowButton = ({ followers }) => {
    const { currentUserDoc } = useContext(AuthContext)
    const isFollowing = followers.includes(currentUserDoc.userID)

    return isFollowing ? (
        <p>SVG BUTTON</p>
    ) : (
        <button
            type="button"
            className="bg-blue-medium font-semibold text-white rounded-md pl-8 pr-8"
        >
            Follow
        </button>
    )
}
FollowButton.propTypes = {
    followers: PropTypes.array,
}

export default Display
