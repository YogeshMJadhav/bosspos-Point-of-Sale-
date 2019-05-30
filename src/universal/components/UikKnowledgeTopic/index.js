import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import UikWidget from '../UikWidget'
import UikAvatar from '../UikAvatar'
import UikonWrap from '../UikonWrap'
import UikTag from '../UikTag'
import UikDropdown from '../UikDropdown'
import UikDropdownItem from '../UikDropdownItem'

import DisplayComponentAction from './DisplayComponentAction'

import cls from './knowledge-topic.scss'

const UikKnowledgeTopic = ({
  children,
  Component,
  className,
  icon,
  title,
  description,
  users,
  isAdmin,
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    padding
    { ...rest }
  >
    <UikonWrap { ...icon } />
    <div className={ cls.content }>
      <h2 className={ cls.title }>
        <a className={ cls.link }>
          {title}
        </a>
        {isAdmin && (
          <UikTag
            className={ cls.tag }
            color="green"
          >
            Admin
          </UikTag>
        )}
      </h2>
      <p>
        {description}
      </p>
    </div>
    {
      users && (
        <div className={ cls.users }>
          {
            users.map(user => (
              <UikAvatar
                key={ user.imgUrl }
                { ...user }
              />
            ))
          }
        </div>
      )
    }
    {
      isAdmin && (
        <UikDropdown
          className={ cls.action }
          DisplayComponent={ DisplayComponentAction }
          position="bottomRight"
        >

          <UikDropdownItem>
          Settings
          </UikDropdownItem>
          <UikDropdownItem>
          Your Profile
          </UikDropdownItem>
          <UikDropdownItem>
          Help & Support center
          </UikDropdownItem>
          <UikDropdownItem>
          Logout
          </UikDropdownItem>

        </UikDropdown>
      )
    }
  </Component>
)

UikKnowledgeTopic.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  Component: PropTypes.any, // eslint-disable-line
  title: PropTypes.string.isRequired,
  description: PropTypes.string,

  /* data */
  isAdmin: PropTypes.bool,
  icon: PropTypes.instanceOf(Object).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    action: PropTypes.oneOf([
      'like',
      'comment',
    ]).isRequired,
  })),
}

UikKnowledgeTopic.defaultProps = {
  className: null,
  description: null,
  users: null,
  isAdmin: false,
  children: null,
  Component: UikWidget,
}

export default UikKnowledgeTopic
