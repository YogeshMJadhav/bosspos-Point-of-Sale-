import * as React from 'react'

import {
  UikButton,
  UikTopBar,
  UikTopBarSection,
  UikTopBarLink,
  UikTopBarLinkContainer,
  UikTopBarMenuDivider,

  UikTopBarTitle,
  Uikon,
  UikInput,
} from '@components'

const SocialHeader = () => (
  <UikTopBar>
    <UikTopBarSection>
      <UikTopBarTitle>
        <Uikon>
          stats
        </Uikon>
          Socialio
      </UikTopBarTitle>
      <UikTopBarMenuDivider />
      <UikInput
        clear
        icon={ (
          <Uikon>
            search_left
          </Uikon>
      ) }
        placeholder="Search..."
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
      <UikTopBarMenuDivider className="hidden-mobile" />
      <UikButton
        className="hidden-mobile"
        success
      >
          Go Premium
      </UikButton>
    </UikTopBarSection>
  </UikTopBar>
)

export default SocialHeader
