import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './widget-video-preview.scss'

const UikWidgetVideoPreview = ({
  className,
  Component = 'a',
  title,
  imgUrl,
  views,
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <div
      className={ cls.previewImage }
      style={ {
        backgroundImage: `url(${imgUrl})`,
      } }
    />
    <div className={ cls.meta }>
      <h4 className={ cls.title }>
        {title}
      </h4>
      <span className={ cls.views }>
        Views:
        {' '}
        {views}
      </span>

    </div>
  </Component>
)

UikWidgetVideoPreview.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.any, // eslint-disable-line
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  views: PropTypes.number,
}

UikWidgetVideoPreview.defaultProps = {
  className: null,
  Component: 'a',
  views: 0,
}

export default UikWidgetVideoPreview
