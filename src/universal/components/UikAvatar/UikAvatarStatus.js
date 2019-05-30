import * as React from 'react'
import cls from './avatar.scss'

// @flow

type UikAvatarStatusProps = {
  status: React.node,
}

const UikAvatarStatus = ({ status }: UikAvatarStatusProps) => (
  <div className={ cls.statusWrapper }>
    {
      status === 'uik_online' ? (
        <div className={ cls.statusOnline } />
      ) : (
        <span>
          {status}
        </span>
      )
    }
  </div>
)

export default UikAvatarStatus
