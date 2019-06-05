import React from 'react'
import {Link} from 'react-router-dom'
import Week from './Week'

const weekArrays = [
  ['May 19', 'May 20', 'May 21', 'May 22', 'May 23', 'May 24', 'May 25'],
  ['May 26', 'May 27', 'May 28', 'May 29', 'May 30', 'May 31', 'Jun&nbsp;&nbsp;1'],
  ['Jun&nbsp;&nbsp;2', 'Jun&nbsp;&nbsp;3', 'Jun&nbsp;&nbsp;4', 'Jun&nbsp;&nbsp;5', 'Jun&nbsp;&nbsp;6', 'Jun&nbsp;&nbsp;7', 'Jun&nbsp;&nbsp;8'],
  ['Jun&nbsp;&nbsp;9', 'Jun 10', 'Jun 11', 'Jun 12', 'Jun 13', 'Jun 14', 'Jun 15'],
  ['Jun 16', 'Jun 17', 'Jun 18', 'Jun 19', 'Jun 20', 'Jun 21', 'Jun 22'],
  ['Jun 23', 'Jun 24', 'Jun 25', 'Jun 26', 'Jun 27', 'Jun 28', 'Jun 29'],
  ['Jun 30', 'Jul&nbsp;&nbsp;1', 'Jul&nbsp;&nbsp;2', 'Jul&nbsp;&nbsp;3', 'Jul&nbsp;&nbsp;4', 'Jul&nbsp;&nbsp;5', 'Jul&nbsp;&nbsp;6'],
  ['Jul&nbsp;&nbsp;7', 'Jul&nbsp;&nbsp;8', 'Jul&nbsp;&nbsp;9', 'Jul 10', 'Jul 11', 'Jul 12', 'Jul 13'],
  ['Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18', 'Jul 19', 'Jul 20'],
  ['Jul 21', 'Jul 22', 'Jul 23', 'Jul 24', 'Jul 25', 'Jul 26', 'Jul 27'],
  ['Jul 28', 'Jul 29', 'Jul 30', 'Jul 31', 'Aug&nbsp;&nbsp;1', 'Aug&nbsp;&nbsp;2', 'Aug&nbsp;&nbsp;3'],
  ['Aug&nbsp;&nbsp;4', 'Aug&nbsp;&nbsp;5', 'Aug&nbsp;&nbsp;6', 'Aug&nbsp;&nbsp;7', 'Aug&nbsp;&nbsp;8', 'Aug&nbsp;&nbsp;9', 'Aug 10'],
  ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16', 'Aug 17'],
  ['Aug 18', 'Aug 19', 'Aug 20', 'Aug 21', 'Aug 22', 'Aug 23', 'Aug 24'],
  ['Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29', 'Aug 30', 'Aug 31'],
  ['Sep&nbsp;&nbsp;1', 'Sep&nbsp;&nbsp;2', 'Sep&nbsp;&nbsp;3', 'Sep&nbsp;&nbsp;4', 'Sep&nbsp;&nbsp;5']
]

/* the main page for the index route of this app */
export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.changeDayStatus = this.changeDayStatus.bind(this);
    this.state = {
      changes: 0,
      update12: 1,
      scheduledFridays: 0,
      vacation: 0,
      other: 0,
      weekStatuses: [ 
        [8, 0, 0, 0, 0, 0, 8],
        [8, 3, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 3, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 0, 0, 0, 0, 0, 8],
        [8, 3, 0, 0, 0]
      ]
    };
  }
  
  componentDidMount() {
    var localState = JSON.parse(localStorage.getItem('summerFridayState'));
    
    /* this is to update from version 1.1 */
    
    var newState = localState;
    if (!newState.update12 || newState.update12 === 0) {
      localState.weekStatuses.map((i, iIndex) => {
        i.map((j, jIndex) => {
          if (jIndex === 0 || jIndex === 6) {
            if (j === 0) {
              newState.weekStatuses[iIndex][jIndex] = 8
            }
          }
        })
      })
    }
    
    
    this.setState(newState)
  }
  
  changeDayStatus(event, weekNumber, dayNumber, type) {
    event.preventDefault()
    const currentStatus = this.state.weekStatuses[weekNumber][dayNumber];
    var newStatus;
    if (type === 'left'){
      if (dayNumber === 5) {
        if (currentStatus === 0) {
          newStatus = 1;
        } else if (currentStatus === 1) {
          newStatus = 4;
        } else {
          newStatus = 0;
        }
      }
      if (dayNumber === 0 || dayNumber === 6) {
        if (currentStatus === 8) {
          newStatus = 0;
        } else if (currentStatus === 0) {
          newStatus = 9;
        } else {
          newStatus = 8;
        }
      }
      if (dayNumber > 0 && dayNumber < 5) {
        if (currentStatus === 0) {
          newStatus = 2;
        } else if (currentStatus === 2) {
          newStatus = 5;
        } else {
          newStatus = 0;
        }
      }
    } else {
      if (currentStatus === 6) {
        newStatus = 7;
      } else if (currentStatus === 7) {
        newStatus = 0;
      } else {
        newStatus = 6;
      }
    }
    
    this.setState((prevState, props) => {
      var newStatuses = prevState.weekStatuses
      newStatuses[weekNumber][dayNumber] = newStatus
      
      var vacation = 0;
      var scheduledFridays = 0;
      var other = 0;
      
      newStatuses.map(i => {
        i.map(j => {
          switch(j) {
          case 1:
            scheduledFridays += 1;
            break;
          case 4:
            scheduledFridays += .5;
            break;
          case 2:
            vacation += 1;
            break;
          case 5:
            vacation += .5;
            break;
          case 6:
            other += 1;
            break;
          case 7:
            other += .5;
            break;
          }
        })
      })
      
      return {
        changes: 1,
        scheduledFridays: scheduledFridays,
        vacation: vacation,
        other: other,
        weekStatuses: newStatuses
      }
    }, this.saveToLocal);
  }
  
  saveToLocal() {
    const localState = this.state;
    localStorage.setItem('summerFridayState', JSON.stringify(localState));
  }
  
  render() {
    const weeks = weekArrays.map((week, index) =>
      <div key={week.join('')}>
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
        <h1>Summer Friday Scheduler</h1>

        <ul>
          <li>
            Unscheduled Summer Fridays: {7.5 - this.state.scheduledFridays}
          </li>
          <li>
            Scheduled Summer Fridays: {this.state.scheduledFridays}
          </li>
          <li>
            Vacation Days Used: {this.state.vacation}
          </li>
          <li>
            Misc Days Off: {this.state.other} (Right Click)
          </li>
        </ul>                        
                                   
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