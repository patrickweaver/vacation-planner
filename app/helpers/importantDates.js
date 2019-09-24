var dates = {
  startDate:                '2019-01-01',
  endDate:                  '2019-12-31',
  rolloverPeriodStart:      '2019-01-01',
  rolloverPeriodEnd:        '2019-03-31',
  summerFridayPeriodStart:  '2019-05-24',
  summerFridayPeriodEnd:    '2019-08-30'
}

for (var i in dates) {
  dates[i] = new Date(dates[i])
}

export default dates