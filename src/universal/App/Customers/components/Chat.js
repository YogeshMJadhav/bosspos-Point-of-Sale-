import * as React from 'react'

import {
  UikNavSectionTitle,
  UikNavSection,
  UikAvatarMenuContainer,
  UikAvatar,
} from '@components'

import {
  UikNavPanel,
} from '@containers'

import people from '../assets/avatarPeople'
import avatarYourPages from '../assets/avatarYourPages'
import avatarGroups from '../assets/avatarGroups'

const SocialChat = () => (
  <UikNavPanel positionRight>
    <UikNavSection>
      <UikNavSectionTitle>
        Your Pages
      </UikNavSectionTitle>
      <UikAvatarMenuContainer>
        {
          avatarYourPages.map(avatar => (
            <UikAvatar
              key={ avatar.name }
              highlighted
              { ...avatar }
            />
          ))
        }
      </UikAvatarMenuContainer>
    </UikNavSection>
    <UikNavSection>
      <UikNavSectionTitle>
        Contacts
      </UikNavSectionTitle>
      <UikAvatarMenuContainer>
        {
          people.map(person => (
            <UikAvatar
              key={ person.name }
              highlighted
              imgUrl={ person.imgUrl }
              name={ person.name }
              status={ person.status }
            />
          ))
        }
      </UikAvatarMenuContainer>
    </UikNavSection>
    <UikNavSection>
      <UikNavSectionTitle>
        Groups
      </UikNavSectionTitle>
      <UikAvatarMenuContainer>
        {
          avatarGroups.map(avatar => (
            <UikAvatar
              key={ avatar.name }
              highlighted
              { ...avatar }
            />
          ))
        }
      </UikAvatarMenuContainer>
    </UikNavSection>
    <UikNavSection>
      <UikNavSectionTitle>
        More Contacts
      </UikNavSectionTitle>
      <UikAvatarMenuContainer>
        {
          people.map(({
            name,
            imgUrl,
            status,
          }) => (
            <UikAvatar
              key={ name }
              highlighted
              { ...{
                name,
                imgUrl,
                status,
              } }
            />
          ))
        }
      </UikAvatarMenuContainer>
    </UikNavSection>
  </UikNavPanel>
)

export default SocialChat
