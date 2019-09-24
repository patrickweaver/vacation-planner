export default (momentDate) => {
  const dateObject = {
    momentDate: momentDate,
    day: momentDate.format('D'),
    dow: momentDate.format('ddd'),
    month: momentDate.format('MMM'),
    weekDayOfMonth: Math.ceil(momentDate.date() / 7).toString(), // https://stackoverflow.com/questions/21737974/moment-js-how-to-get-week-of-month-google-calendar-style
    label: '',
    specialDateProperties: [],
    note: '',
    emoji: ''
  };
  
  return dateObject
}