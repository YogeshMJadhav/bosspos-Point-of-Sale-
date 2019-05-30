
import * as React from 'react'
import classnames from 'classnames'

import OptionList from './OptionList'
import Button from '../UikButton'
import UikOutsideClickHandler from '../UikOutsideClickHandler'

// cls
import cls from './select.scss'


// @flow
import type { UikSelectOptionValueType, UikSelectOptionType } from './flowTypes'

type UikSelectProps = {
  className?: String,
  label?: React.node,
  name?: String,
  options: Array<UikSelectOptionType>,

  defaultValue?: Array<UikSelectOptionValueType> | UikSelectOptionValueType,
  value?: Array<UikSelectOptionType>,
  excluded?: Array<UikSelectOptionValueType>,

  /* Allows multiple selection */
  multi?: Boolean,
  /* disables selection */
  disabled?: Boolean,

  /* on change */
  onChange?: Function,
}


class Select extends React.Component<UikSelectProps> {
  static defaultProps = {
    onChange: () => {}, // eslint-disable-line
    multi: false,
    className: '',
    disabled: false,
    defaultValue: [],
    excluded: [],
    multiLimit: 0,
    value: null,
    label: null,
    name: null,
  };

  constructor(props, ...a) {
    super(props, ...a)
    const defaultValue = Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [
        props.defaultValue,
      ]
    const selected = []

    props.options.forEach((item) => {
      if (defaultValue.indexOf(item.value) !== -1) {
        selected.push(item)
      }
    })

    this.state = {
      selected,
      focused: false,
    }
  }

  componentDidUpdate() {
    const { onChange, multi } = this.props
    if (this.callCallbackIfAvailable === true && onChange) {
      this.callCallbackIfAvailable = false
      // check if i should call onChange
      const { selected } = this.state
      if (multi) {
        onChange(selected)
      } else {
        onChange(selected[0])
      }
    }
  }

  onAllClick = (clearOnly = false) => {
    const { selected } = this.state
    const { options } = this.props
    if (selected.length >= options.length || clearOnly) {
      this.callCallbackIfAvailable = true
      this.setState({
        selected: [
        ],
      })
    } else {
      this.onChange()
      this.setState({ selected: options.map(i => i) }) // depp copy
    }
  };

  onChange = () => {
    this.callCallbackIfAvailable = true
  };

  onToggleFocus = () => {
    const { focused } = this.state
    this.setState({ focused: !focused })
  };

  onClickUnfocus = () => {
    this.setState({ focused: false })
  };

  getValue = () => {
    const { disabled, value } = this.props
    const { selected: stateSelected } = this.state
    const selected = value || stateSelected
    if (disabled) {
      return []
    }

    return selected
  };

  setValue = (value) => {
    const selected = []
    const { options } = this.props
    const values = value

    if (values.length > 0) {
      options.forEach((item) => {
        if (values.indexOf(item.value) !== -1) {
          selected.push(item)
        }
      })
    }

    this.onChange()
    this.setState({ selected })
  };

  optionClick = (option) => {
    const {
      multi,
    } = this.props
    // single item
    if (!multi) {
      this.setState({
        selected: [
          option,
        ],
        focused: false,
      })
      this.onChange([
        option,
      ])
      return
    }

    // multiple allowed
    const { selected } = this.state
    const index = selected.map(item => item.value).indexOf(option.value)
    if (index !== -1) {
      selected.splice(index, 1)
    } else {
      selected.push(option)
    }
    this.onChange()
    this.setState({ selected })
  };

  renderHiddenInputs() {
    const {
      name,
      multi,
      disabled,
      value,
    } = this.props

    // do not render hidden inputs if no name
    if (!name) {
      return null
    }
    const { selected: stateSelected } = this.state
    const selected = value || stateSelected
    if (disabled) {
      return null
    }
    const inputName = multi ? `${name}[]` : name

    // render selected
    return selected && selected.length > 0 ? (
      selected.map(item => (
        <input
          key={ item.value }
          name={ inputName }
          type="hidden"
          value={ item.value }
        />
      ))
    ) : (
      // or render one empty
      <input
        name={ name }
        type="hidden"
      />
    )
  }

  renderValue() {
    const {
      disabled,
      options,
      label,
    } = this.props

    const selected = this.props.value || this.state.selected // eslint-disable-line
    const firstRender = selected[0]
    if (typeof firstRender !== 'undefined') {
      if (!firstRender.label) {
        const full = options.find(item => firstRender.value === item.value)
        if (full) {
          firstRender.label = full.label
        }
      }
    }

    if (options.length < 1) {
      return (
        <span className={ cls.valueWrapper }>
          No options available
        </span>
      )
    }
    if (disabled || selected.length < 1) {
      return (
        <span className={ classnames(cls.valueWrapper, cls.placeholderEmpty) }>
          {label}
        </span>
      )
    }
    if (selected.length === 1) {
      return (
        <div className={ cls.valueWrapper }>
          {firstRender.label}
        </div>
      )
    }
    return (
      <div className={ cls.labelAndOther }>
        <div>
          {firstRender.label}
        </div>
        <div className={ cls.plusValue }>
          +
          {selected.length - 1}
        </div>
      </div>
    )
  }

  render() {
    const {
      options,
      value,
      className,
      excluded,
      disabled,
    } = this.props

    const { selected, focused } = this.state

    return (
      <UikOutsideClickHandler
        className={ classnames(cls.wrapper, className) }
        onOutsideClick={ focused ? this.onClickUnfocus : null }
        onOutsideScroll={ false }
      >
        <Button
          className={ cls.valueRendered }
          disabled={ disabled || options.length < 1 }
          onClick={ this.onToggleFocus }
        >
          <div className={ cls.valueRenderedWrapper }>
            {this.renderValue()}
            <div className={ cls.arrowWrapper } />
          </div>
        </Button>
        {focused && !disabled && (
          <OptionList
            excluded={ excluded }
            onAllClick={ this.onAllClick }
            optionClick={ this.optionClick }
            options={ options }
            selected={ value || selected }
          />
        )}
        {this.renderHiddenInputs()}
      </UikOutsideClickHandler>
    )
  }
}

export default Select
