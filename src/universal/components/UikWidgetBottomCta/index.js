import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import cls from './widget-bottom-cta.scss'

const UikWidgetBottomCta = ({
  className,
  Component = 'a',
  children,
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </Component>
)

UikWidgetBottomCta.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.any, // eslint-disable-line
  children: PropTypes.node,
}

UikWidgetBottomCta.defaultProps = {
  className: null,
  Component: 'a',
  children: null,
}

export default UikWidgetBottomCta
