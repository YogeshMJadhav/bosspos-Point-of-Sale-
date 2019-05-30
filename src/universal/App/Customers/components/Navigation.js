import * as React from 'react'

import {
  UikNavSectionTitle,
  UikNavSection,
  UikNavLink,
} from '@components'

import {
  UikNavPanel,
} from '@containers'

import menuLinks from '../assets/menuLinks'
import menuFavourites from '../assets/menuFavourites'


const SocialNavigation = () => (
  <UikNavPanel>
    <UikNavSection>
      <UikNavSectionTitle>
            Menu
      </UikNavSectionTitle>
      {
        menuLinks.map(link => (
          <UikNavLink
            key={ link.text }
            highlighted
            { ...link }
          >
            {link.text}
          </UikNavLink>
        ))
      }
    </UikNavSection>
    <UikNavSection>
      <UikNavSectionTitle>
            Your Favourites
      </UikNavSectionTitle>
      {
        menuFavourites.map(link => (
          <UikNavLink
            key={ link.text }
            highlighted
            { ...link }
          >
            {link.text}
          </UikNavLink>
        ))
      }
    </UikNavSection>
  </UikNavPanel>
)

export default SocialNavigation
