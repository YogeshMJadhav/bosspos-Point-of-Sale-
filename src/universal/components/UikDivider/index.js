import * as React from 'react'
import classnames from 'classnames'

import cls from './divider.scss'

// @flow
type UikDividerProps = {
  className?: String,
  direction?: 'vertical' | 'horizontal'
}

const UikDivider = ({
  className,
  direction,
  ...rest
}: UikDividerProps) => (
  <div
    className={ classnames({
      [cls[direction]]: direction,
    }, className) }
    { ...rest }
  />
)

UikDivider.defaultProps = {
  className: null,
  direction: 'horizontal',
}

export default UikDivider
