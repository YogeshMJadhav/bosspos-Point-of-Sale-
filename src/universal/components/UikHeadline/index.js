import * as React from 'react'
import classnames from 'classnames'

import cls from './headline.scss'

// @flow
type UikHeadlineProps = {
  className?: ?string,
  children: React.node,
  Component?: React.ElementType,
}

const UikHeadline = ({
  children,
  className,
  Component,
  ...rest
}: UikHeadlineProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)


UikHeadline.defaultProps = {
  className: null,
  Component: 'h2',
}

export default UikHeadline
