import React, {Component} from 'react';
import _ from 'lodash';

import './Os-injection-form.css';

class SqlInjectionForm extends Component {
  render() {
    var {type} = this.props;
    var classes = ['os-injection-form-container', type];

    return (
      <div className={classes.join(' ')} style={{opacity: this.props.styleOpacity}}>
        <div className='os-injection-form-description'>{type === 'good' ? 'secure OS' : 'insecure OS'}</div>
        <div className='os-injection-input-button-container' >
          <div className='os-injection-form'>
            <input className='os-injection-input' placeholder='file name'></input>
            <button className='os-injection-btn'>Add File</button>
          </div>
          <div className='os-injection-files-container'>
            <div className='os-injection-files'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SqlInjectionForm;