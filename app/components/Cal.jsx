const cookieName = 'winterCalState'

import React from 'react'
import {Link} from 'react-router-dom'

import Week from './Week'

import calendar from '../helpers/calendar'
import nextStatus from '../helpers/nextStatus'
import importantDates from '../helpers/importantDates'


const weekArrays = calendar(importantDates.startDate, importantDates.endDate)

/* the main page for the index route of this app */
export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.changeDayStatus = this.changeDayStatus.bind(this);
    this.state = {
      changes: 0,
      vacation: 0,
      rolloverVacation: 0,
      summerFriday: 0,
      other: 0,
      weekStatuses: weekArrays.map(week => {
        return week.map(day => day.status)
      })
    };
  }
  
  componentDidMount() {
    /*
    var localState = JSON.parse(localStorage.getItem(cookieName));
    
    // this is to update from version 1.1
    if (localState){
      var newState = localState;
      localState.weekStatuses.map((i, iIndex) => {
        i.map((j, jIndex) => {
          if (jIndex === 0 || jIndex === 6) {
            if (j === 0) {
              newState.weekStatuses[iIndex][jIndex] = 8
            }
          }
        })
      })
      this.setState(newState)
    }
    */
  }
  
  changeDayStatus(event, weekNumber, dayNumber, specialDateProperties, clickType) {
    event.preventDefault()
    const currentStatus = this.state.weekStatuses[weekNumber][dayNumber];
    var newStatus = nextStatus(currentStatus, weekNumber, dayNumber, specialDateProperties, clickType);
    
    this.setState((prevState, props) => {
      var newStatuses = prevState.weekStatuses
      newStatuses[weekNumber][dayNumber] = newStatus
      
      var vacation = 0;
      var rolloverVacation = 0;
      var summerFriday = 0;
      var other = 0;
      
      newStatuses.map(i => {
        i.map(j => {
          switch(j) {
          case 5:
            vacation += 1;
            break;
          case 6:
            vacation += .5;
            break;
          case 7:
            rolloverVacation += 1;
            break;
          case 8:
            rolloverVacation += .5;
            break;
          case 9:
            summerFriday += 1;
          case 10:
            summerFriday += .5;    
          case 11:
            other += 1;
            break;
          case 12:
            other += .5;
            break;
          }
        })
      })
      
      return {
        changes: 1,
        vacation: vacation,
        rolloverVacation: rolloverVacation,
        summerFriday: summerFriday,
        other: other,
        weekStatuses: newStatuses
      }
    }, this.saveToLocal);
  }
  
  saveToLocal() {
    const localState = this.state;
    localStorage.setItem(cookieName, JSON.stringify(localState));
  }
  
  render() {
    
    const weekKey = (w) => w.reduce((a, i) => a + i.label, '')
    
    const weeks = weekArrays.map((week, index) =>
      <div key={weekKey(week)}>
        <Week
          days={week}
          statuses={this.state.weekStatuses[index]}
          weekNumber={index}
          changeDayStatus={this.changeDayStatus}
        />
      </div>
    )


    return (
      <div>
        <h1 id="app-title">Vacation Planner</h1>

        <ul id="tally">
          <li>
            Rollover Vacation Days Used: {this.state.rolloverVacation}
          </li>
          <li>
            Vacation Days Used: {this.state.vacation}
          </li>
          <li>
            Unscheduled Summer Fridays: {7.5 - this.state.summerFriday}
          </li>
          <li>
            Scheduled Summer Fridays: {this.state.summerFriday}
          </li>
          <li>
            Misc Days Off: {this.state.other} (Right Click)
          </li>
        </ul>
        
        <div id="key-container">
          <h3>Key:</h3>
          <ul id="key">
            <li>Weekend:</li>
            <li className="day weekend">Jan&nbsp;&nbsp;1</li>
            <li>Holiday:</li>
            <li className="day holiday">Jan&nbsp;&nbsp;1</li>
            <li>Vacation:</li>
            <li className="day vacation">Jan&nbsp;&nbsp;1</li>
            <li>Rollover Vacation:</li>
            <li className="day rollover-vacation">Jan&nbsp;&nbsp;1</li>
            <li>Summer Friday:</li>
            <li className="day summer-friday">Jan&nbsp;&nbsp;1</li>
            <li>Other:</li>
            <li className="day other">Jan&nbsp;&nbsp;1</li>
          </ul>
        </div>
                                   
        <ul className="week">
          <li className="label">Sunday</li>
          <li className="label">Monday</li>
          <li className="label">&nbsp;Tues&nbsp;</li>
          <li className="label">&nbsp;Weds&nbsp;</li>
          <li className="label">&nbsp;Thur&nbsp;</li>
          <li className="label">Friday</li>
          <li className="label">&nbsp;Satr&nbsp;</li>
        </ul>
        {weeks}
      </div>
    )
  }
}