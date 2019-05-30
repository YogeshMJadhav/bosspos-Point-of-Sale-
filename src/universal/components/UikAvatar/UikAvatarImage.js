import classnames from 'classnames'
// @flow
import * as React from 'react'

import cls from './avatar.scss'

type UikAvatarImageProps = {
  name?: React.node,
  imgUrl: String | Array<String>,
}

const UikAvatarImage = ({ imgUrl, name }: UikAvatarImageProps) => (
  Array.isArray(imgUrl) ? (
    /* GROUPS, rendering multiple images */
    <div className={ classnames(cls.avatarMultiWrapper, {
      [cls.s2]: imgUrl.length === 2,
      [cls.s3]: imgUrl.length === 3,
      [cls.s4]: imgUrl.length >= 4,
    }) }
    >
      {
        imgUrl.slice(0, 4).map(url => (
          <img
            key={ url }
            alt={ typeof name === 'string' ? name : '' }
            className={ cls.avatar }
            src={ url }
          />
        ))
      }
    </div>
  ) : (

    /* Single */
    <img
      alt={ typeof name === 'string' ? name : '' }
      className={ cls.avatar }
      src={ imgUrl }
    />
  )
)

UikAvatarImage.defaultProps = {
  name: null,
}

export default UikAvatarImage
