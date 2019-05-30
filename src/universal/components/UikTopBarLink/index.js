import * as React from 'react'
import classnames from 'classnames'

import cls from './top-bar-link.scss'

// @flow
type UikTopBarLinkProps = {
  className?: string,
  children: React.node,
  Component?: React.ElementType,
}


const UikTopBarLink = ({
  children,
  className,
  Component,
  ...rest
}: UikTopBarLinkProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikTopBarLink.defaultProps = {
  className: null,
  Component: 'a',
}

export default UikTopBarLink
