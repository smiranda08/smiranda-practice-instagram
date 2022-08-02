import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { followUserBackwards, followUserForwards } from '../Services/firebase'
import AuthContext from '../Contexts/AuthContext'

export default function SuggestedProfile({ suggestedProfile }) {
    const [followed, setFollowed] = useState(false)
    const { currentUserDoc } = useContext(AuthContext)

    async function handleFollow() {
        setFollowed(true)
        const targetID = suggestedProfile.userId
        const sourceID = currentUserDoc.userId
        await followUserForwards(targetID, currentUserDoc.docID)
        await followUserBackwards(sourceID, suggestedProfile.docID)
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    src={`/images/avatars/${suggestedProfile.username}.jpg`}
                    alt=""
                    className="rounded-full w-8 h-8 flex mr-3"
                />
                <Link to={`/p/${suggestedProfile.username}`}>
                    <p className="font-medium text-sm">
                        {suggestedProfile.username}
                    </p>
                </Link>
            </div>
            <button
                className="text-xs font-semibold text-blue-medium"
                type="button"
                onClick={handleFollow}
            >
                Follow
            </button>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
    suggestedProfile: PropTypes.object,
}
