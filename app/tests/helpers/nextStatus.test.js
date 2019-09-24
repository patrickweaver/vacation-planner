import statuses from '../../helpers/statuses'
import nextStatus from '../../helpers/nextStatus'

//(currentStatus, weekNumber, dayNumber, specialDateProperties, clickType) 

test('After weekend on Saturday shoud be normal work day', () => {
  expect(nextStatus(statuses.weekend, 1, 6, [], 'left')).toBe(statuses.normal)
})

test('After normal work day on Saturday shoud be half-weekend', () => {
  expect(nextStatus(statuses.normal, 1, 6, [], 'left')).toBe(statuses.weekendHalf)
})

test('After half-weekend on Saturday shoud be weekend', () => {
  expect(nextStatus(statuses.weekendHalf, 1, 6, [], 'left')).toBe(statuses.weekend)
})

test('After holiday on non-weekend holiday should be normal work day', () => {
  expect(nextStatus(statuses.holiday, 1, 4, ['holiday'], 'left')).toBe(statuses.normal)
})

test('After weekend on weekend holiday should be normal work day', () => {
  expect(nextStatus(statuses.weekend, 1, 6, ['holiday'], 'left')).toBe(statuses.normal)
})

test('After half-weekend on weekend holiday should be weekend', () => {
  expect(nextStatus(statuses.weekendHalf, 1, 6, ['holiday'], 'left')).toBe(statuses.weekend)
})

test('After normal work day on weekend holiday should be half-weekend', () => {
  expect(nextStatus(statuses.normal, 1, 6, ['holiday'], 'left')).toBe(statuses.weekendHalf)
})

test('After holiday on Friday that is summer friday eligible should be normal work day', () => {
  expect(nextStatus(statuses.holiday, 1, 5, ['holiday', 'summerFriday'], 'left')).toBe(statuses.normal)
})

test('After vacation on Wednesday shoud be normal work day', () => {
  expect(nextStatus(statuses.vacation, 1, 3, [], 'left')).toBe(statuses.normal)
})

test('After normal work day on Wednesday shoud be half-vacation', () => {
  expect(nextStatus(statuses.normal, 1, 3, [], 'left')).toBe(statuses.vacationHalf)
})

test('After half-vacation on Wednesday shoud be vacation', () => {
  expect(nextStatus(statuses.vacationHalf, 1, 3, [], 'left')).toBe(statuses.vacation)
})

test('After normal work Wednesday in rollover period should be half rollover', () => {
  expect(nextStatus(statuses.normal, 1, 3, ['rollover'], 'left')).toBe(statuses.rolloverVacationHalf)
})

test('After normal work Friday in Summer Friday period should be half summer friday', () => {
  expect(nextStatus(statuses.normal, 1, 5, ['summerFriday'], 'left')).toBe(statuses.summerFridayHalf)
})

test('Right click on normal work day should be other half', () => {
  expect(nextStatus(statuses.normal, 1, 4, [], 'right')).toBe(statuses.otherHalf)
})