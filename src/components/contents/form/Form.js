import React, {Component} from 'react';
import {noSqlApi, sqlApi, ldapApi, deserializationApi} from '../../../axios';
import _ from 'lodash';

import './Form.css';

// res.setHeader("Content-Security-Policy", "script-src http://localhost3000");
// no inline 
// http://localhost:3000/?default=<a href="#" onclick="fetch('http://localhost:5000/api/vulnerable/send-money').then(x => x.json()).then(x => console.log(x))"> click to win $$$$$$</a>
// http://localhost:3000/?default=<img src onerror="fetch('http://localhost:5000/api/vulnerable/send-money').then(x => x.json()).then(x => console.log(x))" />

// insecure deserialization
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphY2siLCJwYXNzd29yZCI6IkxvbmRvbiIsImlhdCI6MTYwNzUzOTgzM30.1KWediN-jfcXw_6sfFgfT3pyG17-rE_N0sz55O_aDpo

const defaultText = decodeURI(
  document.location.href.substring(
    document.location.href.indexOf("default=") + 8
  )
);

class Form extends Component {
  state = {isFormVisible: false, crossBadText: defaultText, crossGoodText: ''}

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
    else if (_.includes(['insecure deserialization', 'secure deserialization'], inputType)) {
      this.handleDeserializationApiRequest({inputType, type});
    }
    // else if (btnType === 'Sign up (noSql)') {
    //   this.handleNoSqlSignupApiRequest();
    // }
    // else if (btnType === 'this btn is for test (noSql)') {
    //   this.handleNoSqlRemoveAllApiRequest();
    // }
    // else if (btnType === 'Sign up (ldap)') {
    //   this.handleLdapSignupApiRequest();
    // }
    // else if (btnType === 'this btn is for test (ldap)') {
    //   this.handleLdapRemoveAllApiRequest();
    // }
    else if (_.includes(['insecure OS Command', 'secure OS Command'], inputType)) {
      this.handleOsCommandRequest({inputType, type});
    }
    else if (_.includes(['insecure cross site scripting', 'secure cross site scripting'], inputType)) {
      this.handleCrossSiteScriptingRequest({inputType, type});
    }
  }

  handleCrossSiteScriptingRequest({inputType, type}) {
    var imageUrl = inputType === 'insecure cross site scripting' ? this['insecureCrossSiteScriptingImageurl'].value : this['secureCrossSiteScriptingImageurl'].value;

    if (_.trim(imageUrl)) {
      this.props.handleFetch({result: {type, imageUrl, from: 'cross'}});
      this[inputType === 'insecure cross site scripting' ? 'insecureCrossSiteScriptingImageurl' : 'secureCrossSiteScriptingImageurl'].value = '';
    }
    else {
      alert('fileName is blank...')
    }
  }

  async handleDeserializationApiRequest({inputType, type}) {
    var token;

    if (inputType === 'insecure deserialization') {
      token = this['insecureDeserializationToken'].value;
    }

    if (inputType === 'secure deserialization') {
      token = this['secureDeserializationToken'].value;
    }

    var isNoSqlValid = _.includes(['insecure deserialization', 'secure deserialization'], inputType) && _.trim(token);

    if (isNoSqlValid) {
      sqlApi.post(`/${type}/deserialization`, {token})
      .then(response => {
        if (response.status === 200) {
          this.props.handleFetch({result: {type, res: response.data}});

          this[inputType === 'insecure deserialization' ? 'insecureDeserializationToken' : 'secureDeserializationToken'].value = '';
        }

        if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
      })
      .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));

      // flask- python
      // deserializationApi.post(`/${type}/deserialization`, {token})
      //   .then(response => {
      //     if (response.status === 200) {
      //       this.props.handleFetch({result: {type, res: response.data}});

      //       this[inputType === 'insecure deserialization' ? 'insecureDeserializationToken' : 'secureDeserializationToken'].value = '';
      //     }

      //     if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
      //   })
      //   .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('token is blank...')
    }
  }

  handleOsCommandRequest({inputType, type}) {
    var fileName = inputType === 'insecure OS Command' ? this['insecureOsCommandFilename'].value : this['secureOsCommandFilename'].value;

    if (_.trim(fileName)) {
      sqlApi.post(`/${type}/os/injection`, {fileName})
      .then(response => {
        if (response.status === 200) {
          var {fileName} = response.data;

          fileName = fileName.split(';')[0];

          this.props.handleFetch({result: {type, res: {...response.data, fileName}, from: 'os'}});
          this[inputType === 'insecure OS Command' ? 'insecureOsCommandFilename' : 'secureOsCommandFilename'].value = '';
        }
      })
      .catch(error => console.log(error));
    }
    else {
      alert('fileName is blank...')
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

  // handleLdapSignupApiRequest() {
  //   var userName, password;

  //   userName = this.username.value;
  //   password = this.password.value;

  //   if (_.trim(userName) && _.trim(password)) {
  //     ldapApi.post('signup', {userName, password})
  //       .then(response => {
  //         if (response.status === 200) {
  //           this.props.handleFetch({result: {type: 'signup', res: response.data}});

  //           this.username.value = '';
  //           this.password.value = '';
  //         }

  //         if (!response) this.props.handleFetch({result: {type: 'error', res: 'error'}})
  //       })
  //       .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
  //   }
  //   else {
  //     alert('username or password is blank...')
  //   }
  // }

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
                  <div 
                    className={[`form-textarea`, forms.vulneribility, isFormVisible ? 'active' : ''].join(' ')} 
                    rows="4" 
                    cols="50"
                    ref={(inputRef) => this[_.camelCase(`${component.title}Textarea`)] = inputRef}
                  >
                    {_.map(component.listOfItems, (item, index) => {
                      if (item.from === 'os') {
                        if (item.status === 'success') {
                          return <div key={index} className='list-item'>{item.fileName} created in {item.time/1000} sec</div>
                        }
                        else {
                          return <div key={index} className='list-item injection'>injection</div>
                        }
                      }
                    })}
                    {forms.vulneribility === 'cross' &&
                      component.type === 'bad' ?
                        <>
                          <textarea 
                            value={this.state.crossBadText} 
                            onChange={e => this.setState({crossBadText: e.target.value})}
                          ></textarea>  
                          <div dangerouslySetInnerHTML={{__html: this.state.crossBadText}}></div>
                        </>
                      : 
                        <>
                          <textarea 
                            value={this.state.crossGoodText} 
                            onChange={e => this.setState({crossGoodText: e.target.value})}
                          ></textarea>  
                          <div>{this.state.crossGoodText}</div>
                        </>
                    }
                  </div>
                }
          </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Form;