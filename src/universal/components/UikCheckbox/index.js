import * as React from 'react'
import classNames from 'classnames'
import cls from './checkbox.scss'


// @flow
type UikCheckboxProps = {
  className?: ?String,
  label?: React.node,
}

const UikCheckbox = ({
  label,
  className,
  ...rest
}: UikCheckboxProps) => (

  <label className={ classNames(cls.wrapper, className) }>
    <input
      className={ cls.checkbox }
      type="checkbox"
      { ...rest }
    />
    <span className={ cls.label }>
      <span className={ cls.checkIcon } />
      {label}
    </span>
  </label>
)

UikCheckbox.defaultProps = {
  label: null,
  className: null,
}

export default UikCheckbox
