const cookieName = 'winterCalState'

import React from 'react'

import Week from './Week'

import calendar from '../helpers/calendar'
import nextStatus from '../helpers/nextStatus'
import importantDates from '../helpers/importantDates'
import importantNumbers from '../helpers/importantNumbers'
import statuses from '../helpers/statuses'


const weekArrays = calendar(importantDates.startDate, importantDates.endDate)

/* the main page for the index route of this app */
export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.changeDayStatus = this.changeDayStatus.bind(this);
    this.vacationDaysRemaining = this.vacationDaysRemaining.bind(this);
    this.saveVacation = this.saveVacation.bind(this);
    this.state = {
      changes: 0,
      vacationLeft: importantNumbers.defaultVacationDays,
      vacation: 0,
      rolloverVacation: 0,
      nextYearVacation: 0,
      summerFriday: 0,
      other: 0,
      weekStatuses: weekArrays.map(week => {
        return week.map(day => day.status)
      })
    };
  }
  
  componentDidMount() {

    var localState = JSON.parse(localStorage.getItem(cookieName));
    
    // this is to update from version 1.1
    if (localState){
      var newState = localState;
      this.setState(newState)
    }

  }
  
  vacationDaysRemaining() {
    return this.state.vacationLeft - (this.state.vacation + this.state.rolloverVacation)
  }
  
  changeDayStatus(event, weekNumber, dayNumber, specialDateProperties, clickType) {
    event.preventDefault()
    const currentStatus = this.state.weekStatuses[weekNumber][dayNumber];
    var newStatus = nextStatus(currentStatus, weekNumber, dayNumber, specialDateProperties, clickType, this.vacationDaysRemaining(), this.state.rolloverVacation);
    
    this.setState((prevState, props) => {
      var newStatuses = prevState.weekStatuses
      newStatuses[weekNumber][dayNumber] = newStatus
      
      var vacation = 0;
      var nextYearVacation = 0;
      var rolloverVacation = 0;
      var summerFriday = 0;
      var other = 0;
      
      newStatuses.map(i => {
        i.map(j => {
          switch(j) {
          case statuses.vacation:
            vacation += 1;
            break;
          case statuses.vacationHalf:
            vacation += .5;
            break;
          case statuses.rolloverVacation:
            rolloverVacation += 1;
            break;
          case statuses.rolloverVacationHalf:
            rolloverVacation += .5;
            break;
          case statuses.summerFriday:
            summerFriday += 1;
          case statuses.summerFridayHalf:
            summerFriday += .5;    
          case statuses.other:
            other += 1;
            break;
          case statuses.otherHalf:
            other += .5;
            break;
          case statuses.nextYearVacationHalfRolloverVacationHalf:
            nextYearVacation += .5;
            rolloverVacation += .5;
            break;
          case statuses.nextYearVacation:
            nextYearVacation += 1;
            break;
          case statuses.nextYearVacationHalf:
            nextYearVacation += .5;
            break;
          }
        })
      })
      
      return {
        changes: 1,
        vacation: vacation,
        rolloverVacation: rolloverVacation,
        nextYearVacation: nextYearVacation,
        summerFriday: summerFriday,
        other: other,
        weekStatuses: newStatuses
      }
    }, this.saveToLocal);
  }
  
  saveVacation(event) {
    this.setState({vacationLeft: event.target.value});
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
        <h1 id="app-title">❄️ Winter Vacation Planner ❄️</h1>

        <ul id="tally">
          <li>
            <strong>2019 Vac. Days Left To Use: </strong><input className="days-input" onChange={this.saveVacation} value={this.state.vacationLeft}></input>
          </li>
          <hr/>
          <li>
            2019 Vac. Days Scheduled (including Rollover): {this.state.vacation + this.state.rolloverVacation}
          </li>
          <li>
            2019 Vac. Days Remaining: {this.vacationDaysRemaining()}
          </li>
          <li>
            Rollover Vac. Days Scheduled: {this.state.rolloverVacation}
          </li>
          <li>
            2020 Vac. Days Scheduled: {this.state.nextYearVacation}
          </li>
          <li>
            Misc Days Off: {this.state.other} (Right Click)
          </li>
        </ul>
                                   
        <ul id="day-labels" className="week">
          <li className="label">Sunday</li>
          <li className="label">Monday</li>
          <li className="label">&nbsp;Tues&nbsp;</li>
          <li className="label">&nbsp;Weds&nbsp;</li>
          <li className="label">&nbsp;Thur&nbsp;</li>
          <li className="label">Friday</li>
          <li className="label">&nbsp;Satr&nbsp;</li>
        </ul>
        {weeks}
                                   
                                   
        <div id="key-container">
          <h3>Key:</h3>
          <ul id="key">
            <li>
              <label>Weekend:</label>
              <div className="day weekend">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Holiday:</label>
              <div className="day holiday">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Vacation:</label>
              <div className="day vacation">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Rollover Vacation:</label>
              <div className="day rollover-vacation">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Next Year Vacation:</label>
              <div className="day next-year-vacation">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Summer Friday:</label>
              <div className="day summer-friday">Jan&nbsp;&nbsp;1</div>
            </li>
            <li>
              <label>Other:</label>
              <div className="day other">Jan&nbsp;&nbsp;1</div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}