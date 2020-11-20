import React, {Component} from 'react';
import {noSqlApi} from '../../../axios';
import _ from 'lodash';

import './Form.css';

class Form extends Component {
  state = {isFormVisible: false}

  handleApiRequest({inputType, type}) {
    var userName = this[inputType === 'insecure noSql' ? 'insecureNoSqlUsername' : 'secureNoSqlUsername'].value;
    var password = this[inputType === 'insecure noSql' ? 'insecureNoSqlPassword' : 'secureNoSqlPassword'].value;
    var path = type !== 'signup' ? `/${type}/login/nosql` : 'signup';

    if (_.trim(userName) && _.trim(password)) {
      noSqlApi.post(path, {userName, password})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type, res: response.data}});
            this[inputType === 'insecure noSql' ? 'insecureNoSqlUsername' : 'secureNoSqlUsername'].value = '';
            this[inputType === 'insecure noSql' ? 'insecureNoSqlPassword' : 'secureNoSqlPassword'].value = '';
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
    var {forms} = this.props;
    var {isFormVisible} = this.state;

    return (
      <div className='form-Container'>
        <div className='form-title' onClick={() => this.setState({isFormVisible: !isFormVisible})}>{forms.title}</div>
        <div className={['form-components-container', isFormVisible ? 'active' : ''].join(' ')}>
          {forms.components.map(component => (
            <div className={['form-component', component.direction, component.type, isFormVisible ? 'active' : ''].join(' ')}>
              {component.title && <div className={['component-title', isFormVisible ? 'active' : ''].join(' ')}>{component.title}</div>}
              {component.inputs.map(input => (
                <input 
                  className={[`form-input`, isFormVisible ? 'active' : ''].join(' ')} 
                  type='text' 
                  placeholder={input}
                  ref={(inputRef) => this[_.camelCase(`${component.title}${_.capitalize(input)}`)] = inputRef}
                ></input>
              ))}
              {component.buttons.map(button => (
                <button 
                  className={[`form-btn`, isFormVisible ? 'active' : ''].join(' ')} 
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