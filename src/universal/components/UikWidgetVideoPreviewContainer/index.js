import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './widget-video-preview-container.scss'

const UikWidgetVideoPreviewContainer = ({
  className,
  Component = 'div',
  children,
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikWidgetVideoPreviewContainer.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.any, // eslint-disable-line
  children: PropTypes.node,
}

UikWidgetVideoPreviewContainer.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikWidgetVideoPreviewContainer
