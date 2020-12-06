import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';
import Result from '../result/Result';
import Buttons from '../../buttons/Buttons.js';

import './Ldap-injection.css';

class LdapInjection extends Component {
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
    var classes = ['ldap-injection-container', this.props.isActive ? 'active' : ''];
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
        />
        <div className={_.join(demonstrationClasses, ' ')}>
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
          <Result result={{...result, from: 'ldap'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default LdapInjection;