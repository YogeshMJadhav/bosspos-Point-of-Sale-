import * as React from 'react'
import * as images from '@exampleAssets'
import { Uikon } from '@components'

export default [
  {
    avatarPlaceholder: {
      color: 'lightblue',
      content: 'JR',
    },
    textBottom: 'Past: Lambo and BMW',
    name: (
      <React.Fragment>
        <i>
          Designer at
        </i>
        {' '}
        <strong>
          Jeep Renegade
        </strong>
      </React.Fragment>
    ),
  },
  {
    imgUrl: images.a01,
    textBottom: 'Together since October 15, 2015',
    name: (
      <React.Fragment>
        <i>
          In a relationship with
        </i>
        {' '}
        <strong>
          Craig Reid
        </strong>
      </React.Fragment>
    ),
  },
  {
    avatarPlaceholder: {
      content: (
        <Uikon>
          add
        </Uikon>
      ),
    },
    name: (
      <i>
        Add a school
      </i>
    ),
  },
  {
    avatarPlaceholder: {
      content: (
        <Uikon>
          phone
        </Uikon>
      ),
    },
    name: '+420 755 666 214',
    textBottom: '+44 (0) 7490 199 222',
  },
  {
    imgUrl: images.pl01,
    textBottom: 'Originally from Prague, Czech Republic',
    name: (
      <React.Fragment>
        <i>
          Lives in
        </i>
        {' '}
        <strong>
          London, United Kingdom
        </strong>
      </React.Fragment>
    ),
  },
  {
    avatarPlaceholder: {
      content: (
        <Uikon>
          profile_round
        </Uikon>
      ),
    },
    name: 'https://instagram.com/janlosert',
    textBottom: 'https://janlosert.com, https://dribbble.com/JanLosert',
  },
]
