import statuses from '../../helpers/statuses'
import nextStatus from '../../helpers/nextStatus'

//(currentStatus, weekNumber, dayNumber, specialDateProperties, clickType, vacationDaysRemaining, rolloverVacationUsed) 

test('After weekend on Saturday shoud be normal work day', () => {
  expect(nextStatus(statuses.weekend, 1, 6, [], 'left', 10, 0)).toBe(statuses.normal)
})

test('After normal work day on Saturday shoud be half-weekend', () => {
  expect(nextStatus(statuses.normal, 1, 6, [], 'left', 10, 0)).toBe(statuses.weekendHalf)
})

test('After half-weekend on Saturday shoud be weekend', () => {
  expect(nextStatus(statuses.weekendHalf, 1, 6, [], 'left', 10, 0)).toBe(statuses.weekend)
})

test('After holiday on non-weekend holiday should be normal work day', () => {
  expect(nextStatus(statuses.holiday, 1, 4, ['holiday'], 'left', 10, 0)).toBe(statuses.normal)
})

test('After weekend on weekend holiday should be normal work day', () => {
  expect(nextStatus(statuses.weekend, 1, 6, ['holiday'], 'left', 10, 0)).toBe(statuses.normal)
})

test('After half-weekend on weekend holiday should be weekend', () => {
  expect(nextStatus(statuses.weekendHalf, 1, 6, ['holiday'], 'left', 10, 0)).toBe(statuses.weekend)
})

test('After normal work day on weekend holiday should be half-weekend', () => {
  expect(nextStatus(statuses.normal, 1, 6, ['holiday'], 'left', 10, 0)).toBe(statuses.weekendHalf)
})

test('After holiday on Friday that is summer friday eligible should be normal work day', () => {
  expect(nextStatus(statuses.holiday, 1, 5, ['holiday', 'summerFriday'], 'left', 10, 0)).toBe(statuses.normal)
})

test('After vacation on Wednesday shoud be normal work day', () => {
  expect(nextStatus(statuses.vacation, 1, 3, [], 'left', 10, 0)).toBe(statuses.normal)
})

test('After normal work day on Wednesday shoud be half-vacation', () => {
  expect(nextStatus(statuses.normal, 1, 3, [], 'left', 10, 0)).toBe(statuses.vacationHalf)
})

test('After half-vacation on Wednesday shoud be vacation', () => {
  expect(nextStatus(statuses.vacationHalf, 1, 3, [], 'left', 10, 0)).toBe(statuses.vacation)
})

test('After normal work Wednesday in rollover period should be half rollover', () => {
  expect(nextStatus(statuses.normal, 1, 3, ['rollover'], 'left', 10, 0)).toBe(statuses.rolloverVacationHalf)
})

test('After normal work Friday in Summer Friday period should be half summer friday', () => {
  expect(nextStatus(statuses.normal, 1, 5, ['summerFriday'], 'left', 10, 0)).toBe(statuses.summerFridayHalf)
})

test('Right click on normal work day should be other half', () => {
  expect(nextStatus(statuses.normal, 1, 4, [], 'right', 10, 0)).toBe(statuses.otherHalf)
})


// These next two cases are confusing because for the .5 remaining example, when the day started as normal there was 1 remaining, which is half used by the current status of halfRollover.

test('After half rollover should be full rollover when .5 vacation day remains', () => {
  expect(nextStatus(statuses.rolloverVacationHalf, 1, 3, ['rollover'], 'left', .5, .5)).toBe(statuses.rolloverVacation)
})

test('After half rollover should be half rollover half vacation when 0 vacation day remain', () => {
  expect(nextStatus(statuses.rolloverVacationHalf, 1, 3, ['rollover'], 'left', 0, .5)).toBe(statuses.nextYearVacationHalfRolloverVacationHalf)
})

test('After normal day in rollover period should be next year vacation half when 0 vacation days remain', () => {
  expect(nextStatus(statuses.normal, 1, 3, ['rollover'], 'left', 0, 0)).toBe(statuses.nextYearVacationHalf)
})

test('After next year vacation half in rollover period should be next year full vacation when 0 vacation day remains', () => {
  expect(nextStatus(statuses.nextYearVacationHalf, 1, 3, ['rollover'], 'left', 0, 0)).toBe(statuses.nextYearVacation)
})

test('After full next year vacation in rollover period should be normal day', () => {
  expect(nextStatus(statuses.nextYearVacation, 1, 3, ['rollover'], 'left', 0, 0)).toBe(statuses.normal)
})

// Dealing with max rollover

test('After normal day in rollover period should be next year vacation half when vacation days remain but 5 rollover days are used', () => {
  expect(nextStatus(statuses.normal, 1, 3, ['rollover'], 'left', 1, 5)).toBe(statuses.nextYearVacationHalf)
})

test('After rollover half in rollover period should be next year vacation half rollover half when vacation days remain but 5 rollover days have been used', () => {
  expect(nextStatus(statuses.rolloverVacationHalf, 1, 3, ['rollover'], 'left', 1, 5)).toBe(statuses.nextYearVacationHalfRolloverVacationHalf)
})

test('Right clicking on weekend full should do nothing', () => {
  expect(nextStatus(statuses.weekend, 1, 6, ['rollover'], 'right', 0, 0)).toBe(statuses.weekend)
})

test('Right clicking on weekend half should do nothing', () => {
  expect(nextStatus(statuses.weekendHalf, 1, 6, ['rollover'], 'right', 0, 0)).toBe(statuses.weekendHalf)
})

test('Right clicking on normal day on a Saturday (weekend) should do nothing', () => {
  expect(nextStatus(statuses.normal, 1, 6, ['rollover'], 'right', 0, 0)).toBe(statuses.normal)
})

test('Right clicking on a holiday should do nothing', () => {
  expect(nextStatus(statuses.holiday, 1, 3, ['holiday'], 'right', 0, 0)).toBe(statuses.holiday)
})

test('Right clicking on a holiday half should do nothing', () => {
  expect(nextStatus(statuses.holidayHalf, 1, 3, ['holiday'], 'right', 0, 0)).toBe(statuses.holidayHalf)
})


