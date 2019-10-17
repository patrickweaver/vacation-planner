var dates = {
  startDate:                '2019-11-10',
  endDate:                  '2020-01-11',
  rolloverPeriodStart:      '2020-01-01',
  rolloverPeriodEnd:        '2020-03-31',
  summerFridayPeriodStart:  '2019-05-24',
  summerFridayPeriodEnd:    '2019-08-30'
}

for (var i in dates) {
  dates[i] = new Date(dates[i])
}

export default dates