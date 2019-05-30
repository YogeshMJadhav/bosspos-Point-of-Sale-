import classnames from 'classnames'
// @flow
import * as React from 'react'

import cls from './social-header.scss'

/* components */
import UikTabItem from '../UikTabItem'
import UikTabContainer from '../UikTabContainer'
import UikAvatar, { UikAvatarProps } from '../UikAvatar'
import UikButton from '../UikButton'
import UikWidget from '../UikWidget'
import Uikon from '../Uikon'

type UikSocialHeaderProps = {
  className?: ?String,
  Component?: React.ElementType,
  imgUrl?: String,
  avatar: UikAvatarProps,
  name: String,
}


const UikSocialHeader = ({
  className,
  Component,
  imgUrl,
  avatar,
  name,
  ...rest
}: UikSocialHeaderProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <div
      className={ cls.cover }
      style={ {
        backgroundImage: `url(${imgUrl})`,
      } }
    >
      <UikButton
        className={ cls.btnUpdateCover }
        dark
        icon={ (
          <Uikon>
            camera
          </Uikon>
          ) }
      >
        Edit Cover
      </UikButton>
      <UikAvatar
        className={ cls.avatar }
        size="jumbo"
        { ...avatar }
      />
      <h1 className={ cls.name }>
        {name}
      </h1>
    </div>
    <div className={ cls.content }>
      <UikTabContainer className={ cls.tabContainer }>
        {
          [

            {
              text: 'Timeline',
              extra: null,
            },
            {
              text: 'About',
              extra: null,
            },
            {
              text: 'Friends',
              extra: '580',
            },
            {
              text: 'Photos',
              extra: null,
            },
          ].map(item => (
            <UikTabItem
              key={ item.text }
              className={ item.text === 'About' && 'active' }
              { ...item }
            />
          ))
        }
      </UikTabContainer>
    </div>
  </Component>
)

UikSocialHeader.defaultProps = {
  className: null,
  Component: UikWidget,
  imgUrl: null,
}

export default UikSocialHeader
