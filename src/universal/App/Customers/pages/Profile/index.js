import * as React from 'react'

import {
  UikSocialHeader,
  UikSocialWidgetFriends,
  UikSocialWidgetAbout,

} from '@components'


import {
  UikLayoutMain,
} from '@containers'


import people from '../../assets/avatarPeople'
import about from '../../assets/about'

import CoverImage from '../../assets/images/cover.png'
import * as images from '@exampleAssets'


const SocialProfile = () => (
  <UikLayoutMain contentCenterMedium>
    <UikSocialHeader
      avatar={ {
        imgUrl: images.a10,
      } }
      imgUrl={ CoverImage }
      margin
      name="Rachel Rose"
    />
    <UikSocialWidgetAbout
      data={ about }
      margin
    />
    <UikSocialWidgetFriends
      data={
        people.map(({
          name,
          imgUrl,
          textBottom,
        }) => ({
          name,
          imgUrl,
          textBottom,
        }))
      }
      margin
    />


  </UikLayoutMain>
)

export default SocialProfile
