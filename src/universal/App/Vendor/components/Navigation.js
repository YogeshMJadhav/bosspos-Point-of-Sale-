import * as React from 'react'

import {
  UikNavSectionTitle,
  UikNavSection,
  UikNavTitle,
  UikNavLink,
  UikCheckbox,
} from '@components'

import {
  UikNavPanel,
} from '@containers'

import menuLinks from '../assets/menuLinks'
import menuChecks from '../assets/menuChecks'


const TutorialsNavigation = () => (
  <UikNavPanel>
    <UikNavTitle>
      Filter Tutorials
    </UikNavTitle>
    <UikNavSection>
      <UikNavSectionTitle>
      Topic
      </UikNavSectionTitle>
      {
        menuLinks.map(link => (
          <UikNavLink
            key={ link.text }
            className={ link.text === 'Animations' ? 'active' : null }
            rightEl={ link.rightEl }
          >
            {link.text}
          </UikNavLink>
        ))
      }
    </UikNavSection>
    {
      menuChecks.map(checkData => (

        <UikNavSection key={ checkData.name }>
          <UikNavSectionTitle>
            {checkData.name}
          </UikNavSectionTitle>
          {
            checkData.data.map(label => (
              <UikNavLink
                key={ label }
              >
                <UikCheckbox
                  defaultChecked={ label === 'All' }
                  label={ label }
                />
              </UikNavLink>
            ))
          }
        </UikNavSection>
      ))
    }
  </UikNavPanel>
)

export default TutorialsNavigation
