import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-link-secondary.scss'

// @flow
type UikNavLinkProps = {
  className?: ?String,
  children?: ?React.node,
  rightEl?: ?React.node,
  highlighted?: ?Boolean,
  Component?: React.ElementType
}

const UikNavLink = ({
  rightEl,
  children,
  className,
  highlighted,
  Component,
  ...rest
}: UikNavLinkProps) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [cls.highlighted]: highlighted,
    }) }
    { ...rest }
  >
    <span className={ cls.text }>
      {children}
    </span>
    {rightEl && (
    <span className={ cls.rightEl }>
      {rightEl}
    </span>
    )}
  </Component>
)

UikNavLink.defaultProps = {
  className: null,
  rightEl: null,
  highlighted: false,
  children: null,
  Component: 'a',
}

export default UikNavLink
