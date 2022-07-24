import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ({ username }) => {
    return (
        <div className="container justify-between items-center flex border-b border-gray-primary h-4 p-4 py-6">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile picture`}
                        className="rounded-full h-8 w-8 flex mr-3"
                    />
                    <p className="font-semibold text-sm">{username}</p>
                </Link>
            </div>
            <div className="cursor-pointer select-none p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLineCap="round"
                        strokeLineJoin="round"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Header

Header.propTypes = {
    username: PropTypes.string,
}
