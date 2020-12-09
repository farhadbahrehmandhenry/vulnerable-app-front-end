import React, {Component} from 'react';

import './Result.css';

class Result extends Component {
  render() {
    var {result} = this.props;
    var resultXml;
    if (result.type) {
      if (result.from === 'deserialization') {
        var {serialized, deserialized} = result.res;

        resultXml = (
          <div className='result-conteiner'>
            <button className='result-clear-btn' onClick={() => this.props.resetResult()}>Clear</button>
            {result.type === 'error' ? 
              <div className='result-waiting'>error!!</div> :
              (serialized && deserialized.userName !== 'injection') ?
              <>
                <div className='result-waiting-deserialized'>
                  {`serialized: `}
                  <strong>{`${serialized.substring(0, 50)}...`}</strong>
                </div>
                <div className='result-waiting-deserialized'>
                  {`deserialized: `} 
                  <br />
                  <strong>
                    {`{userName: ${deserialized.userName}, password: ${deserialized.password}}`}
                  </strong>
                </div>
              </>  
              :
              <div className='result-waiting'>injection</div>
            }
          </div>
        )
      }
      else {
        var userName = result.from === 'ldap' ? result.res.cn : result.res.userName;

        resultXml = (
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

      return resultXml
    }
    else {
      return <div className='result-conteiner'></div>
    }
  }
}

export default Result;