import * as React from 'react'
import classnames from 'classnames'

import Uikon from '../Uikon'

import cls from './icon-wrap.scss'

// @flow
type UikonWrapProps = {
  className?: String,
  color?: 'green' | 'blue' | 'orange' | 'violet' | 'red',
  name?: React.node,
  type?: 'square' | 'circle'
}

const UikonWrap = ({
  className,
  color,
  name,
  type,
  ...rest
}: UikonWrapProps) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [color]: color,
      [cls[type]]: type,
    }) }
    { ...rest }
  >
    <Uikon>
      {name}
    </Uikon>
  </div>
)

UikonWrap.defaultProps = {
  className: null,
  color: null,
  name: null,
  type: 'circle',
}

export default UikonWrap
