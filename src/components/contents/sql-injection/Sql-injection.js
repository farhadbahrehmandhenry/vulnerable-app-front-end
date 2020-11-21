import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import ResultRecords from './result-records/Result-records';
import Form from '../form/Form';

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
          <Hacker isActive={this.state.hackerStatus}  text='3 OR 1=1' source={hackerIcon} type='sql'/>
          <Form 
            forms={{
              title: 'Find user by id', 
              vulneribility: 'sql',
              components: [
                {id: 1, inputs: ['userId'], buttons: [{type: 'Find'}], title: 'insecure Sql', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['userId'], buttons: [{type: 'Find'}], title: 'secure Sql', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
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