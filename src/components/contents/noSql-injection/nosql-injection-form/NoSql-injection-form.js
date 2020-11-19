import React, {Component} from 'react';
import {noSqlApi} from '../../../../axios';
import _ from 'lodash';

import './NoSql-injection-form.css';

class NoSqlInjectionForm extends Component {
  handleLogin() {
    var userName = this.usernameInput.value;
    var password = this.passwordInput.value;
    var {type} = this.props;

    var path = type !== 'signup' ? `/${type}/login/nosql` : 'signup';

    if (_.trim(userName) && _.trim(password)) {
      noSqlApi.post(path, {userName, password})
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.props.handleFetch({result: {type, res: response.data}});
            this.usernameInput.value = '';
            this.passwordInput.value = '';
          }

          if (!response) {
            this.props.handleFetch({result: {type: 'error', res: 'error'}})
          }
        })
        .catch(error => {
          this.props.handleFetch({result: {type: 'error', res: 'error'}})
        });
    }
    else {
      alert('username or password is blank...')
    }
  }

  render() {
    var {type} = this.props;
    var classes = ['nosql-injection-form-container', type, this.props.styleOpacity ? '' : 'active'];
    var userNameClasses = ['nosql-injection-input-username', this.props.styleOpacity ? '' : 'active'];
    var passwordClasses = ['nosql-injection-input-password', this.props.styleOpacity ? '' : 'active']
    var btnClasses = ['nosql-injection-btn', this.props.styleOpacity ? '' : 'active']
    var descriptionClasses = ['nosql-injection-form-description', this.props.styleOpacity ? '' : 'active']

    return (
      <div className={classes.join(' ')}>
        {type !== 'signup' && 
          <div className={descriptionClasses.join(' ')}>{type === 'good' ? 'secure NoSQL' : 'insecure NoSQL'}</div>
        }
        <input 
          className={userNameClasses.join(' ')}
          type='text' placeholder='username' 
          ref={(usernameInput) => this.usernameInput = usernameInput}
        ></input>
        <input 
          className={passwordClasses.join(' ')}
          type='text' placeholder='password' 
          ref={(passwordInput) => this.passwordInput = passwordInput}
        ></input>
        <button 
          className={btnClasses.join(' ')}
          onClick={() => this.handleLogin()}
        >{type === 'signup' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    );
  }
}

export default NoSqlInjectionForm;