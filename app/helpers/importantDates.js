var dates = {
  startDate:                '2020-05-13',
  endDate:                  '2020-09-09',
  rolloverPeriodStart:      '2020-01-01',
  rolloverPeriodEnd:        '2020-03-31',
  summerFridayPeriodStart:  '2020-05-22',
  summerFridayPeriodEnd:    '2020-09-05'
}

for (var i in dates) {
  dates[i] = new Date(dates[i])
}

export default dates