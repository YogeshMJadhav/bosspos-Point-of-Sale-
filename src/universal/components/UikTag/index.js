import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './tag.scss'

const UikTag = ({
  children,
  className,
  color,
  name,
  Component = 'span',
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [color]: color,
    }) }
    { ...rest }
  >
    {children}
  </Component>
)

UikTag.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.any, // eslint-disable-line
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
}

UikTag.defaultProps = {
  className: null,
  Component: 'span',
  color: null,
  name: null,
}

export default UikTag
