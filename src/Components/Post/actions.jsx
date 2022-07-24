import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../Contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Actions = ({ docID, totalLikes, isLiked, handleFocus }) => {
    const { currentUserDoc } = useContext(AuthContext)
    const currentUID = currentUserDoc.docID
    const [toggleLiked, settoggleLiked] = useState(false)
    const [likes, setLikes] = useState(totalLikes)

    const handleLiked = async () => {
        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
        settoggleLiked((toggleLiked) => !toggleLiked)
        // next line is a firebase service call to toggle the like
        await toggleLiked(docID, currentUID)
    }

    return (
        <>
            <div className="flex justify-between py-1 px-4">
                <div className="flex cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-8 outline-none mr-4 select-none cursor-pointer  ${
                            toggleLiked
                                ? 'fill-red text-red-primary opacity-100'
                                : 'text-black-light hover:opacity-50 '
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        onClick={handleLiked}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 select-none cursor-pointer hover:opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={handleFocus}
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
            </div>
            <div className="px-4">
                <p className="font-semibold">
                    {likes === 1 ? `${likes} like` : `${likes} likes`}
                </p>
            </div>
        </>
    )
}

export default Actions

Actions.propTypes = {
    docID: PropTypes.string,
    totalLikes: PropTypes.number,
    isLiked: PropTypes.bool,
    handleFocus: PropTypes.func,
}
