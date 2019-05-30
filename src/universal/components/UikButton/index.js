import * as React from 'react'
import classnames from 'classnames'

import cls from './btn.scss'

import UikLoaderDots from '../UikLoaderDots'

// @flow
type UikButtonProps = {
  children?: React.node,
  Component?: React.ElementType,
  className?: String,
  contentClassName?: String,
  href?: String,
  type?: String,

  // appearence

  xs?: Boolean,
  lg?: Boolean,
  primary?: Boolean,
  warning?: Boolean,
  error?: Boolean,
  success?: Boolean,

  clear?: Boolean,
  isLoading?: Boolean,
  whiteBorder?: Boolean,
  dark?: Boolean,
  // icon properties
  icon?: React.node,
  iconRight?: Boolean,
}

export default class Button extends React.PureComponent<UikButtonProps> {
  static defaultProps = {
    Component: 'button',
    primary: false,
    warning: false,
    error: false,
    success: false,
    dark: false,
    className: null,
    contentClassName: null,
    clear: false,
    whiteBorder: false,
    // link?
    href: null,
    to: null,
    xs: false,
    lg: false,
    isLoading: false,
    type: 'button',
    children: null,
    icon: null,
    iconRight: false,
  }

  render() {
    const {
      Component,
      primary,
      warning,
      error,
      success,
      dark,
      children,
      className,
      contentClassName,
      whiteBorder,
      xs,
      lg,
      clear,
      isLoading,
      type,
      icon,
      iconRight,
      ...rest
    } = this.props

    const classes = classnames(
      cls.base,
      {
        [cls.primary]: primary,
        [cls.warning]: warning,
        [cls.error]: error,
        [cls.success]: success,
        [cls.xs]: xs,
        [cls.lg]: lg,
        [cls.clear]: clear,
        [cls.whiteBorder]: whiteBorder,
        [cls.isLoading]: isLoading,
        [cls.dark]: dark,
        [cls.hasIcon]: icon,
        [cls.iconRight]: iconRight,
      },
      className,
    )

    // put props together so we don't have to repeat it
    const btnProps = {
      className: classes,
      ...rest,
    }

    return (
      <Component
        { ...btnProps }
        type={ Component === 'button' ? type : null }
      >
        {
          icon && (
          <div className={ cls.iconWrapper }>
            {icon}
          </div>
          )
        }
        {
          isLoading && <UikLoaderDots className={ cls.loader } />
        }
        <div className={ classnames(cls.content, contentClassName) }>
          {children}
        </div>
      </Component>
    )
  }
}
