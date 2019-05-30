import * as React from 'react'
import classnames from 'classnames'

import cls from './widget.scss'

// @flow

type UikWidgetProps = {
  className?: ?String,
  children?: ?React.node,
  Component?: React.ElementType,
  padding?: Boolean,
  margin?: Boolean
}

const UikWidget = ({
  children,
  className,
  Component,
  padding,
  margin,
  ...rest
}: UikWidgetProps) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [cls.padding]: padding,
      [cls.margin]: margin,
    }) }
    { ...rest }
  >
    {children}
  </Component>
)

UikWidget.defaultProps = {
  className: null,
  children: null,
  padding: false,
  margin: false,
  Component: 'div',
}

export default UikWidget
