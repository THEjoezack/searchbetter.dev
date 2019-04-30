import React from 'react'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems }) => (
  <div className='columns is-multiline'>
    {gridItems.map(item => (
      <div key={item.text} className='column is-6'>
        <div className='has-text-centered'>
          <div
            style={{
              display: 'inline-block'
            }}
          >
            {/* <PreviewCompatibleImage imageInfo={item} /> */}
          </div>
        </div>
        <p>{item.text}</p>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string
    })
  )
}

export default FeatureGrid
