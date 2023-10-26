import clsx from 'clsx'
import React from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import DownArrowIcon from '../icons/downArrow'

type ButtonProps = {
  children: React.ReactNode
}

const Button = ({children}: ButtonProps) => (
  <button className='rounded-full w-[40px] h-[40px] shadow-xl shadow-neutral-300'>
    {children}
  </button>
)

type TabLinksProps = {
  links: Array<{
    to: string;
    title: string
  }>
}

const TabLinks = ({links}: TabLinksProps) => {
  return (
    <div className='grid gap-[5px] grid-cols-[max-content_auto_361px] px-10 py-[50px]'>
      <div className='flex gap-2'>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 76 65" fill="none">
            <g>
              <path d="M32.0167 33.6799L39.1992 25.0609C39.4986 24.7017 40.0833 24.9134 40.0833 25.381L40.0833 42.619C40.0833 43.0866 39.4986 43.2983 39.1992 42.9391L32.0167 34.3201C31.8622 34.1347 31.8622 33.8653 32.0167 33.6799Z" fill="#D2D1D1" />
            </g>
          </svg>

        </Button>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 76 65" fill="none">
            <g>
              <path d="M43.9833 34.3201L36.8008 42.9391C36.5014 43.2983 35.9167 43.0866 35.9167 42.619L35.9167 25.381C35.9167 24.9134 36.5014 24.7017 36.8008 25.0609L43.9833 33.6799C44.1378 33.8653 44.1378 34.1347 43.9833 34.3201Z" fill="#989FA3" />
            </g>
          </svg>
        </Button>
      </div>
      <div className='flex border-b border-neutral-200 overflow-x-scroll ml-[41px] mr-[80px] gap-[39px] scrollbar-hide' style={{overflow: 'scroll hidden'}}>
        {/*!overflow-y-visible'>*/}
        {links.map(({to, title}) => (
          <NavLink to={to} className={({isActive}) =>
            clsx(
              'w-max block shrink-0 flex flex-col justify-center overflow_visible',
              isActive ? 'text-neutral-900 font-bold' : 'text-neutral-100'
            )
          }>
            {({isActive}) => (
              <>
                {title}
                {isActive && (
                  <div className='h-0 overflow-visible'>
                    <div className='h-3 bg-primary-light mt-1'>

                    </div>
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className='flex items-center flex-1 max-w-[361px] justify-between'>
        <div className=' flex items-center gap-[25px]'>
          <img src={require('../static/demo-photo.png')} className='w-14 h-14 rounded-full' />
          <div className='text-left'>
            <div>Кристина</div>
            <div className='text-sm text-neutral-300'>Менеджер продаж</div>
          </div>
        </div>
        <DownArrowIcon />
      </div>
    </div>
  )
}

const Reports = () => {
  return (
    <div className='flex flex-col flex-1 nax-w-screen overflow-y-auto'>
      <TabLinks links={[
        {to: 'employees', title: 'Свод данных по сотрудникам'},
        {to: 'company', title: 'Сводный отчет внутри компании'},
        {to: 'payments', title: 'Сводный отчет по сделкам'},
      ]} />
      <Outlet />
    </div>
  )
}

export default Reports
