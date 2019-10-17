import calendar from '../../helpers/calendar'

test('Sunday before "10-2-2019" is "9-29-2019"', () => {
  const startDate = new Date('10-2-2019');
  const endDate = new Date('11-1-2019');
  expect(calendar(startDate, endDate)[0][0].label).toBe('Sep&nbsp;29');
})

test('Saturday after "11-1-2019" is "11-2-2019"', () => {
  const startDate = new Date('10-2-2019');
  const endDate = new Date('11-1-2019');
  expect(calendar(startDate, endDate).reverse()[0][6].label).toBe('Nov&nbsp;&nbsp;2');
})

test('Sunday before "1-5-2019" is "12-30-2018"', () => {
  const startDate = new Date('1-5-2019');
  const endDate = new Date('2-1-2019');
  expect(calendar(startDate, endDate)[0][0].label).toBe('Dec&nbsp;30');
})

test('Saturday after "12-31-2018" is "1-5-2019"', () => {
  const startDate = new Date('12-1-2018');
  const endDate = new Date('12-31-2018');
  expect(calendar(startDate, endDate).reverse()[0][6].label).toBe('Jan&nbsp;&nbsp;5');
})

test('Sunday before "3-2-2024" is "2-25-2024"', () => {
  const startDate = new Date('3-2-2024');
  const endDate = new Date('10-31-2024');
  expect(calendar(startDate, endDate)[0][0].label).toBe('Feb&nbsp;25');
})

test('Saturday after "2-28-2024" is "3-2-2024"', () => {
  const startDate = new Date('2-1-2024');
  const endDate = new Date('2-28-2024');
  expect(calendar(startDate, endDate).reverse()[0][6].label).toBe('Mar&nbsp;&nbsp;2');
})

test('Weeks should be 7 days long', () => {
  const startDate = new Date('9-3-2019');
  const endDate = new Date('9-4-2019');
  expect(calendar(startDate, endDate)[0].length).toBe(7);
})

test('2019 should have 53 weeks', () => {
  const startDate = new Date('1-1-2019');
  const endDate = new Date('12-31-2019');
  expect(calendar(startDate, endDate).length).toBe(53);
})

test('Week starts on Sunday', () => {
  const startDate = new Date('9-9-2019');
  const endDate = new Date('10-31-2019');
  expect(calendar(startDate, endDate)[0][0].dow).toBe('Sun');
})

test('Week ends on Saturday', () => {
  const startDate = new Date('9-9-2019');
  const endDate = new Date('10-31-2019');
  expect(calendar(startDate, endDate)[0][6].dow).toBe('Sat');
})

test('9/8/2019 is in September', () => {
  const startDate = new Date('9-8-2019');
  const endDate = new Date('10-15-2019');
  expect(calendar(startDate, endDate)[0][0].month).toBe('Sep');
})

test('9/8/2019 is in September', () => {
  const startDate = new Date('9-8-2019');
  const endDate = new Date('10-15-2019');
  const compiledCalendar = calendar(startDate, endDate);
  expect(compiledCalendar[compiledCalendar.length - 1][6].month).toBe('Oct');
})