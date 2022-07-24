import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import PropTypes from 'prop-types'

export default function User({ username, fullName }) {
    return !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link
            to={`/p/${username}`}
            className="grid grid-cols-4 gap-4 mb-6 items-center"
        >
            <div className="flex items-center cursor-pointer">
                <Link to={`/p/${username}`}>
                    <MediumAvatar username={username} />
                </Link>
            </div>
            <div className="col-span-3">
                <p className="font-semibold text-sm">{username}</p>
                <p className="text-gray-400">{fullName}</p>
            </div>
        </Link>
    )
}

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string,
}

const MediumAvatar = ({ username }) => {
    return (
        <img
            className="rounded-full h-16 w-16 flex border-gray-200 border"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
        />
    )
}

MediumAvatar.propTypes = {
    username: PropTypes.string,
}
