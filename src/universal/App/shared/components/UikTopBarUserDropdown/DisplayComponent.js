import * as React from 'react'
import classnames from 'classnames'

import {
  Uikon,
  UikAvatar,
} from '@components'

import cls from './header-user-dropdown.scss'

// @flow
type UikTopBarUserDropdownDisplayComponentType = {
  className?: String,
  Component?: React.ComponentType,
  name?: String,
  children?: React.node,
  imgUrl?: String,
}

const UikTopBarUserDropdownDisplayComponent = ({
  className,
  Component,
  children,
  imgUrl,
  name,
  ...rest
}: UikTopBarUserDropdownDisplayComponentType) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <UikAvatar
      imgUrl={ imgUrl }
      name={ name }
    />
    <Uikon className={ cls.dropdownArrow }>
      arrow_dropdown
    </Uikon>
  </Component>
)

UikTopBarUserDropdownDisplayComponent.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
  imgUrl: null,
  name: null,
}

export default UikTopBarUserDropdownDisplayComponent
