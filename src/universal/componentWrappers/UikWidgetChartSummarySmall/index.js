import * as React from 'react'
import classnames from 'classnames'

import cls from './widget-chart-summary.scss'

import UikChartLineBlank from '../UikChartLineBlank'
import UikWidget from '../../components/UikWidget'
import Uikon from '../../components/Uikon'


// @flow
type UikWidgetChartSummarySmallProps = {
  className?: ?String,
  data: Object,
  label?: React.node,
  value?: React.node,
  diff?: Number
}

const UikWidgetChartSummarySmall = ({
  className,
  data,
  label,
  value,
  diff,
  ...rest
}: UikWidgetChartSummarySmallProps) => {
  const isUp = diff >= 0
  const diffPercentage = Number(parseFloat(diff) * 100).toFixed(2)
  return (

    <UikWidget
      className={ classnames(cls.wrapper, className) }
      padding
      { ...rest }
    >
      { label && (
      <span className={ cls.label }>
        {label}
      </span>
      ) }
      { value && (
      <span className={ cls.value }>
        {value}
      </span>
      ) }
      { diff && (
      <span className={ classnames(cls.diff, {
        [cls.down]: !isUp,
      }) }
      >
        {`${isUp ? '+' : ''}${diffPercentage}%`}
        <Uikon className={ cls.icon }>
          {isUp ? 'trending_up' : 'trending_down' }
        </Uikon>
      </span>
      ) }
      <UikChartLineBlank
        className={ cls.chart }
        data={ data }
        maxHeight={ 50 }
      />
    </UikWidget>
  )
}

UikWidgetChartSummarySmall.defaultProps = {
  className: null,
  value: null,
  label: null,
  diff: null,
}

export default UikWidgetChartSummarySmall
