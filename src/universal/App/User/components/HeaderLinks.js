import * as React from 'react'

import {
  UikTopBarLink,
  UikTopBarLinkContainer,
} from '@components'

const TutorialsHeaderLinks = () => (

  <UikTopBarLinkContainer>
    {
      [
        'Explore',
        'Tutorials',
        'Courses',
        'Projects',
        'Resources',
      ].map(link => (
        <UikTopBarLink
          key={ link }
          className={ link === 'Tutorials' ? 'active' : null }
        >
          {link}
        </UikTopBarLink>
      ))
    }
  </UikTopBarLinkContainer>
)


export default TutorialsHeaderLinks
