import moment from 'moment'
import statuses from './statuses'
import importantNumbers from './importantNumbers'

export default (currentStatus, weekNumber, dayNumber, specialDateProperties, clickType, vacationDaysRemaining, rolloverVacationUsed) => {
  
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
        case statuses.nextYearVacationHalfRolloverVacationHalf:
        case statuses.nextYearVacation:
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
          // Then check if vacation days remain to use as rollover
          else if (specialDateProperties.indexOf('rollover') >= 0) {
            
            // if current year vacation days remain
            if (
              vacationDaysRemaining > 0
              && rolloverVacationUsed < importantNumbers.rolloverVacationLimit
            ) {
              newStatus = statuses.rolloverVacationHalf;
            } else if (
              vacationDaysRemaining > 0
              && rolloverVacationUsed < importantNumbers.rolloverVacationLimit - 0.5
            ){ // If .5 from rollover limit can use half and half day
              newStatus = statuses.nextYearVacationHalfRolloverVacationHalf;
            } else { // Otherwise use next year days
              newStatus = statuses.nextYearVacationHalf;
              
            }
          }       
          
          // Check if in Summer Friday Period and on a Friday:
          else if (specialDateProperties.indexOf('summerFriday') >= 0) {
            newStatus = statuses.summerFridayHalf;
          }
          
          // Any other day can be vacation:
          // If there are vacation days remaining
          else if (vacationDaysRemaining > 0) {
            newStatus = statuses.vacationHalf;
          } else {
            // If no other condition applies leave as normal:
            newStatus = statuses.normal;
            alert('No vacation days remaining')
          }
          
          break;
          
        case statuses.holidayHalf:
          newStatus = statuses.holiday;
          break;
        case statuses.vacationHalf:
          newStatus = statuses.vacation;
          break;
        case statuses.rolloverVacationHalf:
          // If no vacation days remain or too many rollovers used do half and half:
          if (
            vacationDaysRemaining > 0
            && rolloverVacationUsed < importantNumbers.rolloverVacationLimit
          ) {
            newStatus = statuses.rolloverVacation;
          } else {
            newStatus = statuses.nextYearVacationHalfRolloverVacationHalf;
          }
          
          break;
        case statuses.nextYearVacationHalf:
            newStatus = statuses.nextYearVacation;
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