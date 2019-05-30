
import * as React from 'react'
import classnames from 'classnames'

import cls from './tab.scss'
// @flow
type UikTabItemProps = {
  className?: ?String,
  Component?: React.ElementType,
  text: React.node,
  extra: React.node,
  size?: 'small'
}


const UikTabItem = ({
  className,
  Component,
  text,
  extra,
  size,
  ...rest
}: UikTabItemProps) => (
  <Component
    className={ classnames(cls.item, className, {
      [cls[size]]: size,
    }) }
    { ...rest }
  >
    {text}
    {extra && (
    <span className={ cls.extra }>
      {extra}
    </span>
    )}
  </Component>
)

UikTabItem.defaultProps = {
  className: null,
  Component: 'span',
  size: null,
}

export default UikTabItem
