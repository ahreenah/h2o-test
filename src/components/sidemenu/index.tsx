import React from 'react'
import Logo from '../../icons/logo'
import BoxIcon from '../../icons/box'
import CalendarIcon from '../../icons/calendar'
import ChartIcon from '../../icons/chart'
import CoinsIcon from '../../icons/coins'
import ListIcon from '../../icons/list'
import PeopleIcon from '../../icons/people'
import SettingsIcon from '../../icons/settings'
import SideMenuLink from './components/link'

const Sidemenu = () => {
  return (
    <div className='flex flex-col items-center w-[127px] py-[55px] gap-[26px]'>
      <div className='mb-[48px]'>
        <Logo />
      </div>
      <SideMenuLink to='/events'>
        <CalendarIcon />
      </SideMenuLink>
      <SideMenuLink to='/list'>
        <ListIcon />
      </SideMenuLink>
      <SideMenuLink to='/items'>
        <BoxIcon />
      </SideMenuLink>
      <SideMenuLink to='/employees'>
        <PeopleIcon />
      </SideMenuLink>
      <SideMenuLink to='/profit'>
        <CoinsIcon />
      </SideMenuLink>
      <SideMenuLink to='/reports'>
        <ChartIcon />
      </SideMenuLink>
      <SideMenuLink to='/settings'>
        <SettingsIcon />
      </SideMenuLink>
    </div>
  )
}

export default Sidemenu
