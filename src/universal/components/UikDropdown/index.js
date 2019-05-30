import * as React from 'react'
import classnames from 'classnames'
import UikOutsideClickHandler from '../UikOutsideClickHandler'

import cls from './menuDrop.scss'
import DefaultDisplayComponent from './DefaultDisplayComponent'

// @flow
type UikDropdownProps = {
  className?: String,
  children: React.node,
  DisplayComponent?: React.ElementType,
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
  listProps?: Object,
  displayComponentProps?: Object,
}

export default class UikDropdown extends React.PureComponent<UikDropdownProps> {
  static defaultProps = {
    className: null,
    position: 'bottomLeft',
    DisplayComponent: DefaultDisplayComponent,
    listProps: {},
    displayComponentProps: {},
  }

  state = {
    focused: false,
  }

  handleToggleFocus = () => {
    const { focused, displayComponentProps } = this.state
    if (displayComponentProps && typeof displayComponentProps.onClick === 'function') {
      displayComponentProps.onClick()
    }
    this.setState({ focused: !focused })
  };

  render() {
    const {
      children,
      className,
      position,
      DisplayComponent,
      displayComponentProps: {
        onClick,
        ...otherDisplayComponentProps
      },
      listProps: { listClassName, ...otherListProps },
      ...rest
    } = this.props

    const { focused } = this.state

    return (
      <UikOutsideClickHandler
        className={ className }
        onOutsideClick={ focused ? this.handleToggleFocus : null }
        onOutsideScroll={ false }
        style={ { position: 'relative', display: 'inline-block' } }
        { ...rest }
      >
        <DisplayComponent
          onClick={ this.handleToggleFocus }
          { ...otherDisplayComponentProps }
        />
        {
          focused && (
            <div
              className={ classnames(cls.list, listClassName, {
                [cls[position]]: position,
              }) }
              { ...otherListProps }
            >
              {children}
            </div>
          )
        }

      </UikOutsideClickHandler>
    )
  }
}
