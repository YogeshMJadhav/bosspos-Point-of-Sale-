import * as React from 'react'
import classnames from 'classnames'

import cls from './nav-section.scss'

// @flow
type UikNavSectionProps = {
  children?: React.node,
  className?: ?String
}

const UikNavSection = ({
  children,
  className,
  ...rest
}: UikNavSectionProps) => (
  <section
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </section>
)

UikNavSection.defaultProps = {
  className: null,
  children: null,
}

export default UikNavSection
