import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Buttons from '../../buttons/Buttons.js';
import Form from '../form/Form';
import Result from '../result/Result';

import './Insecure-deserialization.css';

class InsecureDeserialization extends Component {
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
    var classes = ['insecure-deserialization-container', this.props.isActive ? 'active' : ''];
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
          type='deserialization'
        />
        <div className={_.join(demonstrationClasses, ' ')}>
          <Hacker 
            isActive={this.state.hackerStatus} 
            text='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Il8kJE5EX0ZVTkMkJF9mdW5jdGlvbiAoKXsgcmV0dXJuICdoYWNrZWQhISEhJzsgfSgpIiwicGFzc3dvcmQiOiJMb25kb24iLCJpYXQiOjE2MDc1NDI3OTR9.SMz7J4ru803fU-Xd5jTuCFRkjrbPCQdwMDrrZEuSSXc' 
            source={hackerIcon} 
            type='nosql'
          />
          <Form 
            forms={{
              title: 'authentication by a token', 
              vulneribility: 'deserialization',
              components: [
                {id: 1, inputs: ['token'], buttons: [{type: 'Send'}], title: 'insecure deserialization', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['token'], buttons: [{type: 'Send'}], title: 'secure deserialization', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Result result={{...result, from: 'deserialization'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default InsecureDeserialization;