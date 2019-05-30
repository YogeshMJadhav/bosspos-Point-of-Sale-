import classnames from 'classnames'
// @flow
import * as React from 'react'

import cls from './social-friends.scss'

/* components */
import UikTabItem from '../UikTabItem'
import UikTabContainer from '../UikTabContainer'
import { UikAvatarProps } from '../UikAvatar'
import UikWidgetHeader from '../UikWidgetHeader'
import UikWidget from '../UikWidget'

import UikSocialFriendListItem from '../UikSocialFriendListItem'
import UikSocialFriendList from '../UikSocialFriendList'

type UikSocialWidgetFriendsProps = {
  className?: ?String,
  Component?: React.ElementType,
  imgUrl?: String,
  avatar: UikAvatarProps,
  name: String,
  data?: Array
}


const UikSocialWidgetFriends = ({
  className,
  Component,
  imgUrl,
  avatar,
  name,
  data,
  ...rest
}: UikSocialWidgetFriendsProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <UikWidgetHeader noDivider>
      Friends
    </UikWidgetHeader>
    <UikTabContainer>
      {
        [
          {
            text: 'All Friends',
            extra: 580,
          },
          {
            text: 'New Posts',
            extra: 120,
          },
          {
            text: 'Friend Requests',
            extra: null,
          },
        ].map(item => (
          <UikTabItem
            key={ item.text }
            className={ item.text === 'All Friends' && 'active' }
            { ...item }
          />
        ))
      }
    </UikTabContainer>
    <UikSocialFriendList>
      {
        data.map(item => (
          <UikSocialFriendListItem
            key={ item.name }
            data={ item }
          />
        ))
      }
    </UikSocialFriendList>
  </Component>
)

UikSocialWidgetFriends.defaultProps = {
  className: null,
  Component: UikWidget,
  imgUrl: null,
  data: [],
}

export default UikSocialWidgetFriends
