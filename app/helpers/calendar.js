import moment from 'moment'
import getDateObject from './getDateObject'
import dayStatus from './dayStatus'

export default function calendar(startDate, endDate) {
  const dateRange = []
  var date = moment(startDate)
  date = date.subtract(date.day(), 'days')
  
  var mEndDate = moment(endDate)
  mEndDate = mEndDate.add(6 - mEndDate.day(), 'days')
  
  
  const range = (mEndDate - date) / (60 * 60 * 24 * 1000)
  
  for (var i = 0; i <= range; i++) {
    
    const dateObject = getDateObject(date)
    const dateObjectWithStatus = dayStatus(dateObject)
    
    dateRange.push(dateObjectWithStatus);
    date = date.add(1, 'days');
  }
  
  
  var calArray = []
  var week = []
  // Make all dates equal length and separate by weeks
  for (var i in dateRange) {
    var dateObject = dateRange[i]
    if (dateObject.day.length === 1) {
      dateObject.label = dateObject.month + '&nbsp;&nbsp;' + dateObject.day
    } else {
      dateObject.label = dateObject.month + '&nbsp;' + dateObject.day
    }
    
    
    // **** DEBUGGING VISUALLY
    /*
    if (dateObject.note.length > 0) {
      dateObject.label += '&nbsp;' + dateObject.note.substring(0, 5)
    } else {
      dateObject.label += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    }
    */
    
    week.push(dateObject)

    if (week.length === 7) {
      calArray.push(week)
      week = []
    }
  }
    
  return calArray
    
}