import classnames from 'classnames'
// @flow
import * as React from 'react'

import UikAvatar from '../UikAvatar'
import type UikAvatarType from '../UikAvatar'

import cls from './social-friend-item.scss'

type UikSocialFriendListProps = {
  className?: ?String,
  Component?: React.ElementType,
  children?: React.node,
  data: UikAvatarType
}

const UikSocialFriendList = ({
  className,
  Component,
  children,
  data: {
    name,
    imgUrl,
    textBottom,
  },
  ...rest
}: UikSocialFriendListProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <UikAvatar
      highlighted
      imgUrl={ imgUrl }
      name={ name }
      size="large"
      textBottom={ textBottom }
    />
  </Component>
)

UikSocialFriendList.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikSocialFriendList
