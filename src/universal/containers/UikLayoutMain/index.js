import * as React from 'react'
import classnames from 'classnames'

import cls from './layout-main.scss'

// @flow
type UikLayoutMainProps = {
  children: React.node,
  className?: ?String,
  contentCenter?: Boolean,
  contentCenterMedium?: Boolean,
  contentLeft?: Boolean,
  outerProps?: ?Object
}

const UikLayoutMain = ({
  className,
  outerProps: {
    className: classNameOuter,
    ...outerProps
  },
  children,
  contentCenter,
  contentCenterMedium,
  contentLeft,
  ...rest
}: UikLayoutMainProps) => (
  <div
    className={ classnames(cls.wrapper, classNameOuter) }
    { ...outerProps }
  >
    <div
      className={ classnames(cls.wrapperInner, className, {
        [cls.contentCenter]: contentCenter,
        [cls.contentCenterMedium]: contentCenterMedium,
        [cls.contentLeft]: contentLeft,
      }) }
      { ...rest }
    >
      {children}
    </div>
  </div>
)

UikLayoutMain.defaultProps = {
  className: null,
  contentCenter: false,
  contentCenterMedium: false,
  contentLeft: false,
  outerProps: {},
}

export default UikLayoutMain
