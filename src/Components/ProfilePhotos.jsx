import PropTypes from 'prop-types'
import ProfileNavigation from './ProfileNavigation'

const ProfilePhotos = ({ userId, photos }) => {
    const profilePhotos = photos
    const renderPhoto = (photo) => {
        return (
            <div className="w-[19rem] h-[19rem] overflow-hidden aspect-square cursor-pointer">
                <button type="button" onClick={handleClick}>
                    <img
                        src={photo.imageSrc}
                        alt="profile photo"
                        className="w-full object-cover aspect-square"
                    />
                </button>
            </div>
        )
    }

    const handleClick = () => {}

    return profilePhotos ? (
        <div className="flex justify-center">
            <div className="flex flex-col gap-4 border-t pb-4">
                <ProfileNavigation />
                <div className="grid grid-cols-3 gap-7 content-start">
                    {profilePhotos.map((photo) => renderPhoto(photo))}
                </div>
            </div>
        </div>
    ) : null
}

export default ProfilePhotos

ProfilePhotos.propTypes = {
    userId: PropTypes.string,
    photos: PropTypes.array,
}
