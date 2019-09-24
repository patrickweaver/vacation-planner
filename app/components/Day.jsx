import React from 'react'
import statuses from '../helpers/statuses'

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    var classes = 'day'

    switch(this.props.status) {
      case statuses.weekend:
        classes += ' weekend';
        break;
      case statuses.weekendHalf:
        classes += ' weekend-half';
        break;
      case statuses.holiday:
        classes += ' holiday';
        break;
      case statuses.holidayHalf:
        classes += ' holiday-half';
        break;
      case statuses.halfVacation:
        classes += ' holiday-half';
        break;
      case statuses.vacation:
        classes += ' vacation';
        break;
      case statuses.vacationHalf:
        classes += ' vacation-half';
        break;
      case statuses.rolloverVacation:
        classes += ' rollover-vacation';
        break;
      case statuses.rolloverVacationHalf:
        classes += ' rollover-vacation-half';
        break;
      case statuses.summerFriday:
        classes += ' summer-friday';
        break;
      case statuses.summerFridayHalf:
        classes += ' summer-friday-half';
        break;
      case statuses.other:
        classes += ' other';
        break;
      case statuses.otherHalf:
        classes += ' other-half';
        break;
      default:
        classes += '';
    }

    return (
      <li
        className={classes}
        dangerouslySetInnerHTML={{__html: this.props.date}}
        onClick={e => this.props.changeDayStatus(e, this.props.weekNumber, this.props.weekDay, this.props.specialDateProperties, 'left')}
        onContextMenu={e => this.props.changeDayStatus(e, this.props.weekNumber, this.props.weekDay, 'right')}
      ></li>
    )
  }
}