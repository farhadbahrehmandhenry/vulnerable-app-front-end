import React, {Component} from 'react';

import './Result.css';

class Result extends Component {
  render() {
    var {result} = this.props;

    if (result.type) {
      var userName = result.from === 'ldap' ? result.res.cn : result.res.userName;

      return (
        <div className='result-conteiner'>
          <button className='result-clear-btn' onClick={() => this.props.resetResult()}>Clear</button>
          {result.type === 'error' ? 
            <div className='result-waiting'>error!!</div> :
            (result.type !== 'signup' && userName) &&
            <div 
              className='result-waiting'
            >{`Welcome ${userName}, you successfully logged in!!`}
            </div>
          }
        </div>
      )
    }
    else {
      return <div className='result-conteiner'></div>
    }
  }
}

export default Result;