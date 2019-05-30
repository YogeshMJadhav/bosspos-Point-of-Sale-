import * as React from 'react'
import defaultsDeep from 'lodash.defaultsdeep'

import UikChart from '../UikChart'

// @flow
type UikChartLineBlankProps = {
  options?: Object,
  data?: Object,
}

const defaultOptions = {
  // disable tooltips
  tooltips: {
    enabled: false,
    mode: null,
  },
  hover: { mode: null },
  // all invisible
  scales: {
    yAxes: [{
      ticks: {
        display: false,
      },
      gridLines: {
        drawBorder: false,
        drawTicks: false,
        color: 'transparent',
        zeroLineWidth: 1,
      },
    }],
    xAxes: [{
      ticks: {
        display: false,
      },
      gridLines: {
        drawBorder: false,
        drawTicks: false,
        color: 'transparent',
        zeroLineWidth: 1,
      },
    }],
  },
}

const defaultDatasetOptions = {
  pointRadius: 0,
  lineTension: 0,
  borderWidth: 2,
  pointStyle: 'line',
}

const mapDefaultDatasetOptions = data => ({
  ...data,
  datasets: data.datasets && data.datasets.map(dataset => ({
    ...defaultDatasetOptions,
    ...dataset,
  }
  )),
})

const UikChartLineBlank = ({
  options,
  data,
  ...rest
}: UikChartLineBlankProps) => (
  <UikChart
    data={ mapDefaultDatasetOptions(data) }
    maxHeight={ 200 }
    options={ defaultsDeep({}, defaultOptions, options) }
    { ...rest }
  />
)

UikChartLineBlank.defaultProps = {
  options: {},
  data: {},
}

export default UikChartLineBlank
