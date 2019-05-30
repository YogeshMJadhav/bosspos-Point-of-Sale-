import * as React from 'react'
import classnames from 'classnames'

// @flow
type UikonProps = {
  className?: string,
  children?: React.node,
  Component?: React.ElementType,
  color?: 'green' | 'blue' | 'orange' | 'violet' | 'red',
}

const Uikon = ({
  children,
  className,
  Component,
  color,
  ...rest
}: UikonProps) => (
  <i
    className={ classnames('uikon', className, {
      [color]: color,
    }) }
    { ...rest }
  >
    {children}
  </i>
)


Uikon.defaultProps = {
  className: null,
  Component: 'i',
  children: null,
  color: null,
}

export default Uikon
