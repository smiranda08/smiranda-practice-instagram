import Skeleton from 'react-loading-skeleton'
import useTimelinePhotos from '../Hooks/useTimelinePhotos'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

export default function Timeline({ setprogress }) {
    const timelinePhotos = useTimelinePhotos()
    const loading = timelinePhotos !== undefined

    const renderPost = (photo) => {
        return <Post content={photo} />
    }

    useEffect(() => {
        setprogress(loading ? 0 : 100)
    }, [loading])

    return (
        <div className="container col-span-1 ml-16 max-w-[28rem] text-sm">
            {!timelinePhotos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton
                            key={index}
                            count={1}
                            height={320}
                            width={400}
                            className="mb-2"
                        />
                    ))}
                </>
            ) : timelinePhotos?.length > 0 ? (
                timelinePhotos.map((photo) => renderPost(photo))
            ) : (
                <h3>Follow more people to see their posts!</h3>
            )}
        </div>
    )
}

Timeline.propTypes = {
    setprogress: PropTypes.func,
}
