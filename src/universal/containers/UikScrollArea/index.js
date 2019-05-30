import * as React from 'react'
import classnames from 'classnames'

import cls from './scroll.scss'

// @flow
type UikScrollAreaProps = {
  children?: React.node,
  className?: ?String,
}

const UikScrollArea = ({
  children,
  className,
  ...rest
}: UikScrollAreaProps) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </div>
)

UikScrollArea.defaultProps = {
  className: null,
  children: null,
}

export default UikScrollArea
