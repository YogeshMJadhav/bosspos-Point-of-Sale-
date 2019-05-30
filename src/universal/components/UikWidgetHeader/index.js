import * as React from 'react'
import classnames from 'classnames'
// @flow

import cls from './widget-title.scss'

type UikWidgetHeaderProps = {
  children: React.node,
  Component?: React.ElementType,
  className?: ?String,
  noDivider?: ?boolean,
  rightEl?: React.node,
}

const UikWidgetHeader = ({
  children,
  className,
  Component = 'div',
  noDivider,
  rightEl,
  ...rest
}: UikWidgetHeaderProps) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [cls.noDivider]: noDivider,
    }) }
    { ...rest }
  >
    <h3>
      {children}
    </h3>
    {rightEl}
  </Component>
)

UikWidgetHeader.defaultProps = {
  className: null,
  Component: 'div',
  noDivider: false,
  rightEl: null,
}

export default UikWidgetHeader
