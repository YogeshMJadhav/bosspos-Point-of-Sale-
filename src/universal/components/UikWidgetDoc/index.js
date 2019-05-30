import * as React from 'react'
import classnames from 'classnames'

import UikWidget from '../UikWidget'

import cls from './widget-doc.scss'

// @flow

type UikWidgetDocProps = {
  className?: ?String,
  children?: ?React.node,
  Component?: React.ElementType,
}

const UikWidgetDoc = ({
  children,
  className,
  Component,
  ...rest
}: UikWidgetDocProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikWidgetDoc.defaultProps = {
  className: null,
  children: null,
  Component: UikWidget,
}

export default UikWidgetDoc
