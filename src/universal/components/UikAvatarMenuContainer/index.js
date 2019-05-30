import * as React from 'react'
import classnames from 'classnames'

import cls from './avatar-container.scss'

// @flow
type UikAvatarMenuContainerProps = {
  children?: React.node,
  className?: ?String,
  Component?: React.ElementType,
}

const UikAvatarMenuContainer = ({
  children,
  className,
  Component,
  ...rest
}: UikAvatarMenuContainerProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikAvatarMenuContainer.defaultProps = {
  className: null,
  children: null,
  Component: 'div',
}

export default UikAvatarMenuContainer
