import * as React from 'react'
import classnames from 'classnames'

import cls from './container-h.scss'

// @flow
type UikContainerHorizontalProps = {
  className?: ?String,
  children?: ?React.node,
  Component?: React.ElementType,
}

const UikContainerHorizontal = ({
  className,
  children,
  Component,
  ...rest
}: UikContainerHorizontalProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikContainerHorizontal.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikContainerHorizontal
