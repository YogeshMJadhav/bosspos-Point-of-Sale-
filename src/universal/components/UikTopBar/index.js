import * as React from 'react'
import classnames from 'classnames'

import cls from './top-bar.scss'

// @flow
type UikHeaderProps = {
  center?: Boolean,
  className?: ?String,
  children?: React.node
}

const Header = ({
  children,
  className,
  center,
  ...rest
}: UikHeaderProps) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [cls.center]: center,
    }) }
    { ...rest }
  >
    {children}
  </div>
)

Header.defaultProps = {
  className: null,
  children: null,
  center: false,
}

export default Header
