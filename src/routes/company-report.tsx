import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import ErrorIcon from '../icons/error'
import WarningIcon from '../icons/warning'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
//@ts-ignore
import _ from 'lodash'
import {Stats} from 'fs';

type StatisticCardProps = any
const StaticticsCard = ({isCurrent, onClick, percentage, title, amount}: StatisticCardProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'outline-none rounded-md flex flex-col items-center flex-1 pt-[32px] pb-[15px]',
        isCurrent
          ? amount > 0
            ? 'bg-primary-light text-white'
            : 'bg-red-200 text-white'
          : 'bg-white'
      )}>
      <div className={clsx(
        isCurrent
          ? 'bg-[rgba(248,_248,_248,_0.25)]'
          : amount > 0
            ? 'bg-primary-hover text-primary-dark'
            : 'bg-red-100 text-red-200 ',
        isCurrent
          ? 'text-white'
          : amount > 0
            ? 'text-primary-dark'
            : 'text-red-200',
        'w-[144px] text-center leading-[36px] rounded-[18px]'
      )}>
        21,5%
      </div>
      <div className='text-xl mt-[13px] font-semibold'>
        ₽ {amount}
      </div>
      <div className='-mt-[2px]'>
        {title}
      </div>
    </button>
  )
}

type ZoneData = {
  type: 'urgent' | 'warning',
  title: string,
  amount: number
}
type ProblematicZoneProps = {
  data: ZoneData
}
const ProblematicZone = ({data: {type, title, amount}}: ProblematicZoneProps) => (
  <div className='flex gap-4'>
    {type === 'warning' &&
      <WarningIcon />
    }
    {type === 'urgent' &&
      <ErrorIcon />
    }
    <div>
      <div className='text-sm text-neutral-500'>
        {title}
      </div>
      <div className='tetx-md text-neutral-800 font-bold'>
        ₽ {amount}
      </div>
    </div>
  </div>
)

type ProblematicZonesProps = {
  zones: Array<ZoneData>
}
const ProblematicZones = ({zones}: ProblematicZonesProps) => {
  return (
    <div className='bg-white p-8 pt-[17px] rounded-lg'>
      <h3 className='text-neutral-900 font-bold text-md mb-4'>
        Проблемные зоны
      </h3>
      <div className='flex flex-col gap-[19px]'>
        {zones.map((zone, index) => (
          <ProblematicZone key={index} data={zone} />
        ))}
      </div>
    </div>
  )
}

const chartTabs = [
  {title: 'Неделя', value: 'WEEK'},
  {title: 'Месяц', value: 'MONTH'},
  {title: 'Год', value: 'YEAR'},
]


const monthNames = [
  "Янв", // Январь
  "Фев", // Февраль
  "Мар", // Март
  "Апр", // Апрель
  "Май", // Май
  "Июн", // Июнь
  "Июл", // Июль
  "Авг", // Август
  "Сен", // Сентябрь
  "Окт", // Октябрь
  "Ноя", // Ноябрь
  "Дек"  // Декабрь
];

function addDaysToDate(date: Date, daysToAdd: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}

const generateData = (startDate: Date, days: number) => {
  let res = []
  let getType = () => Math.random() > 0.5 ? "income" : "expense"
  let getDivision = () => Math.random() > 0.5 ? "B2B" : "B2C"
  let getAmount = () => Math.trunc(Math.random() * 100) * 1000
  let date = startDate
  let endDate = addDaysToDate(date, days)
  while (date < endDate) {
    res.push({
      date: new Date(date),
      type: getType(),
      division: getDivision(),
      amount: getAmount(),
      debt: 0,
    });
    date = addDaysToDate(date, 1)
  }
  return res
}




//@ts-ignore
window.gen = generateData


const getMonthName = (month: string) => monthNames[Number(month.split('-')[month.split('-').length - 1]) - 1]

const computeTotal = (data: Array<any>) =>
  _.sum(data.map((i: any) => i.type === 'income' ? i.amount : -i.amount))

const StatsParam = ({color, name, value}: any) => (
  <>
    <div className='flex flex-1 items-center gap-2'>
      <div className='w-6 h-6 rounded-full' style={{background: color}} />
      <div className='flex-1'>
        <div className='text-neutral-500 text-sm'>
          {name}
        </div>
        <div className='font-bold text-[#323F47]'>
          ₽ {value}
        </div>
      </div>
    </div>
  </>
)

const ChartStats = ({entries, showType, division = 'ANY'}: any) => {
  //  entries = entries.filter((i: any) => i.date > new Date('2022-12-10'))
  //


  const [currentTab, setCurrentTab] = useState('YEAR')
  //filtered by date
  // if year
  if (currentTab === 'YEAR')
    entries = entries.filter((i: any) => i.date >= addDaysToDate((new Date()), -366))
  else if (currentTab === 'MONTH')
    entries = entries.filter((i: any) => i.date >= addDaysToDate((new Date()), -32))
  else // week
    entries = entries.filter((i: any) => i.date >= addDaysToDate((new Date()), -8))
  console.log('datye filtered entries', currentTab, entries)

  let normalizedDates = entries?.map((i: any) => ({...i, date: i.date.toISOString().split('T')[0]}))
  console.log('normalzed dates:', normalizedDates)

  let monthGroup: any
  if (currentTab === 'YEAR')
    monthGroup = _.groupBy(normalizedDates, (v: any) => `${v.date.split('-')[0]}-${v.date.split('-')[1]}`)
  else
    monthGroup = _.groupBy(normalizedDates, (v: any) => `${v.date.split('-')[0]}-${v.date.split('-')[1]}-${v.date.split('-')[2]}`)
  console.log('month group', monthGroup)
  const properDivision = (item: any) => ((division === 'ANY') || (division === item.division))
  const monthArr = Object.keys(monthGroup).map(month => ({
    month,
    //    data: monthGroup[month],
    //    b2b: monthGroup[month].filter((i: any) => i.division === 'B2B'),
    //    b2c: monthGroup[month].filter((i: any) => i.division === 'B2C'),
    b2btotal: computeTotal(monthGroup[month].filter((i: any) => i.division === 'B2B')),
    b2ctotal: computeTotal(monthGroup[month].filter((i: any) => i.division === 'B2C')),
    incomeTotal: computeTotal(monthGroup[month].filter((i: any) => ((i.type === 'income') && (properDivision(i))))),
    expenseTotal: computeTotal(monthGroup[month].filter((i: any) => ((i.type === 'expense') && (properDivision(i))))),
    total: computeTotal(monthGroup[month]),
    monthName: getMonthName(month),
    debt: 0,
  }))
  console.log(monthArr)
  return (
    <div className='bg-white p-8 pt-[17px] rounded-lg mt-8'>
      <div className='flex justify-between'>
        <h3 className='text-neutral-900 font-bold text-md mb-4'>
          Общая статистика
        </h3>
        <Tabs value={currentTab} onChange={setCurrentTab} tabs={chartTabs} />
      </div>
      <ResponsiveContainer height={254}>
        <LineChart
          width={500}
          height={300}
          data={monthArr}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {currentTab === 'YEAR'
            ? <XAxis dataKey="monthName" />
            : <XAxis dataKey='month' />
          }
          <Tooltip />
          <Line type="monotone" dataKey="incomeTotal" stroke="#73CF7A" dot={false} strokeWidth={3} name='Выручка' />
          <Line type="monotone" dataKey="expenseTotal" stroke="#30C7DC" dot={false} strokeWidth={3} name='Затраты' />
          <Line type="monotone" dataKey="total" stroke="#AC74FC" dot={false} strokeWidth={3} name='Итог' />
          <Line type="monotone" dataKey="uv" stroke="#30C7DC" dot={false} strokeWidth={3} name='Затраты' />
          <Line type="monotone" dataKey="pv" stroke="#45AAF2" dot={false} strokeWidth={3} name='Прибыль' />
          <Line type="monotone" dataKey="debt" stroke="#F5E230" dot={false} strokeWidth={3} name='Задолженность' />
          <Line type="monotone" dataKey="uv" stroke="#AC74FC" dot={false} strokeWidth={3} name='Итог' />
        </LineChart>
      </ResponsiveContainer>
      <div className='flex'>
        <StatsParam name='Затраты' value={200000} color={'#30C7DC'} />
        <StatsParam name='Прибыль' value={200000} color={'#45AAF2'} />
        <StatsParam name='Задолженность' value={200000} color={'#F5E230'} />
        <StatsParam name='Итог' value={200000} color={'#AC74FC'} />
      </div>
    </div>
  )
}

type TabsProps = {
  tabs: Array<{
    title: string,
    value: any
  }>,
  value: any,
  onChange: (v: any) => void
}

const Tabs = ({tabs, value, onChange}: TabsProps) => {
  return <div className='flex gap-3'>
    {tabs.map(({title, value: tabValue}) => (
      <div className={clsx(
        'gap-3 flex flex-col cursor-pointer',
        value === tabValue
          ? 'text-neutral-800'
          : 'text-neutral-100'
      )}
        onClick={() => onChange(tabValue)}
      >
        {title}
        <div className={clsx(
          'w-full h-1 bg-primary-light rounded duration-100',
          value === tabValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'
        )} />
      </div>
    ))}
  </div>
}

type ViewMode = 'ANY' | 'B2B' | 'B2C'

const CompanyReport = () => {
  const zones: Array<ZoneData> = [
    {
      title: 'Линейный персонал',
      type: 'urgent',
      amount: 3003670
    },
    {
      title: 'Подразделение разовых работ ФОТ',
      type: 'urgent',
      amount: 901470
    },
    {
      title: 'Бензин (наличные)',
      type: 'urgent',
      amount: 278325
    },
    {
      title: 'Закупка инвентаря',
      type: 'warning',
      amount: 44742
    },
    {
      title: 'Закупка спецодежды/СИЗ',
      type: 'warning',
      amount: 16810
    },
    {
      title: 'Ремонт оборудования',
      type: 'warning',
      amount: 28570
    },
    {
      title: 'Обслуживание автомобиля',
      type: 'warning',
      amount: 47868
    },
    {
      title: 'Форс-мажоры',
      type: 'warning',
      amount: 3003670
    },
    {
      title: 'Рекламные бюджеты (Блогеры)',
      type: 'urgent',
      amount: 101500
    },
    {
      title: 'Рекламные бюджеты (Контекст)',
      type: 'urgent',
      amount: 200000
    },
  ]
  const [viewMode, setViewMode] = useState<ViewMode>('ANY')
  const [entries, setEntries] = useState<any>([])
  useEffect(() => {
    setEntries(generateData(new Date('2020-10-18'), 365 * 3))
  }, [])
  return (
    <div className='w-full text-left bg-neutral-50 rounded-t-xl rounded-bl-xl flex-1 px-10 py-6'>
      <div className='font-bold text-neutral text-xl'>
        Сводный отчет
      </div>
      <div className='flex gap-10 mt-4'>
        <div className='flex-1'>
          <div>
            <div>
              <div className='flex gap-10'>
                <StaticticsCard
                  title='Итоги'
                  amount={1015764}
                  isCurrent={viewMode === 'ANY'}
                  onClick={() => setViewMode('ANY')}
                />

                <StaticticsCard title='B2B' amount={8615253}
                  isCurrent={viewMode === 'B2B'}
                  onClick={() => setViewMode('B2B')} />
                <StaticticsCard title='B2C' amount={-1542511}
                  isCurrent={viewMode === 'B2C'}
                  onClick={() => setViewMode('B2C')} />
              </div>
            </div>
          </div>
          <ChartStats entries={entries} division={viewMode} />
        </div>
        <ProblematicZones zones={zones} />
      </div>
    </div>
  )
}

export default CompanyReport
