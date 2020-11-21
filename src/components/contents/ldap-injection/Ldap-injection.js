import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';

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
          <div className='ldap-injection-result-conteiner'>
            {result.type === 'error' ? 
              <div className='ldap-injection-result-waiting'>error!!</div> :
              result.type !== 'good' && (result.res && result.res.cn) ? 
              <div 
                className='ldap-injection-result-waiting'
              >{`Welcome ${result.res.cn}, you successfully logged in!!`}
              </div>:
              <div className='ldap-injection-result-waiting'>waiting!!!!</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LdapInjection;