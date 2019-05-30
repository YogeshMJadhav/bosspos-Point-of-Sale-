import * as React from 'react'
import classnames from 'classnames'
import cls from './loader-dots.scss'

// @flow
type UikLoaderDots = {
  className?: String
}

const LoaderDots = ({
  className,
}: UikLoaderDots) => (
  <div className={ classnames(cls.dotloader, className, 'btn-loader') }>
    <div className={ cls.dotloader1 } />
    <div className={ cls.dotloader2 } />
    <div className={ cls.dotloader3 } />
  </div>
)


LoaderDots.defaultProps = {
  className: null,
}

export default LoaderDots
