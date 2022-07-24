import PropTypes from 'prop-types'

const Footer = ({ caption, username }) => {
    return (
        <div className="p-4 pt-2 pb-0 font-sans">
            <span className="mr-1 font-semibold hover:underline cursor-pointer">
                {username}
            </span>
            <span>{caption}</span>
        </div>
    )
}

export default Footer

Footer.propTypes = {
    caption: PropTypes.string,
    username: PropTypes.string,
}
