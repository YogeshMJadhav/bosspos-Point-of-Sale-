import * as React from 'react'
import classnames from 'classnames'

import IconWrap from '../UikonWrap'

import cls from './widget-link.scss'

// @flow
type UikWidgetLinkProps = {

  className?: String,
  Component?: React.ElementType, // eslint-disable-line
  icon?: React.ElementType,
  title: React.ElementType,
  rightEl?: React.ElementType,
}

const UikWidgetLink = ({
  className,
  Component = 'a',
  icon,
  title,
  rightEl,
  ...rest
}: UikWidgetLinkProps) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {
      icon && (
      <IconWrap
        { ...icon }
        className={ cls.icon }
      />
      )
    }
    <span className={ cls.title }>
      {title}
    </span>
    {
      rightEl && (
      <span className={ cls.rightEl }>
        {rightEl}
      </span>
      )
    }
  </Component>
)

UikWidgetLink.defaultProps = {
  className: null,
  Component: 'a',
  icon: null,
  rightEl: null,
}

export default UikWidgetLink
