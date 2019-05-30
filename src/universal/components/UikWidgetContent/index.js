import * as React from 'react'
import classnames from 'classnames'

import cls from './widget-content.scss'


// @flow
type UikWidgetContentProps = {
  children?: React.node,
  className?: ?String,
  Component?: React.ElementType,
  grey?: Boolean
}


const UikWidgetContent = ({
  children,
  className,
  Component = 'div',
  grey,
  ...rest
}: UikWidgetContentProps) => (
  <Component
    className={ classnames(cls.wrapper, className, {
      [cls.grey]: grey,
    }) }
    { ...rest }
  >
    {children}
  </Component>
)

UikWidgetContent.defaultProps = {
  className: null,
  Component: 'div',
  children: null,
  grey: false,
}

export default UikWidgetContent
