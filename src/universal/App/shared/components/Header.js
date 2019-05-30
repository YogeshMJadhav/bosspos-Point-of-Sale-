import * as React from 'react'

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikDropdownItem,
  UikInput,
} from '@components'

import * as images from '@exampleAssets'

import UikTopBarUserDropdown from './UikTopBarUserDropdown'


const KnowledgeHeader = props => (
  <UikTopBar { ...props }>
    <UikTopBarSection>
      <UikTopBarTitle>
        <Uikon>
          help
        </Uikon>
        Name of Page
      </UikTopBarTitle>
    </UikTopBarSection>
    <UikTopBarSection>
      <UikInput
        clear
        icon={ (
          <Uikon>
            search_left
          </Uikon>
        ) }
        placeholder="Type to search..."
      />
      <UikTopBarUserDropdown
        user={ {
          imgUrl: images.a10,
          name: 'Minnie',
        } }
      >
        <UikDropdownItem>
          Settings
        </UikDropdownItem>
        <UikDropdownItem>
          Your Profile
        </UikDropdownItem>
        <UikDropdownItem>
          Help & Support center
        </UikDropdownItem>
        <UikDropdownItem>
          Logout
        </UikDropdownItem>
      </UikTopBarUserDropdown>
    </UikTopBarSection>
  </UikTopBar>
)


export default KnowledgeHeader
