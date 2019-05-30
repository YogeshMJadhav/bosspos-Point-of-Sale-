import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-title.scss'

// @flow
type UikNavTitleProps = {
  children?: React.node,
  className?: ?String
}

const UikNavTitle = ({
  children,
  className,
  ...rest
}: UikNavTitleProps) => (
  <span
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </span>
)

UikNavTitle.defaultProps = {
  className: null,
  children: null,
}

export default UikNavTitle
