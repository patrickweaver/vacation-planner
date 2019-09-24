import moment from 'moment'
import statuses from './statuses'

export default (currentStatus, weekNumber, dayNumber, specialDateProperties, clickType) => {
  
  var newStatus
  if (clickType === 'left'){
    
    /* Weekend */
    /* Cycle through:
         -> Weekend
            Normal (Working on weekend)
            Half Weekend
    */
    if (dayNumber === 0 || dayNumber === 6) {
      
      switch(currentStatus) {
        case statuses.weekend:
          newStatus = statuses.normal;
          break;
        case statuses.normal:
          newStatus = statuses.weekendHalf;
          break;
        case statuses.weekendHalf:
          newStatus = statuses.weekend;
          break;
      }

    } else {
      /* Special Types */
      /* Cycle through:
          -> Special Type
             Normal
             Half Special Type
      */
      
      switch(currentStatus) {
        case statuses.holiday:
        case statuses.vacation:
        case statuses.rolloverVacation:
        case statuses.summerFriday:
        case statuses.other:
          newStatus = statuses.normal;
          break;
        
        /*
        When a day is normal, have to check
        if it is elligible to be anything else:
        */
          
        case statuses.normal:
          // Check for Holiday:
          if (specialDateProperties.indexOf('holiday') >= 0) {
            newStatus = statuses.holidayHalf;
          }
          
          // Check if in rollover vacation period:
          else if (specialDateProperties.indexOf('rollover') >= 0) {
            newStatus = statuses.rolloverVacationHalf;
          }
          
          // Check if in Summer Friday Period and on a Friday:
          else if (specialDateProperties.indexOf('summerFriday') >= 0) {
            newStatus = statuses.summerFridayHalf;
          }
          
          // Any other day can be vacation:
          else {
            newStatus = statuses.vacationHalf;
          }
          
          break;
          
        case statuses.holidayHalf:
          newStatus = statuses.holiday;
          break;
        case statuses.vacationHalf:
          newStatus = statuses.vacation;
          break;
        case statuses.rolloverVacationHalf:
          newStatus = statuses.rolloverVacation;
          break;
        case statuses.summerFridayHalf:
          newStatus = statuses.summerFriday;
          break;
      }
    
    
    }
  } else { // Right Click
    
    if (currentStatus === statuses.other) {
      newStatus = statuses.normal;
    } else if (currentStatus === statuses.otherHalf) {
      newStatus = statuses.other;
    } else {
      newStatus = statuses.otherHalf;
    }

  }
  return newStatus
}