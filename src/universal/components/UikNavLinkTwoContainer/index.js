import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-link-two-container.scss'

// @flow
type UikNavLinkTwoContainerProps = {
  children?: React.node,
  className?: ?String,
  positionRight?: ?Boolean
}

const UikNavLinkTwoContainer = ({
  children,
  className,
  positionRight,
  ...rest
}: UikNavLinkTwoContainerProps) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [cls.positionRight]: positionRight,
    }) }
    { ...rest }
  >
    {children}
  </div>
)

UikNavLinkTwoContainer.defaultProps = {
  className: null,
  positionRight: false,
  children: null,
}

export default UikNavLinkTwoContainer
