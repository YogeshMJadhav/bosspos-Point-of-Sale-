import * as React from 'react'
import classnames from 'classnames'

import cls from './tab.scss'
// @flow

type UikTabContainerProps = {
  className?: ?String,
  Component?: React.ElementType,
}

const UikTabContainer = ({
  className,
  Component,
  ...rest
}: UikTabContainerProps) => (
  <Component
    className={ classnames(cls.container, className) }
    { ...rest }
  >
    {/**/}
  </Component>
)

UikTabContainer.defaultProps = {
  className: null,
  Component: 'div',
}

export default UikTabContainer
