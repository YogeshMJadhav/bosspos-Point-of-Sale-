import * as React from 'react'
import { NavLink } from 'react-router-dom'


import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikTopBarLink,
  UikTopBarLinkContainer,
  UikTopBarMenuDivider,
} from '@components'

const TutorialsHeader = () => (
  <UikTopBar>
    <UikTopBarSection>
      <UikTopBarTitle>
        <Uikon>
            desktop
        </Uikon>
          Screen Previews
      </UikTopBarTitle>
      <UikTopBarMenuDivider />
      <UikTopBarLinkContainer>
        <UikTopBarLink
          activeClassName="active"
          Component={ NavLink }
          to="/docs"
        >
          Docs
        </UikTopBarLink>
      </UikTopBarLinkContainer>
    </UikTopBarSection>
  </UikTopBar>
)

export default TutorialsHeader
