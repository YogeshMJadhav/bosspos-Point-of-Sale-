import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Uikon from '../Uikon'

import cls from './icon-text.scss'

const UikonText = ({
  icon,
  children,
  highlight = false,
  className,
  ...rest
}) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [cls.highlight]: highlight,
    }) }
    { ...rest }
  >
    <Uikon>
      {icon}
    </Uikon>
    <span className={ cls.text }>
      {children}
    </span>
  </div>
)

UikonText.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  highlight: PropTypes.bool,
}

UikonText.defaultProps = {
  className: null,
  highlight: null,
}

export default UikonText
