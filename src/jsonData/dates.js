import moment from 'moment'

export const dates = [
  {
    value: 'mon',
    title: 'Пн',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    disabled: false,
    status: 'active',
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 2)).toISOString().split('T')[0]
  },
  {
    value: 'tue',
    title: 'Вт',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    disabled: false,
    status: 'new',
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 3)).toISOString().split('T')[0]
  },
  {
    value: 'wed',
    title: 'Ср',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    status: 'new',
    disabled: false,
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 4)).toISOString().split('T')[0]
  },
  {
    value: 'thu',
    title: 'Чт',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    status: 'new',
    disabled: false,
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 5)).toISOString().split('T')[0]
  },
  {
    value: 'fri',
    title: 'Пт',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    status: 'new',
    disabled: false,
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 6)).toISOString().split('T')[0]
  },
  {
    value: 'sat',
    title: 'Сб',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    status: 'new',
    disabled: true,
    date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 1)).toISOString().split('T')[0]
  },
  {
    value: 'sun',
    title: 'Вс',
    timeStart: '08:00',
    timeEnd: '20:00',
    dinnerStart: '00:00',
    dinnerEnd: '00:00',
    status: 'new',
    disabled: true,
    date: moment().startOf('week').toDate().toISOString().split('T')[0]
  },
]