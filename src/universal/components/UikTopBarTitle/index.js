
import * as React from 'react'
import classnames from 'classnames'

import cls from './top-bar-title.scss'


// @flow
type UikTopBarTitleProps = {
  children?: React.node,
  className?: ?String,
  Component?: React.ElementType,
  large?: Boolean
}

const UikTopBarTitle = ({
  children,
  className,
  Component,
  large,
  ...rest
}: UikTopBarTitleProps) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [cls.large]: large,
    }) }
    { ...rest }
  >
    {children}
  </Component>
)

UikTopBarTitle.defaultProps = {
  className: null,
  Component: 'h2',
  children: null,
  large: false,
}

export default UikTopBarTitle
