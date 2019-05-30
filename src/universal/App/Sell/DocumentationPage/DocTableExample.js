import * as React from 'react'

import {
  UikWidgetTable,
} from '@components'

const data = [
  {
    field: '_id',
    type: 'ObjectId',
    desc: 'The unique identifier for the Collection',
  },
  {
    field: 'lastUpdated',
    type: 'Date',
    desc: 'Date Collection was last updated',
  },
  {
    field: 'createdOn',
    type: 'Date',
    desc: 'Date Collection was created',
  },
  {
    field: 'name',
    type: 'String',
    desc: 'Name given to Collection',
  },
]

const DocTableExample = () => (
  <UikWidgetTable>
    <thead>
      <tr>
        <th>
        Field
        </th>
        <th>
        Type
        </th>
        <th>
        Description
        </th>
      </tr>
    </thead>
    <tbody>
      {
      data.map(item => (
        <tr key={ item.field }>
          <td>
            <code>
              {item.field}
            </code>
          </td>
          <td>
            {item.type}
          </td>
          <td>
            {item.desc}
          </td>
        </tr>
      ))
    }
    </tbody>
  </UikWidgetTable>
)

export default DocTableExample
