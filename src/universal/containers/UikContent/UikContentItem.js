import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './content.scss'

const UikContentItem = ({
  className,
  children,
  Component,
  ...rest
}) => (
  <Component
    className={ classnames(cls.item, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikContentItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  Component: PropTypes.any // eslint-disable-line
}

UikContentItem.defaultProps = {
  className: null,
  Component: 'div',
}

export default UikContentItem
