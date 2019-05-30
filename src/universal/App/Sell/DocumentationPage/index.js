import * as React from 'react'

/* eslint-disable max-len */

import {
  UikNavSection,
  UikNavLink,
  UikNavLinkSecondary,
  UikWidgetDoc,
  UikWidgetContent,
} from '@components'

import {
  UikCodeHighlightContainer,
} from '@componentWrappers'


import {
  UikNavPanel,
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain,
} from '@containers'

import cls from './page-documentation.scss'

import menuLinks from './assets/menuLinks'
import code from './assets/code'

// components
import Header from '../components/Header'

import DocTableExample from './DocTableExample'
import DocTableExample2 from './DocTableExample2'


const KnowledgeDocumentationPage = () => (
  <UikContainerVertical className={ cls.wrapper }>
    <Header />
    <UikContainerHorizontal>
      <UikNavPanel>
        <UikNavSection>
          {
            menuLinks.map(link => (
              <React.Fragment key={ link.text }>
                <UikNavLink
                  key={ link.text }
                  className={ link.text === 'Collections' ? 'active' : null }
                  highlighted
                >
                  {link.text}
                </UikNavLink>
                {
                  link.items && link.items.map(subLink => (

                    <UikNavLinkSecondary
                      key={ subLink.text }
                      highlighted={ subLink.text === 'Model' ? 'active' : null }
                    >
                      {subLink.text}
                    </UikNavLinkSecondary>
                  ))
                }
              </React.Fragment>
            ))
          }
        </UikNavSection>
      </UikNavPanel>
      <UikLayoutMain outerProps={ {
        className: cls.mainContent,
      } }
      >
        <UikWidgetDoc
          margin
        >
          <UikWidgetContent>
            <h1>
              Collections
            </h1>
            <p>
              Collections in Knowledge are groupings of Items and define the schema or structure of the custom data stored in those Items. A Knowledge site can have multiple attached Collections. A Collection’s fields define the structure of the Items within it.
            </p>
          </UikWidgetContent>
          <UikWidgetContent>
            <h2>
              Model
            </h2>
          </UikWidgetContent>
          <DocTableExample />
          <UikWidgetContent>
            <h3>
              Default Fields
            </h3>
            <p>
              Each collection has a number of fields that are always present. Some of these fields are editable and some of them cannot be changed by users.
            </p>
          </UikWidgetContent>
          <DocTableExample2 />
        </UikWidgetDoc>
      </UikLayoutMain>
      <UikCodeHighlightContainer
        className={ cls.codeContent }
        data={ code }
      />
    </UikContainerHorizontal>
  </UikContainerVertical>
)

export default KnowledgeDocumentationPage
