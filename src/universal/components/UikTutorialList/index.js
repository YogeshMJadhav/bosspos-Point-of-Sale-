import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './tutorial-list.scss'

const TutorialList = ({
  children,
  className,
  ...rest
}) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </div>
)

TutorialList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

TutorialList.defaultProps = {
  className: null,
}

export default TutorialList
