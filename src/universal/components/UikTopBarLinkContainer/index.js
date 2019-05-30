import * as React from 'react'
import classnames from 'classnames'

import cls from './top-bar-link-container.scss'

// @flow
type UikTopBarLinkContainerProps = {
  className?: string,
  children?: React.node,
  Component?: React.ElementType,
}


const UikTopBarLinkContainer = ({
  children,
  className,
  Component,
  ...rest
}: UikTopBarLinkContainerProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikTopBarLinkContainer.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikTopBarLinkContainer
