import React, {Component} from 'react';
import _ from 'lodash';
import NoSqlInjectionForm from './nosql-injection-form/NoSql-injection-form';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';

import './NoSql-injection.css';

class NoSqlInjection extends Component {
  state = {
    hackerStatus: false,
    result: {},
    isSignupVisible: false,
    isLoginVisible: false
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
  }

  handleFetchedResult({result}) {
    this.setState({result});
  }

  render() {
    var classes = ['nosql-injection-container', this.props.isActive ? 'active' : ''];
    var {result, isSignupVisible, isLoginVisible} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='nosql-injection-hacker-button-container'>
          <div className='nosql-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='nosql-injection-demonstration'>
          <Hacker isActive={this.state.hackerStatus} text='{"$gte": 0}' source={hackerIcon} type='nosql'/>
          <>
            <div className='nosql-injection-forms'>
              <div 
                className='nosql-injection-forms-btn' 
                onClick={() => this.setState({isSignupVisible: !isSignupVisible})}
              >Sign up</div>
              <NoSqlInjectionForm 
                type='signup' 
                handleFetch={({result}) => this.handleFetchedResult({result})}
                styleOpacity={isSignupVisible ? 1 : 0}
              />
            </div>
            <div className='nosql-injection-forms'>
              <div 
                className='nosql-injection-forms-btn' 
                onClick={() => this.setState({isLoginVisible: !isLoginVisible})}
              >Log in</div>
              <NoSqlInjectionForm 
                type='bad' 
                handleFetch={({result}) => this.handleFetchedResult({result})}
                styleOpacity={isLoginVisible ? 1 : 0}
              />
              <NoSqlInjectionForm 
                type='good' 
                handleFetch={({result}) => this.handleFetchedResult({result})}
                styleOpacity={isLoginVisible ? 1 : 0}
              />
            </div>
          </>
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