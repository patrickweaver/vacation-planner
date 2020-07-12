/* 

Determines the status that will come next when a day is clicked on

*/


import moment from 'moment'
import statuses from './statuses'
import importantNumbers from './importantNumbers'

export default (currentStatus, weekNumber, dayNumber, specialDateProperties, clickType, vacationDaysRemaining, rolloverVacationUsed, summerFridayDaysRemaining) => {
  
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
        case statuses.otherHalf:
        case statuses.nextYearVacationHalfRolloverVacationHalf:
        case statuses.nextYearVacation:
        case statuses.summerFridayHalfVacationHalf:
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
            if (summerFridayDaysRemaining > 0) {
              newStatus = statuses.summerFridayHalf;
            } else {
              newStatus = statuses.vacationHalf;
            }
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
          if (summerFridayDaysRemaining > 0) {
            newStatus = statuses.summerFriday;
          } else if (summerFridayDaysRemaining === 0) {
            newStatus = statuses.summerFridayHalfVacationHalf;
          } else {
            newStatus = statuses.vacation;
          }
          break;
        default:
          newStatus = statuses.normal;
      }
    
    
    }
  } else { // Right Click
    
    // Don't do anything for right clicks on weekend or holidays:
    if (
      dayNumber === 0
      || dayNumber === 6
      || specialDateProperties.indexOf('holiday') >= 0
    
    ) {
      newStatus = currentStatus
    } else {
    // Otherwise schedule an 'other' day
      if (currentStatus === statuses.other) {
        newStatus = statuses.normal;
      } else if (currentStatus === statuses.otherHalf) {
        newStatus = statuses.other;
      } else {
        newStatus = statuses.otherHalf;
      }
    }

  }
  return newStatus
}