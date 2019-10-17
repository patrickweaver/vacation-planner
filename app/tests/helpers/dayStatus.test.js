import moment from 'moment'
import dayStatus from '../../helpers/dayStatus'
import getDateObject from '../../helpers/getDateObject'
import importantDates from '../../helpers/importantDates'
import statuses from '../../helpers/statuses'

// Month and Day Holiday
test("January 1 is New Year's Day", () => {
  const day = moment('2019-01-01')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).note).toBe("New Year's Day");
})

test("January 1 (New Year's Day) is a holiday", () => {
  const day = moment('2019-01-01')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('holiday')).toBeGreaterThanOrEqual(0);
})

// Regular Day
test("January 2 is not a holiday", () => {
  const day = moment('2019-01-02')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).status).toBe(statuses.normal);
})

// Rollover Vacation
test("Thursday January 2, 2020 is an eligible rollover vacation day", () => {
  const day = moment('2020-01-02')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject, true).specialDateProperties.indexOf('rollover')).toBeGreaterThanOrEqual(0);
})

test("Monday April 1 is not an eligible rollover vacation day", () => {
  const day = moment('2019-04-01')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('rollover')).toBeLessThanOrEqual(0);
})

// Last Monday of Month
test("May 27 2019 is Memorial Day", () => {
  const day = moment('2019-05-27')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).note).toBe("Memorial Day")
})

test("May 27 2019 is Memorial Day is a holiday", () => {
  const day = moment('2019-05-27')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('holiday')).toBeGreaterThanOrEqual(0);
})

// False positives for last Monday of Month:
test("Memorial Day is only May 27 2019", () => {
  const day = moment('2019-01-01')
  for (var i = 0; i < 365; i++) {
    var compareDay = day.clone()
    compareDay.add(i, 'days')
    if (compareDay.format('YYYY-MM-DD') != '2019-05-27'){
      const dateObject = getDateObject(compareDay)
      expect(dayStatus(dateObject).note).not.toBe("Memorial Day")
    }
  }
})

// Summer Fridays:
test("Friday June 7 is an eligible Summer Friday", () => {
  const day = moment('2019-06-07')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('summerFriday')).toBeGreaterThanOrEqual(0);
})

// In SF period, but not Friday
test("Thursday June 6 is not an eligible Summer Friday", () => {
  const day = moment('2019-06-07')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('summerFriday')).toBeLessThanOrEqual(0);
})

// Friday before SF period
test("Friday May 17 is not an eligible Summer Friday", () => {
  const day = moment('2019-05-17')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('summerFriday')).toBeLessThanOrEqual(0);
})

// Friday after SF period
test("Friday September 13 is not an eligible Summer Friday", () => {
  const day = moment('2019-09-13')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('summerFriday')).toBeLessThanOrEqual(0);
})

// Last day of SF period
test("End date of Summer Friday period is an eligible Summer Friday", () => {
  const day = moment(importantDates.summerFridayPeriodEnd)
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).specialDateProperties.indexOf('summerFriday')).toBeGreaterThanOrEqual(0);
})


// Month and Day
test("July 4 2019 is Independence Day", () => {
  const day = moment('2019-07-04')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).note).toBe("Independence Day")
})

// First Monday of Month
test("September 2 2019 is Labor Day", () => {
  const day = moment('2019-09-02')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).note).toBe("Labor Day")
})

// Day after 4th Thursday (testing offset)
test("November 29 2019 is Day After Thanksgiving", () => {
  const day = moment('2019-11-29')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).note).toBe("Day After Thanksgiving")
})

// Weekend Holiday should be weekends:
test("Saturday December 28 should be a weekend not a holiday", () => {
  const day = moment('2019-12-28')
  const dateObject = getDateObject(day)
  expect(dayStatus(dateObject).status).toBe(statuses.weekend)
})