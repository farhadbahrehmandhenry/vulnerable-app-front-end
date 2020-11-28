import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';
import Result from '../result/Result';

import './Ldap-injection.css';

class LdapInjection extends Component {
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
    var classes = ['ldap-injection-container', this.props.isActive ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='ldap-injection-hacker-button-container'>
          <div className='ldap-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='ldap-injection-demonstration'>
          <Hacker isActive={this.state.hackerStatus} text='*' source={hackerIcon} type='ldap'/>
          {/* <Form 
            forms={{
              title: 'Sign up', 
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: [{type: 'Sign up (ldap)'}, {type: 'this btn is for test (ldap)'}], title: '', type: 'signup', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          /> */}
          <Form 
            forms={{
              title: 'Log in', 
              vulneribility: 'ldap',
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'insecure Ldap', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'secure Ldap', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Result result={{...result, from: 'ldap'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default LdapInjection;