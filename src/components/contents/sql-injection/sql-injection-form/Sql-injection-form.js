import React, {Component} from 'react';
import {sqlApi} from '../../../../axios';
import _ from 'lodash';

import './Sql-injection-form.css';

class SqlInjectionForm extends Component {


  selectUser() {
    var {value} = this.userInput;
    var path = `/${this.props.type}/user`;

    if (_.trim(value)) {
      sqlApi.post(path, {userId: value})
        .then(response => {
          if (response.status === 200) {
            this.props.handleFetch({result: {type: 'success', res: response.data}});
            this.userInput.value = '';
          }
        })
        .catch(error => this.props.handleFetch({result: {type: 'error', res: 'error'}}));
    }
    else {
      alert('nothing to fetch')
    }
  }

  render() {
    var {type} = this.props;
    var classes = ['sql-injection-form-container', type];

    return (
      <div className={classes.join(' ')}>
        <div className='sql-injection-form-description'>{type === 'good' ? 'secure SQL' : 'insecure SQL'}</div>
        <input 
          className='sql-injection-input' 
          type='text' placeholder='User Id' 
          ref={(userInput) => this.userInput = userInput}
        ></input>
        <button className='sql-injection-btn' onClick={() => this.selectUser()}>Fetch it</button>
      </div>
    );
  }
}

export default SqlInjectionForm;