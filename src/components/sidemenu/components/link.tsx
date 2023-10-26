import React from 'react'
import {NavLink} from 'react-router-dom'

type LinkProps = {
  to: string,
  children: React.ReactNode
}

const SideMenuLink = ({children, to}: LinkProps) => {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `w-16 h-16 rounded-sm flex items-center justify-center hover:bg-primary-hover rounded-sm cursor-pointer ${isActive ? 'bg-primary-hover' : ''}`
      }
    >
      {children}
    </NavLink>
  )
}

export default SideMenuLink
