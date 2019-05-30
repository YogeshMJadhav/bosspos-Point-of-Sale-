import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-divider.scss'

// @flow
type UikTopBarMenuDividerProps = {
  className?: ?String,
}

const UikTopBarMenuDivider = ({
  className,
  ...rest
}: UikTopBarMenuDividerProps) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  />
)

UikTopBarMenuDivider.defaultProps = {
  className: null,
}

export default UikTopBarMenuDivider
