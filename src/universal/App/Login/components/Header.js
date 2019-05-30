import * as React from 'react'

import {
  UikButton,
  UikTopBar,
  UikTopBarSection,
  UikTopBarLink,
  UikTopBarLinkContainer,
  UikTopBarTitle,
  UikTopBarMenuDivider,
  Uikon,
  UikInput,
} from '@components'

import HeaderLinks from './HeaderLinks'

const TutorialsHeader = () => (
  <UikTopBar>
    <UikTopBarSection>
      <UikTopBarTitle>
        <Uikon color="blue">
            desktop
        </Uikon>
          Tutorials
      </UikTopBarTitle>
      <UikTopBarMenuDivider />
      <HeaderLinks />
      <UikTopBarMenuDivider />
      <UikInput
        clear
        icon={ (
          <Uikon>
            search_left
          </Uikon>
      ) }
        placeholder="I want to learn..."
      />
    </UikTopBarSection>
    <UikTopBarSection>
      <UikTopBarLinkContainer>
        {
          [
            'Sign In',
            'Register',
          ].map(link => (
            <UikTopBarLink
              key={ link }
              className={ link === 'Register' ? 'active' : null }
            >
              {link}
            </UikTopBarLink>
          ))
        }
      </UikTopBarLinkContainer>
      <UikTopBarMenuDivider />
      <UikButton
        success
      >
          Go Premium
      </UikButton>
    </UikTopBarSection>
  </UikTopBar>
)

export default TutorialsHeader
