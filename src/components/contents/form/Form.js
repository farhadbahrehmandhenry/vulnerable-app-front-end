import React, {Component} from 'react';
import {noSqlApi, sqlApi} from '../../../axios';
import _ from 'lodash';

import './Form.css';

class Form extends Component {
  state = {isFormVisible: false}

  handleApiRequest({inputType, type}) {
    if (_.includes(['insecure noSql', 'secure noSql'], inputType)) {
      this.handleNoSqlApiRequest({inputType, type});
    }
    else {
      this.handleSqlApiRequest({inputType, type});
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

    var path = type !== 'signup' ? `/${type}/nosql` : 'signup';
    var isNoSqlValid = _.includes(['insecure noSql', 'secure noSql'], inputType) && _.trim(userName) && _.trim(password);

    if (isNoSqlValid) {
      noSqlApi.post(path, {userName, password})
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
    var path = `/${type}/sql`;
    var isSqlValid = _.includes(['insecure Sql', 'secure Sql'], inputType) && _.trim(userId);

    if (isSqlValid) {
      sqlApi.post(path, {userId})
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

  render() {
    var {forms} = this.props;
    var {isFormVisible} = this.state;

    return (
      <div className='form-Container'>
        <div className='form-title' onClick={() => this.setState({isFormVisible: !isFormVisible})}>{forms.title}</div>
        <div className={['form-components-container', isFormVisible ? 'active' : ''].join(' ')}>
          {forms.components.map(component => (
            <div key={component.id} className={['form-component', component.direction, component.type, isFormVisible ? 'active' : ''].join(' ')}>
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
              {component.buttons.map(button => (
                <button 
                  className={[`form-btn`, isFormVisible ? 'active' : ''].join(' ')} 
                  key={button}
                  onClick={() => this.handleApiRequest({inputType: component.title, type: component.type})}>{button}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Form;