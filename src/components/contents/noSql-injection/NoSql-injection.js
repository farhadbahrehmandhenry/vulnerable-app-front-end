import React, {Component} from 'react';
import _ from 'lodash';
import SqlInjectionForm from './nosql-injection-form/NoSql-injection-form';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import ResultRecords from './result-records/Result-records';

import './NoSql-injection.css';

class NoSqlInjection extends Component {
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
    var classes = ['nosql-injection-container', this.props.isActive ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='nosql-injection-hacker-button-container'>
          <div className='nosql-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='nosql-injection-demonstration'>
          <Hacker isActive={this.state.hackerStatus}/>
          <div className='nosql-injection-forms'>
            <SqlInjectionForm type='bad' handleFetch={({result}) => this.handleFetchedResult({result})}/>
            <SqlInjectionForm type='good' handleFetch={({result}) => this.handleFetchedResult({result})}/>
          </div>
          <div className='nosql-injection-result-conteiner'>
            {result.type === 'error' ? 
              <div className='nosql-injection-result-error'>error</div> :
              result.type === 'success' && result.res.length > 0 ? 
              result.res.map((record, index) => <ResultRecords record={record} index={index} key={index}/> ) :
              result.type === 'success' && result.res.length === 0 ?
              <div className='nosql-injection-result-error'>error</div> :
              <div className='nosql-injection-result-waiting'>waiting!!!!</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NoSqlInjection;