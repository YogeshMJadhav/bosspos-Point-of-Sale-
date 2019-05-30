import classnames from 'classnames'
// @flow
import * as React from 'react'

import cls from './social-friend-list.scss'

type UikSocialFriendListProps = {
  className?: ?String,
  Component?: React.ElementType,
  children?: React.node
}

const UikSocialFriendList = ({
  className,
  Component,
  children,
}: UikSocialFriendListProps) => (
  <Component className={ classnames(cls.wrapper, className) }>
    {children}
  </Component>
)

UikSocialFriendList.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
}

export default UikSocialFriendList
