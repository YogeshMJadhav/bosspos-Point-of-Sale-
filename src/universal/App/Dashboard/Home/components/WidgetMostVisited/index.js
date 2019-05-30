import * as React from 'react'

import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetTable,
  Uikon,
} from '@components'

import {
  UikChartLineBlank,
} from '@componentWrappers'


import { lineBlank } from '../../data/chartData'

import cls from './analytics-most-visited.scss'

const data = [
  [
    (
      <div className={ cls.contentPageName }>
          /store/
        <Uikon className={ cls.iconTrend }>
              trending_up
        </Uikon>
      </div>
    ),
    '4,890',
    '3,985',
    (
      <div className={ cls.contentBounceRate }>
        85,17%
        <UikChartLineBlank
          className={ cls.minichart }
          data={ lineBlank('#1664D7', '#E7EFFB') }
          height={ 30 }
          width={ 100 }
        />
      </div>
    ),
  ],
  [
    (
      <div className={ cls.contentPageName }>
          /store/symbol-styleguides
        <Uikon className={ cls.iconTrend }>
              trending_up
        </Uikon>
      </div>
    ),
    '1,824',
    '2,391',
    (
      <div className={ cls.contentBounceRate }>
        38,37%
        <UikChartLineBlank
          className={ cls.minichart }
          data={ lineBlank('#1664D7', '#E7EFFB') }
          height={ 30 }
          width={ 100 }
        />
      </div>
    ),
  ],
  [
    (
      <div className={ cls.contentPageName }>
          /store/dashboard-ui-kit
        <Uikon className={ cls.iconTrend }>
          trending_up
        </Uikon>
      </div>
    ),
    '8,123',
    '5,293',
    (
      <div className={ cls.contentBounceRate }>
        67,13%
        <UikChartLineBlank
          className={ cls.minichart }
          data={ lineBlank('#1664D7', '#E7EFFB') }
          height={ 30 }
          width={ 100 }
        />
      </div>
    ),
  ],
  [
    (
      <div className={ cls.contentPageName }>
          /store/webflow-cards.html
        <Uikon className={ cls.iconTrend }>
          trending_up
        </Uikon>
      </div>
    ),
    '2,440',
    '1,789',
    (
      <div className={ cls.contentBounceRate }>
        39,59%
        <UikChartLineBlank
          className={ cls.minichart }
          data={ lineBlank('#1664D7', '#E7EFFB') }
          height={ 30 }
          width={ 100 }
        />
      </div>
    ),
  ],
]

const AnalyticsWidgetMostVisited = props => (
  <UikWidget
    margin
    { ...props }
  >
    <UikWidgetHeader>
        Most Visited Pages
    </UikWidgetHeader>
    <UikWidgetTable>
      <thead>
        <tr>
          <th>
            Page Name
          </th>
          <th>
            Visitors
          </th>
          <th>
            Unique Page Visits
          </th>
          <th>
            Bounce Rate
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(row => (
            <tr key={ Math.random() /* pls don't do this in prod */ }>
              {
                row.map(cell => (
                  <td key={ Math.random() }>
                    {cell}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </UikWidgetTable>
  </UikWidget>
)

export default AnalyticsWidgetMostVisited
