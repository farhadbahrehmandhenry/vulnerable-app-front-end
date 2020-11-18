import React, {Component} from 'react';
import _ from 'lodash';
import './Result-records.css';

class ResultRecords extends Component {
  render() {
    var {record} = this.props;

    return (
      <>
        {this.props.index === 0 &&
          <div className='sql-injection-result-record'>
            <div className='sql-injection-result-record-id'>id</div>
            <div className='sql-injection-result-record-name'>name</div>
            <div className='sql-injection-result-record-phone'>phone</div>
          </div>
        }
        <div className='sql-injection-result-record'>
          <div className='sql-injection-result-record-id'>{record.userId}</div>
          <div className='sql-injection-result-record-name'>{record.firstName}</div>
          <div className='sql-injection-result-record-phone'>{record.phone}</div>
        </div>
      </>

    );
  }
}

export default ResultRecords;