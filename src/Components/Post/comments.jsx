import PropTypes from 'prop-types'
import { useState } from 'react'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

const Comments = ({ docID, comments: allComments, posted, commentInput }) => {
    const [comments, setcomments] = useState(allComments)

    return (
        <>
            <div className="px-4 mt-1 mb-1">
                {comments.length >= 1 && (
                    <p className="text-gray-500 cursor-pointer">
                        View all {comments.length} comments
                    </p>
                )}
                <div className="mt-1 text-gray-600">
                    {comments.slice(0, 3).map((item) => (
                        <p
                            key={`${item.comment} - ${item.displayName}`}
                            className="flex justify-start"
                        >
                            <Link to={`/p/${item.displayName}`}>
                                <span className="font-bold mr-1">
                                    {item.displayName}
                                </span>
                            </Link>
                            <span>{item.comment}</span>
                        </p>
                    ))}
                </div>

                <p className="text-gray-500 uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            <AddComment
                setcomments={setcomments}
                comments={comments}
                docID={docID}
                commentInput={commentInput}
            />
        </>
    )
}
export default Comments

Comments.propTypes = {
    docID: PropTypes.string,
    comments: PropTypes.array,
    posted: PropTypes.number,
    commentInput: PropTypes.object,
}
