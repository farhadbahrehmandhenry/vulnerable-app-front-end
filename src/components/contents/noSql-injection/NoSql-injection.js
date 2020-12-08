import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Buttons from '../../buttons/Buttons.js';
import Form from '../form/Form';
import Result from '../result/Result';

import './NoSql-injection.css';

class NoSqlInjection extends Component {
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
    var classes = ['nosql-injection-container', this.props.isActive ? 'active' : ''];
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
          type='nosql'
        />
        <div className={_.join(demonstrationClasses, ' ')}>
          <Hacker isActive={this.state.hackerStatus} text='{"$gte": 0}' source={hackerIcon} type='nosql'/>
          <Form 
            forms={{
              title: 'Log in', 
              vulneribility: 'noSql',
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'insecure noSql', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'secure noSql', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Result result={{...result, from: 'noSql'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default NoSqlInjection;