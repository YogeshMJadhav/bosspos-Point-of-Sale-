import * as React from 'react'

import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetContent,
  UikSelect,
} from '@components'

import {
  UikChart,
  UikWidgetChartSummarySmall,
} from '@componentWrappers'

import numberFormatZeros from '@lib/numberFormatZeros'

import { barData, lineBlank } from './data/chartData'

import cls from './analytics-home.scss'

import WidgetMostVisited from './components/WidgetMostVisited'
import WidgetSocialMediaTraffic from './components/WidgetSocialMediaTraffic'

const AnalyticsHome = () => (
  <React.Fragment>
    <UikWidget margin>
      <UikWidgetHeader rightEl={ (
        <div className={ cls.headerActions }>
          <UikSelect
            className={ cls.select }
            defaultValue={ ['December'] }
            label="Action"
            options={ [
              {
                value: 'November',
                label: 'November',
              },
              {
                value: 'December',
                label: 'December',
              },
            ] }
          />
          <UikSelect
            className={ cls.select }
            defaultValue={ [2018] }
            label="Action"
            options={ [
              {
                value: 2018,
                label: 2018,
              },
              {
                value: 2017,
                label: 2017,
              },
            ] }
          />
        </div>
      ) }
      >
          Daily Visitors
      </UikWidgetHeader>
      <UikWidgetContent>
        <UikChart
          chartType="Bar"
          data={ barData() }
          maxHeight={ 200 }
          options={ {
            scales: {
              yAxes: [{
                ticks: {
                  callback: value => numberFormatZeros(value),
                },
                position: 'right',
                gridLines: {
                  drawBorder: false,
                  drawTicks: false,
                },
              }],
              xAxes: [{
                ticks: {
                  callback: value => value.split(' ')[0],
                  padding: 6,
                },
                position: 'right',
                gridLines: {
                  drawBorder: false,
                  drawTicks: false,
                },
              }],
            },
          } }
        />
      </UikWidgetContent>
    </UikWidget>
    <div className={ cls.miniChartContainer }>
      <UikWidgetChartSummarySmall
        className={ cls.miniChart }
        data={ lineBlank('#1664D7', '#E7EFFB') }
        diff={ 0.1 }
        label="Realtime users"
        margin
        value={ 848 }
      />
      <UikWidgetChartSummarySmall
        className={ cls.miniChart }
        data={ lineBlank('#34AA44', '#EAF6EC') }
        diff={ -0.1181 }
        label="Total Visits"
        margin
        value="54,598"
      />
      <UikWidgetChartSummarySmall
        className={ cls.miniChart }
        data={ lineBlank('#6758F3', '#EFEEFE') }
        diff={ 0.122 }
        label="Bounce Rate"
        margin
        value={ 73.67 }
      />
      <UikWidgetChartSummarySmall
        className={ cls.miniChart }
        data={ lineBlank('#FACF55', '#FEFAEE') }
        diff={ 0.1968 }
        label="Visit Duration"
        margin
        value="1m 4s"
      />
    </div>
    <div className={ cls.tables }>
      <WidgetMostVisited className={ cls.widgetMostVisited } />
      <WidgetSocialMediaTraffic />
    </div>
  </React.Fragment>
)

export default AnalyticsHome
