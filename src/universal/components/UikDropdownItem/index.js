import * as React from 'react'
import classnames from 'classnames'

import UikButton from '../UikButton'

import cls from './dropdown-item.scss'

// @flow
type UikDropdownItemProps = {
  children?: React.node,
  className?: ?String,
  Component?: ?React.ElementType
}

const UikDropdownItem = ({
  children,
  className,
  Component,
  ...rest
}: UikDropdownItemProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikDropdownItem.defaultProps = {
  className: null,
  children: null,
  Component: UikButton,
}

export default UikDropdownItem
