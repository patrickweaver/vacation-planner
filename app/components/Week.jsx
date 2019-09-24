import React from 'react'
import Day from './Day'

export default function Week(props){
  return (
    <ul className="week">
      {props.days.map(function(day, index) {
        return(
          <Day
            key={index}
            date={day.label}
            specialDateProperties={day.specialDateProperties}
            weekNumber={props.weekNumber}
            weekDay={index}
            status={props.statuses[index]}
            changeDayStatus={props.changeDayStatus}
          />
        )
      })}
    </ul>
  )
}