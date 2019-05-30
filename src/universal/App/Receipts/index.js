import * as React from 'react'
import { Link } from 'react-router-dom'

import {
  UikWidget,
} from '@components'

import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain,
} from '@containers'

import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'

import cls from './app-directory.scss'

import {
  tutorials,
  social,
  documentationDetail,
  analytics,
  documentationListHelp,
} from './assets'

const links = [
  {
    text: 'Knowledge',
    to: '/knowledge/doc',
    imgUrl: documentationDetail,
  },
  {
    text: 'Knowledge',
    to: '/knowledge',
    imgUrl: documentationListHelp,
  },
  {
    text: 'social',
    to: '/social',
    imgUrl: social,
  },
  {
    text: 'tutorials',
    to: '/tutorials',
    imgUrl: tutorials,
  },
  {
    text: 'analytics',
    to: '/analytics',
    imgUrl: analytics,
  },
]

export default class Receipts extends React.PureComponent {
  render() {
    return (
      
        <UikContainerHorizontal> 
        <Navigation />
        <UikContainerVertical>
        <Header />
          <UikLayoutMain
            className={ cls.previewWrapper }
            contentCenter
          >
            {
              links.map(item => (
                <UikWidget
                  key={ item.to }
                  Component={ Link }
                  margin
                  to={ item.to }
                >
                  <img
                    alt={ item.text }
                    className={ cls.imagePreview }
                    src={ item.imgUrl }
                  />
                </UikWidget>
              ))
            }
          </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>

    )
  }
}
