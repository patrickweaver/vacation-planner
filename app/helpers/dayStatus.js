/*

Determines the default status for a day

*/


import holidays from './holidays'
import statuses from './statuses'
import getDateObject from './getDateObject'
import importantDates from './importantDates'

export default (dateObject) => {

  dateObject.status = statuses.normal

  for (var k in holidays) {
    
    const holiday = holidays[k]
    const compareDate = dateObject
    // Need to decouple getDateObject and dayStatus to use compareDate to compare unoffset to holiday data
    
    if (holiday.offset){
      // Holidays like Day after Thanksgiving
      var dateObjectClone = dateObject.momentDate.clone();
      compareDate = getDateObject(dateObjectClone.subtract(holiday.offset, 'days'));
    }
    
    if ( // Match by Month and Day:
      compareDate.day === holiday.day
      && compareDate.month.toUpperCase() === holiday.month.substring(0, 3).toUpperCase()
    ) {

      dateObject.status = statuses.holiday;

    } else if ( // Match by Month, Week and Week Day
      compareDate.month.toUpperCase() === holiday.month.substring(0, 3).toUpperCase()
      && compareDate.dow.toUpperCase() === holiday.weekDay.substring(0, 3).toUpperCase()
      && compareDate.weekDayOfMonth === holiday.weekDayOfMonth
    ) {

      dateObject.status = statuses.holiday;

    } else if ( // Match by Month, Negative Week and Week Day
      holiday.weekDayOfMonth < 0
      && compareDate.month.toUpperCase() === holiday.month.substring(0, 3).toUpperCase()
      && compareDate.dow.toUpperCase() === holiday.weekDay.substring(0, 3).toUpperCase()
    ) {

      var dateObjectClone = compareDate.momentDate.clone()
      const laterSameDayOfWeek = getDateObject(dateObjectClone.add(-1 * holiday.weekDayOfMonth * 7, 'days'));


      if (laterSameDayOfWeek.weekDayOfMonth === '1') {
        dateObject.status = statuses.holiday
      }
    }   
    

    if (dateObject.status === statuses.holiday) {
      dateObject.specialDateProperties.push('holiday')
      dateObject.note = holiday.name
      dateObject.emoji = holiday.emoji
      break;
    }
  }
  
  // Overwrite holidays with weekends if on a weekend:
  if (dateObject.dow === 'Sun' || dateObject.dow === 'Sat'){
    dateObject.status = statuses.weekend
  }


  if (dateObject.status === statuses.normal) {
    // Check for in rollover period:
    if (dateObject.momentDate.isBetween(
      importantDates.rolloverPeriodStart,
      importantDates.rolloverPeriodEnd,
      'day',
      '[]'
    )) {
      dateObject.specialDateProperties.push('rollover')
    }
    
    // Check for in Summer Friday period, and Friday:
    if (
      dateObject.momentDate.isBetween(
        importantDates.summerFridayPeriodStart,
        importantDates.summerFridayPeriodEnd,
        'day',
        '[]'
      )
      &&
      dateObject.dow === 'Fri'
    ) {
      dateObject.specialDateProperties.push('summerFriday')
    }
    
  }
  return dateObject
}