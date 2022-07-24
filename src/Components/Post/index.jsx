import { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comments'
import AddComment from './AddComment'

const Post = ({ content }) => {
    /**
     * Structure: Header, Image, Actions (Like & Comment), Footer, Comments
     */

    const commentInput = useRef(null)
    const handleFocus = () => {
        commentInput.current.focus()
    }

    return (
        <div className="rounded-lg col-span-4 border bg-white border-gray-primary mb-4">
            <Header username={content.uploader} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions
                docID={content.docID}
                totalLikes={content.likes.length}
                isLiked={content.liked}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.uploader} />
            <Comments
                docID={content.docID}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    )
}

// so each post is responsible for maintaining the state of its comments
// each post keeps track of the comments on it....

export default Post

Post.propTypes = {
    content: PropTypes.shape({
        uploader: PropTypes.string,
        imageSrc: PropTypes.string,
        caption: PropTypes.string,
        docID: PropTypes.string,
        liked: PropTypes.bool,
        likes: PropTypes.array,
        comments: PropTypes.array,
        dateCreated: PropTypes.number,
    }),
}
