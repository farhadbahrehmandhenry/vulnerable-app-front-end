import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';

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
          <Hacker isActive={this.state.hackerStatus} text='{"$gte": 0}' source={hackerIcon} type='nosql'/>
          <Form 
            forms={{
              title: 'Sign up', 
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: ['Sign up'], title: '', type: 'signup', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Form 
            forms={{
              title: 'Log in', 
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: ['Log in'], title: 'insecure noSql', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['username', 'password'], buttons: ['Log in'], title: 'secure noSql', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <div className='nosql-injection-result-conteiner'>
            {result.type === 'error' ? 
              <div className='nosql-injection-result-waiting'>error!!</div> :
              result.type !== 'signup' && (result.res && result.res.userName) ? 
              <div 
                className='nosql-injection-result-waiting'
              >{`Welcome ${result.res.userName}, you successfully logged in!!`}
              </div>:
              <div className='nosql-injection-result-waiting'>waiting!!!!</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NoSqlInjection;