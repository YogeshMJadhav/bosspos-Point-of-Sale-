import * as React from 'react'

import {
  UikWidgetTable,
} from '@components'

const data = [
  {
    name: '_archived',
    type: 'Boolean',
    editable: true,
    desc: 'Items set to archived will not be published',
  },
  {
    name: '_draft',
    type: 'Boolean',
    editable: false,
    desc: 'Items set to draft will not be published',
  },
]

const DocTable2 = () => (
  <UikWidgetTable>
    <thead>
      <tr>
        <th>
        Field Name
        </th>
        <th>
        Field Type
        </th>
        <th>
        Editable
        </th>
        <th>
        Description
        </th>
      </tr>
    </thead>
    <tbody>
      {
      data.map(item => (
        <tr key={ item.name }>
          <td>
            <code>
              {item.name}
            </code>
          </td>
          <td>
            <code>
              {item.type}
            </code>
          </td>
          <td>
            <code>
              {item.editable ? 'true' : 'false'}
            </code>
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

export default DocTable2
