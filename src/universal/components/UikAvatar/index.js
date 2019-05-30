import * as React from 'react'
import classnames from 'classnames'
// @flow

import UikAvatarStatus from './UikAvatarStatus'
import UikAvatarImage from './UikAvatarImage'

import cls from './avatar.scss'

type UikAvatarPlaceholderProps = {
  content?: React.node,
  color?: 'green' | 'blue' | 'orange' | 'violet' | 'red',
}

export type UikAvatarProps = {
  className?: String,
  name?: React.node,
  status?: React.node,
  imgUrl?: String | Array<String>,
  textTop?: String,
  avatarPlaceholder?: UikAvatarPlaceholderProps,
  highlighted?: Boolean,
  textBottom?: React.node,
  actionIcon?: React.node,
  size?: 'small' | 'large' | 'larger' | 'extraLarge' | 'jumbo',
}

const UikAvatar = ({
  name,
  imgUrl,
  avatarPlaceholder,
  textTop,
  className,
  highlighted,
  actionIcon,
  status,
  size,
  textBottom,
  ...rest
}: UikAvatarProps) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [cls.highlighted]: highlighted,
      [cls[size]]: size,
    }) }
    { ...rest }
  >
    <div className={ classnames(cls.avatarWrapper) }>
      {
      imgUrl ? (
        <UikAvatarImage
          className={ cls.avatar }
          imgUrl={ imgUrl }
        />
      ) : (

        <div className={ classnames(cls.avatarPlaceholder, {
          [avatarPlaceholder.color]: avatarPlaceholder.color,
        }) }
        >
          {avatarPlaceholder.content}
        </div>
      )
    }
      {
      actionIcon && (
        <div className={ cls.avatarAction }>
          {actionIcon}
        </div>
      )
    }
    </div>
    {
      (name) && (
        <div className={ cls.info }>
          {textTop && (
            <span className={ cls.textTop }>
              {textTop}
            </span>
          )}
          {name && (
          <span className={ cls.name }>
            {name}
          </span>
          )}
          {textBottom && (
            <span className={ cls.textBottom }>
              {textBottom}
            </span>
          )}
        </div>
      )
    }
    {
      status && (
        <UikAvatarStatus status={ status } />
      )
    }
  </div>
)

UikAvatar.defaultProps = {
  className: null,
  name: null,
  textTop: null,
  actionIcon: null,
  highlighted: false,
  avatarPlaceholder: {},
  status: null,
  imgUrl: null,
  size: null,
  textBottom: null,
}

export default UikAvatar
