/* eslint-disable max-len */
import * as React from 'react'

import Button from '../UikButton'
// cls
import cls from './select.scss'

// @flow
import type { UikSelectOptionValueType, UikSelectOptionType } from './flowTypes'

type OptionListProps = {
  selected: Array<UikSelectOptionType>,
  options: Array<UikSelectOptionType>,
  excluded?: Array<UikSelectOptionValueType>,
  optionClick: Function
}

class OptionList extends React.Component<OptionListProps> {
  static defaultProps = {
    excluded: [],
  }

  renderOptionWrapper = ({ label }) => (
    <div className={ cls.label }>
      {label}
    </div>
  )

  renderOptions() {
    const {
      options, optionClick, selected, excluded,
    } = this.props

    const filteredOptions = options.filter((option) => {
      if (excluded.indexOf(option.value) > -1) {
        return false
      }
      return true
    })

    return filteredOptions.map((i) => {
      const indexIsSelected = selected.find(k => i.value === k.value)
      const onClick = key => () => {
        optionClick(key)
      }
      return (
        <Button
          key={ i.value }
          className={ cls.option }
          onClick={ onClick(i) }
          type="button"
        >
          <div className={ cls.optionContent }>
            {this.renderOptionWrapper(i)}
            {indexIsSelected ? (
              <div className={ cls.check } />
            ) : null}
          </div>
        </Button>
      )
    })
  }

  render() {
    return (
      <div className={ cls.optionListWrapper }>
        <div className={ cls.optionList }>
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}

export default OptionList
