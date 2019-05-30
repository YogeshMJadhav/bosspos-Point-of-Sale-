import * as React from 'react'


import {
  UikAvatarProps,
  UikDropdown,
} from '@components'

import DisplayComponent from './DisplayComponent'

// @flow
type UikTopBarUserDropdownType = {
  className?: String,
  Component?: React.ComponentType,
  user: UikAvatarProps,
  children?: React.node,
  imgUrl?: String,
}

const UikTopBarUserDropdown = ({
  className,
  Component,
  children,
  user,
  imgUrl,
  ...rest
}: UikTopBarUserDropdownType) => (
  <UikDropdown
    DisplayComponent={ DisplayComponent }
    displayComponentProps={ user }
    { ...rest }
  >
    {children}
  </UikDropdown>
)

UikTopBarUserDropdown.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
  imgUrl: null,
}

export default UikTopBarUserDropdown
