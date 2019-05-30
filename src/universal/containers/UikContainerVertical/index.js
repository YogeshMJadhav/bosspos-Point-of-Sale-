import * as React from 'react'
import classnames from 'classnames'

import cls from './container-v.scss'


// @flow
type UikContainerVerticalProps = {
  className?: ?String,
  children?: ?React.node,
  Component?: React.ElementType,
}

const UikContainerVertical = ({
  className,
  children,
  Component,
  ...rest
}: UikContainerVerticalProps) => (
  <Component
    className={ classnames(cls.container, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikContainerVertical.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikContainerVertical
