import * as React from 'react'
import classnames from 'classnames'

// @flow
type BaseContainerProps = {
  children?: React.node,
  className?: ?String
}

const createUikBaseContainer = (baseClassName) => {
  const UikBaseContainer = ({
    children,
    className,
    ...rest
  }: BaseContainerProps) => (
    <div
      className={ classnames(baseClassName, className) }
      { ...rest }
    >
      {children}
    </div>
  )

  UikBaseContainer.defaultProps = {
    className: null,
    children: null,
  }

  return UikBaseContainer
}

export default createUikBaseContainer
