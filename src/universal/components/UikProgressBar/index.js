import * as React from 'react'
import classnames from 'classnames'

import cls from './progress-bar.scss'

// @flow
type UikProgressBarProps = {
  fill?: Number,
  className?: ?String,
}

const UikProgressBar = ({
  className,
  fill,
  ...rest
}: UikProgressBarProps) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <div
      className={ cls.progressLine }
      style={ {
        width: `${Math.min(Math.ceil(fill * 100), 100)}%`,
      } }
    />
  </div>
)

UikProgressBar.defaultProps = {
  className: null,
  fill: 1,
}

export default UikProgressBar
