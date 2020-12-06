import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import Buttons from '../../buttons/Buttons.js';
import hackerIcon from '../../../assets/hacker.png';
import ResultRecords from './result-records/Result-records';
import Form from '../form/Form';

import './Sql-injection.css';

class SqlInjection extends Component {
  state = {
    hackerStatus: false,
    scriptStatus: true,
    result: {}
  }

  handleHackerButtonClick({status}) {
    this.setState({hackerStatus: status});
  }

  handleScriptButtonClick({status}) {
    this.setState({scriptStatus: status});
  }

  handleFetchedResult({result}) {
    this.setState({result});
  }

  render() {
    var classes = ['sql-injection-container', this.props.isActive ? 'active' : ''];
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
        />
        <div className={_.join(demonstrationClasses, ' ')}>
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