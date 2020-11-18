import React, {Component} from 'react';
import {noSqlApi} from '../../../../axios';
import _ from 'lodash';

import './NoSql-injection-form.css';

class NoSqlInjectionForm extends Component {
  handleLogin() {
    var userName = this.usernameInput.value;
    var password = this.passwordInput.value;
    var path = `/${this.props.type}/user/nosql`;

    if (_.trim(userName) && _.trim(password)) {
      noSqlApi.post(path, {userName, password})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type: 'success', res: response.data}});
            this.usernameInput.value = '';
            this.passwordInput.value = '';
          }
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('username or password is blank...')
    }
  }

  render() {
    var {type} = this.props;
    var classes = ['nosql-injection-form-container', type];

    return (
      <div className={classes.join(' ')}>
        <div className='nosql-injection-form-description'>{type === 'good' ? 'secure NoSQL' : 'insecure NoSQL'}</div>
        <input 
          className='nosql-injection-input-username' 
          type='text' placeholder='username' 
          ref={(usernameInput) => this.usernameInput = usernameInput}
        ></input>
        <input 
          className='nosql-injection-input-password' 
          type='text' placeholder='password' 
          ref={(passwordInput) => this.passwordInput = passwordInput}
        ></input>
        <button className='nosql-injection-btn' onClick={() => this.handleLogin()}>Come in</button>
      </div>
    );
  }
}

export default NoSqlInjectionForm;