import * as React from 'react'
import classnames from 'classnames'

import cls from './widget-table.scss'

// @flow
type UikWidgetTableProps = {
  children?: React.node,
  className?: ?String,
}

const UikWidgetTable = ({
  children,
  className,
  ...rest
}: UikWidgetTableProps) => (
  <table
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </table>
)

UikWidgetTable.defaultProps = {
  className: null,
  children: null,
}

export default UikWidgetTable
