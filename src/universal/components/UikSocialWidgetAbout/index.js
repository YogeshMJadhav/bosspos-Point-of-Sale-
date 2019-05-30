import classnames from 'classnames'
// @flow
import * as React from 'react'

import cls from './social-about.scss'

/* components */
import { UikAvatarProps } from '../UikAvatar'
import UikWidgetHeader from '../UikWidgetHeader'
import UikWidget from '../UikWidget'

import UikSocialWidgetAboutItem from '../UikSocialWidgetAboutItem'

type UikSocialWidgetAboutProps = {
  className?: ?String,
  Component?: React.ElementType,
  imgUrl?: String,
  avatar: UikAvatarProps,
  name: String,
  data?: Array,
}


const UikSocialWidgetAbout = ({
  className,
  Component,
  imgUrl,
  avatar,
  name,
  data,
  ...rest
}: UikSocialWidgetAboutProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <UikWidgetHeader>
      About
    </UikWidgetHeader>
    <div className={ cls.listWrapper }>
      {
        data.map((item, index) => (
          <UikSocialWidgetAboutItem
            // don't do this in prod :)
            key={ index } // eslint-disable-line
            data={ item }
          />
        ))
      }
    </div>
  </Component>
)

UikSocialWidgetAbout.defaultProps = {
  className: null,
  Component: UikWidget,
  imgUrl: null,
  data: [],
}

export default UikSocialWidgetAbout
