import { useEffect } from 'react'
import Timeline from '../Components/Timeline'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import PropTypes from 'prop-types'

export default function Dashboard({ setprogress }) {
    useEffect(() => {
        document.title = 'Instagram'
    }, [])
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-2 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline setprogress={setprogress} />
                <Sidebar />
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    setprogress: PropTypes.func,
}
