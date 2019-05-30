import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import UikButton from '../UikButton'

import cls from './menuDrop.scss'

const DefaultDisplayComponent = ({ className, ...rest }) => (
  <UikButton
    className={ classnames(cls.defaultDisplayComponent, className) }
    contentClassName={ cls.btnContent }
    { ...rest }
  >
    &middot;&middot;&middot;
  </UikButton>
)

DefaultDisplayComponent.propTypes = {
  className: PropTypes.string,
}

DefaultDisplayComponent.defaultProps = {
  className: null,
}

export default DefaultDisplayComponent
