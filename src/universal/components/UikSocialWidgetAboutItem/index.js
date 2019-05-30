import * as React from 'react'
import classnames from 'classnames'

import UikAvatar, { UikAvatarProps } from '../UikAvatar'

import cls from './social-about-item.scss'
// @flow

type UikSocialFriendListProps = {
  className?: ?String,
  Component?: ?React.ElementType,
  children?: React.node,
  data: UikAvatarProps
}

const UikSocialFriendList = ({
  className,
  Component,
  children,
  data,
  ...rest
}: UikSocialFriendListProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <UikAvatar
      key={ data.name }
      { ...data }
    />
  </Component>
)

UikSocialFriendList.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikSocialFriendList
