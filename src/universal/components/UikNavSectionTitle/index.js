import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-section-title.scss'


// @flow
type UikNavSectionTitleProps = {
  children?: React.node,
  className?: ?String
}

const UikSectionName = ({
  children,
  className,
  ...rest
}: UikNavSectionTitleProps) => (
  <span
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </span>
)

UikSectionName.defaultProps = {
  className: null,
  children: null,
}

export default UikSectionName
