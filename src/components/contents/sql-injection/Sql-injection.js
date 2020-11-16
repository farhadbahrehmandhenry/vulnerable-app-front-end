import React, {Component} from 'react';
import _ from 'lodash';
import SqlInjectionForm from './sql-injection-form/Sql-injection-form';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import ResultRecords from './result-records/Result-records';

import './Sql-injection.css';

class SqlInjection extends Component {
  state = {
    hackerStatus: false,
    result: {}
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
  }

  handleFetchedResult({result}) {
    this.setState({result});
  }

  render() {
    var classes = ['sql-injection-container', this.props.isActive ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='sql-injection-hacker-button-container'>
          <div className='sql-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='sql-injection-demonstration'>
          <Hacker isActive={this.state.hackerStatus}/>
          <div className='sql-injection-forms'>
            <SqlInjectionForm type='bad' handleFetch={({result}) => this.handleFetchedResult({result})}/>
            <SqlInjectionForm type='good' handleFetch={({result}) => this.handleFetchedResult({result})}/>
          </div>
          <div className='sql-injection-result-conteiner'>
            {result.type === 'error' ? 
              <div className='sql-injection-result-error'>error</div> :
              result.type === 'success' && result.res.length > 0 ? 
              result.res.map((record, index) => <ResultRecords record={record} index={index} key={index}/> ) :
              result.type === 'success' && result.res.length === 0 ?
              <div className='sql-injection-result-error'>error</div> :
              <div className='sql-injection-result-waiting'>waiting!!!!</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SqlInjection;