import * as React from 'react'
import classnames from 'classnames'

import cls from './input.scss'

// @flow
type UikInputProps = {
  wrapperProps?: Object,
  label?: React.node,
  name?: React.node,
  className?: String,
  icon?: React.node,
  clear?: Boolean
}

class Input extends React.PureComponent<UikInputProps> {
  static defaultProps = {
    wrapperProps: {},
    label: null,
    name: null,
    className: null,
    icon: null,
    clear: false,
  }

  setRef = (node) => {
    this.input = node
  }

  setValue = (value) => {
    this.input.value = value
  }

  render() {
    const {
      className,
      wrapperProps,
      name,
      icon,
      label,
      focus, // eslint-disable-line
      clear,

      // size
      ...rest
    } = this.props

    return (
      <div
        { ...wrapperProps }
        className={ classnames(wrapperProps.className, {
          [cls.clear]: clear,
        }) }
      >
        { label && (
          <label
            className={ cls.inputLabel }
            htmlFor={ name }
          >
            {label}
          </label>
        )}
        <div className={ cls.inputWrapper }>
          {
            icon && (
              <span className={ cls.iconWrapper }>
                {icon}
              </span>
            )
          }
          <input
            ref={ this.setRef }
            className={ classnames(className, cls.input) }
            name={ name }
            type="text"
            { ...rest }
          />
        </div>
      </div>
    )
  }
}

export default Input
