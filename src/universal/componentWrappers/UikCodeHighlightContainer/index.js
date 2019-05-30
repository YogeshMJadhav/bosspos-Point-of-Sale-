import classnames from 'classnames'
import * as React from 'react'


import UikCodeHighlight from '../UikCodeHighlight'
import UikTabContainer from '../../components/UikTabContainer'
import UikTabItem from '../../components/UikTabItem'

import cls from './content-code.scss'

// @flow
type UikContentCodeProps = {
  className?: ?String,
  Component?: React.ElementType,
  data: Object,
  defaultActiveLang?: String,
  maxHeight?: Boolean,
}

class UikContentCode extends React.PureComponent<UikContentCodeProps> {
  static defaultProps = {
    className: null,
    Component: 'div',
    defaultActiveLang: null,
    maxHeight: false,
  }

  constructor(props, ...rest) {
    super(props, ...rest)
    this.state = {
      activeLang: props.defaultActiveLang || (props.data && Object.keys(props.data)[0]) || null,
    }
  }

  setActiveLang = activeLang => () => {
    console.log(activeLang)
    this.setState({
      activeLang,
    })
  }

  render() {
    const {
      className,
      Component,
      data,
      maxHeight,
      defaultActiveLang,
      ...rest
    } = this.props

    const { activeLang } = this.state
    const languages = Object.keys(data)

    return (
      <Component
        className={ classnames(cls.wrapper, className, {
          [cls.maxHeight]: maxHeight,
        }) }
        { ...rest }
      >
        {
          languages.length > 1 && (
            <UikTabContainer className={ cls.tabContainer }>
              {
              languages.map(lang => (
                <UikTabItem
                  key={ lang }
                  className={ classnames(
                    cls.tabItem, {
                      active: (lang === activeLang),
                    },
                  ) }
                  onClick={ this.setActiveLang(lang) }
                  size="small"
                  text={ lang }
                />
              ))
            }
            </UikTabContainer>
          )
        }
        <div className={ cls.codeWrapper }>
          <UikCodeHighlight
            key={ activeLang }
            code={ data[activeLang] }
            language={ activeLang }
          >
            {data[activeLang]}
          </UikCodeHighlight>

        </div>
      </Component>
    )
  }
}

export default UikContentCode
