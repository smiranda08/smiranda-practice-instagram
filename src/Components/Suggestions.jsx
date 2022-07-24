import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../Services/firebase'
import SuggestedProfile from './SuggestedProfile'

export default function Suggestions({ userId, following }) {
    const [profiles, setprofiles] = useState(null)

    useEffect(() => {
        async function getSuggestions(userId, following) {
            const suggestedProfiles = await getSuggestedProfiles(
                userId,
                following
            )
            setprofiles(suggestedProfiles)
        }
        if (userId) {
            getSuggestions(userId, following)
        }
    }, [userId])

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-semibold text-gray-400">
                    Suggestions For You
                </p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docID}
                        suggestedProfile={profile}
                    />
                ))}
            </div>
        </div>
    ) : null
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    currentUserDocRef: PropTypes.string,
}
