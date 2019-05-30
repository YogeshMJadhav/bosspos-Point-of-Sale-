import * as React from 'react'

import {
  UikWidget,
  UikWidgetHeader,
  UikWidgetTable,
  UikProgressBar,
} from '@components'


import cls from './analytics-social-media.scss'

const data = [
  [
    'Instagram',
    (
      <div className={ cls.contentVisitors }>
        4,890
        <UikProgressBar
          className={ cls.progressBar }
          fill={ 0.7 }
        />
      </div>
    ),
  ],
  [
    'Facebook',
    (
      <div className={ cls.contentVisitors }>
        1,824
        <UikProgressBar
          className={ cls.progressBar }
          fill={ 0.13 }
        />
      </div>
    ),
  ],
  [
    'Twitter',
    (
      <div className={ cls.contentVisitors }>
        8,123
        <UikProgressBar
          className={ cls.progressBar }
          fill={ 0.37 }
        />
      </div>
    ),
  ],
  [
    'LinkedIn',
    (
      <div className={ cls.contentVisitors }>
        63
        <UikProgressBar
          className={ cls.progressBar }
          fill={ 0.56 }
        />
      </div>
    ),
  ],
]

const AnalyticsWidgetSocialMediaTraffic = props => (
  <UikWidget
    margin
    { ...props }
  >
    <UikWidgetHeader>
      Social Media Traffic
    </UikWidgetHeader>
    <UikWidgetTable className={ cls.table }>
      <thead>
        <tr>
          <th>
            Network
          </th>
          <th>
            Visitors
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(row => (

            <tr key={ row }>
              {
                row.map(cell => (
                  <td key={ cell }>
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

export default AnalyticsWidgetSocialMediaTraffic
