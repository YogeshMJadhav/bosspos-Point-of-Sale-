import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-user.scss'

// @flow
type UikNavUserProps = {
  children?: React.node,
  className?: ?String,
  Component?: React.ElementType,
  name?: React.node,
  imgUrl?: String,
  textTop?: React.node
}

const UikNavUser = ({
  children,
  className,
  Component,
  name,
  imgUrl,
  textTop,
  ...rest
}: UikNavUserProps) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {
      imgUrl && (
        <div className={ cls.avatarWrapper }>
          <img
            alt="bob"
            className={ cls.avatar }
            src={ imgUrl }
          />
        </div>
      )
    }
    {
      name && (
        <span className={ cls.name }>
          {name}
        </span>
      )
    }
    {
      textTop && (
        <span className={ cls.textTop }>
          {textTop}
        </span>
      )
    }
    {children}
  </div>
)

UikNavUser.defaultProps = {
  className: null,
  children: null,
  Component: 'div',
  name: null,
  imgUrl: null,
  textTop: null,
}

export default UikNavUser
