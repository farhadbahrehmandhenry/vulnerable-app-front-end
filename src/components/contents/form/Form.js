import React, {Component} from 'react';
import {noSqlApi, sqlApi, ldapApi} from '../../../axios';
import _ from 'lodash';

import './Form.css';

class Form extends Component {
  state = {isFormVisible: false}

  handleApiRequest({inputType, type, btnType}) {
    if (_.includes(['insecure noSql', 'secure noSql'], inputType)) {
      this.handleNoSqlApiRequest({inputType, type});
    }
    else if (_.includes(['insecure Sql', 'secure Sql'], inputType)) {
      this.handleSqlApiRequest({inputType, type});
    }
    else if (_.includes(['insecure Ldap', 'secure Ldap'], inputType)) {
      this.handleLdapApiRequest({inputType, type});
    }
    else if (btnType === 'Sign up (noSql)') {
      this.handleNoSqlSignupApiRequest();
    }
    else if (btnType === 'this btn is for test (noSql)') {
      this.handleNoSqlRemoveAllApiRequest();
    }
    else if (btnType === 'Sign up (ldap)') {
      this.handleNoSqlSignupApiRequest();
    }
    else if (btnType === 'this btn is for test (ldap)') {
      this.handleNoSqlRemoveAllApiRequest();
    }
  }

  handleNoSqlApiRequest({inputType, type}) {
    var userName, password;

    if (inputType === 'insecure noSql') {
      userName = this['insecureNoSqlUsername'].value;
      password = this['insecureNoSqlPassword'].value;
    }

    if (inputType === 'secure noSql') {
      userName = this['secureNoSqlUsername'].value;
      password = this['secureNoSqlPassword'].value;
    }

    var isNoSqlValid = _.includes(['insecure noSql', 'secure noSql'], inputType) && _.trim(userName) && _.trim(password);

    if (isNoSqlValid) {
      noSqlApi.post(`/${type}/nosql`, {userName, password})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type, res: response.data}});

            this[inputType === 'insecure noSql' ? 'insecureNoSqlUsername' : 'secureNoSqlUsername'].value = '';
            this[inputType === 'insecure noSql' ? 'insecureNoSqlPassword' : 'secureNoSqlPassword'].value = '';
          }

          if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('username or password is blank...')
    }
  }

  handleSqlApiRequest({inputType, type}) {
    var userId = this[inputType === 'insecure Sql' ? 'insecureSqlUserid' : 'secureSqlUserid'].value;
    var isSqlValid = _.includes(['insecure Sql', 'secure Sql'], inputType) && _.trim(userId);

    if (isSqlValid) {
      sqlApi.post(`/${type}/sql`, {userId})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type: 'success', res: response.data}});

            this[inputType === 'insecure Sql' ? 'insecureSqlUserid' : 'secureSqlUserid'].value = '';
          }

          if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('username or password is blank...')
    }
  }

  handleLdapApiRequest({inputType, type}) {
    var userName, password;

    if (inputType === 'insecure Ldap') {
      userName = this['insecureLdapUsername'].value;
      password = this['insecureLdapPassword'].value;
    }

    if (inputType === 'secure Ldap') {
      userName = this['secureLdapUsername'].value;
      password = this['secureLdapPassword'].value;
    }

    var isNoSqlValid = _.includes(['insecure Ldap', 'secure Ldap'], inputType) && _.trim(userName) && _.trim(password);

    if (isNoSqlValid) {
      ldapApi.post(`/${type}/ldap`, {userName, password})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type, res: response.data}});

            this[inputType === 'insecure Ldap' ? 'insecureLdapUsername' : 'secureLdapUsername'].value = '';
            this[inputType === 'insecure Ldap' ? 'insecureLdapPassword' : 'secureLdapPassword'].value = '';
          }

          if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('username or password is blank...')
    }
  }

  handleNoSqlSignupApiRequest() {
    var userName, password;

    userName = this.username.value;
    password = this.password.value;

    if (_.trim(userName) && _.trim(password)) {
      noSqlApi.post('signup', {userName, password})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type: 'signup', res: response.data}});

            this.username.value = '';
            this.password.value = '';
          }

          if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('username or password is blank...')
    }
  }

  handleNoSqlRemoveAllApiRequest() {
    noSqlApi.post('removeAll')
    .then(response => {
      if (response.status === 200) console.log('all removed')
    })
    .catch(error => console.log(error));
  }

  render() {
    var {forms} = this.props;
    var {isFormVisible} = this.state;

    return (
      <div className={['form-Container', forms.vulneribility].join(' ')}>
        <div className='form-title' onClick={() => this.setState({isFormVisible: !isFormVisible})}>{forms.title}</div>
        <div className={['form-components-container', forms.vulneribility, isFormVisible ? 'active' : ''].join(' ')}>
          {forms.components.map(component => (
            <div 
              key={component.id} 
              className={['form-component', forms.vulneribility, component.direction, component.type, isFormVisible ? 'active' : ''].join(' ')}
            >
              {component.title && <div className={['component-title', isFormVisible ? 'active' : ''].join(' ')}>{component.title}</div>}
              {component.inputs.map(input => (
                <input 
                  className={[`form-input`, isFormVisible ? 'active' : ''].join(' ')} 
                  type='text' 
                  key={input}
                  placeholder={input}
                  ref={(inputRef) => this[_.camelCase(`${component.title}${_.capitalize(input)}`)] = inputRef}
                ></input>
              ))}
              {component.buttons.map((button, index) => (
                <button 
                  className={[`form-btn`, isFormVisible ? 'active' : ''].join(' ')} 
                  key={button.type}
                  onClick={() => this.handleApiRequest({inputType: component.title, type: component.type, btnType: button.type})}
                >{button.type}
                </button>
              ))}
              {(forms.textboxes && forms.textboxes.length > 0) && 
                <textarea 
                  className={[`form-textarea`, isFormVisible ? 'active' : ''].join(' ')} 
                  rows="4" cols="50"
                >
                </textarea>
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Form;