import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const VideoGrid = ({ gridItems }) => (
  <div className='columns is-multiline'>
    {gridItems.map(item => (
      <div key={item.videoId} className='column is-6'>
        <div className='has-text-centered'>
          <a href={`https://www.youtube.com/watch?v=${item.videoId}`}>
            <PreviewCompatibleImage imageInfo={item} />
          </a>
        </div>
        <a href={`https://www.youtube.com/watch?v=${item.videoId}`}>
          {item.title}
        </a>
      </div>
    ))}
  </div>
)

VideoGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      videoId: PropTypes.string,
      title: PropTypes.string
    })
  )
}

export default VideoGrid
