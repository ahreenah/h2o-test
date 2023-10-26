import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidemenu from '../components/sidemenu'

const MainLayout = () => {
  return (
    <div className='flex bg-gradient-to-b from-primary-light to-primary-dark h-screen'>
      <Sidemenu />
      <div className='bg-white flex-1 rounded-l-xl flex flex-col'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
