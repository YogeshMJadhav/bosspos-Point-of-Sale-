import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './content.scss'


export { default as UikContentItem } from './UikContentItem'

const UikContent = ({
  className,
  children,
  contentCenter,
  ...rest
}) => (
  <div
    className={ classnames(cls.wrapper, className, {

      [cls.contentCenter]: contentCenter,
    }) }
    { ...rest }
  >
    {children}
  </div>
)

UikContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Whether to display content in the center (1170px)
   */
  contentCenter: PropTypes.bool,
}

UikContent.defaultProps = {
  className: null,
  contentCenter: false,
}

export default UikContent
