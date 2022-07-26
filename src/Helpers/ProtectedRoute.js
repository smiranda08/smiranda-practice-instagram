import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import * as ROUTES from '../Constants/routes'

const ProtectedRoute = ({ path, authenticated, authUser, children }) => {
    console.log(path)
    console.log('authenticated', authenticated)
    console.log('authUser', authUser)

    if (authenticated && path === ROUTES.DASHBOARD) {
        return authUser ? children : <Navigate to={ROUTES.LOGIN} replace />
    }

    if (path === ROUTES.LOGIN || path === ROUTES.SIGNUP) {
        return authUser ? <Navigate to={ROUTES.DASHBOARD} replace /> : children
    }
}

ProtectedRoute.propTypes = {
    path: PropTypes.string,
    authenticated: PropTypes.bool,
    authUser: PropTypes.object,
    children: PropTypes.object,
}
export default ProtectedRoute
