import { useContext } from 'react'
import UserDocContext from '../Contexts/UserDocContext'
import User from './User'
import Suggestions from './Suggestions'
import AuthContext from '../Contexts/AuthContext'

// TODO: Sidebar does not automatically update on logout/new sign in change

export default function Sidebar() {
    const { currentUserDoc } = useContext(AuthContext)
    return (
        <div className="ml-24 w-80 mt-2">
            <User
                username={currentUserDoc.username}
                fullName={currentUserDoc.fullName}
            />
            <Suggestions
                following={currentUserDoc.following}
                userId={currentUserDoc.userId}
            />
        </div>
    )
}
