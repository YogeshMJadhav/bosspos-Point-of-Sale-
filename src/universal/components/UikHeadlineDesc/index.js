import * as React from 'react'
import classnames from 'classnames'

import cls from './headline-desc.scss'

// @flow
type UikHeadlineDescProps = {
    className?: string,
    children: React.node,
    Component?: React.ElementType,
}

const UikHeadline = ({
  children,
  className,
  Component,
  ...rest
}: UikHeadlineDescProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)


UikHeadline.defaultProps = {
  className: null,
  Component: 'p',
}

export default UikHeadline
