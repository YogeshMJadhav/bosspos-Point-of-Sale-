import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './top-bar-section.scss'

const UikTopBarSection = ({ children, className, ...rest }) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </div>
)

UikTopBarSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

UikTopBarSection.defaultProps = {
  className: null,
}

export default UikTopBarSection
