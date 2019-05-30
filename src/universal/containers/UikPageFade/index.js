import * as React from 'react'
import Flip from 'react-flip-move'

import classnames from 'classnames'

import cls from './PageFade.scss'

// @flow
type UikPageFadeProps = {
  className?: String,
  children: React.node,
  enterAnimation?: String,
  leaveAnimation?: string
}

const PageFade = ({
  children,
  className,
  enterAnimation,
  leaveAnimation,
  ...rest
}: UikPageFadeProps) => (
  <Flip
    className={ classnames(cls.animationWrapper, className) }
    duration={ 150 }
    enterAnimation={ enterAnimation || 'fade' }
    leaveAnimation={ leaveAnimation || 'none' }
    { ...rest }
  >
    {children}
  </Flip>
)

PageFade.defaultProps = {
  className: null,
  enterAnimation: null,
  leaveAnimation: null,
}

export default PageFade
