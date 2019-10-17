import moment from 'moment'
import getDateObject from '../../helpers/getDateObject'

test("January 7, 2019 to be 1st Monday in January", () => {
  const day = moment('2019-01-07');
  expect(getDateObject(day).weekDayOfMonth).toBe('1');
})

test("January 31, 2019 to be 5th Thursday in January", () => {
  const day = moment('2019-01-31');
  expect(getDateObject(day).weekDayOfMonth).toBe('5');
})

test("January 7, 2019 to be Monday", () => {
  const day = moment('2019-01-07');
  expect(getDateObject(day).dow).toBe('Mon');
})

test("January 7, 2019 is in January", () => {
  const day = moment('2019-01-07');
  expect(getDateObject(day).month).toBe('Jan');
})

test("January 7, 2019 is 7th day of month", () => {
  const day = moment('2019-01-07');
  expect(getDateObject(day).day).toBe('7');
})