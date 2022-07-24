import PropTypes from 'prop-types'

const Image = ({ src, caption }) => {
    // console.log(src, caption)
    return (
        <div className="max-h-[36rem] flex flex-col">
            <img
                src={src}
                alt={caption}
                className="w-full object-cover min-h-0 aspect-[4/5]"
            />
        </div>
    )
}
export default Image

Image.propTypes = {
    src: PropTypes.string,
    caption: PropTypes.string,
}
