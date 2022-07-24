import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import AuthContext from '../../Contexts/AuthContext'
import { addCommentFirebase } from '../../Services/firebase'

const AddComment = ({ setcomments, comments, docID, commentInput }) => {
    const [inputText, setinputText] = useState(null)
    const { currentUserDoc } = useContext(AuthContext)

    const handleSubmitComment = async (event) => {
        event.preventDefault()
        setcomments([
            {
                comment: inputText,
                displayName: currentUserDoc.username,
            },
            ...comments,
        ])
        await addCommentFirebase(docID, inputText, currentUserDoc.username)
        setinputText('')
    }

    return (
        <form
            method="POST"
            className="flex items-center justify-between p-4 border-t mt-4"
            onSubmit={(event) =>
                inputText.length > 0 ? handleSubmitComment(event) : null
            }
        >
            <input
                type="text"
                placeholder="Add a comment..."
                onChange={(event) => setinputText(event.target.value)}
                className="grow outline-none"
                value={inputText}
                aria-label="Add a comment"
                autoComplete="off"
                name="add-comment"
                ref={commentInput}
            />
            <button
                type="submit"
                className={`text-blue-500 font-semibold ${
                    !inputText ? 'text-opacity-40' : 'text-opacity-100'
                } `}
            >
                Post
            </button>
        </form>
    )
}

export default AddComment

AddComment.propTypes = {
    setcomments: PropTypes.func,
    comments: PropTypes.array,
    docID: PropTypes.string,
    commentInput: PropTypes.object,
}
