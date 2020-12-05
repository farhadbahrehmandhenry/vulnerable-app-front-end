import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';
import Result from '../result/Result';

import './NoSql-injection.css';

class NoSqlInjection extends Component {
  state = {
    hackerStatus: false,
    result: {}
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
  }

  handleFetchedResult({result}) {
    this.setState({result});
  }

  render() {
    var classes = ['nosql-injection-container', this.props.isActive ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='nosql-injection-hacker-button-container'>
          <div className='nosql-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='nosql-injection-demonstration'>
          <Hacker isActive={this.state.hackerStatus} text='{"$gte": 0}' source={hackerIcon} type='nosql'/>
          <Form 
            forms={{
              title: 'Log in', 
              vulneribility: 'noSql',
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'insecure noSql', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['username', 'password'], buttons: [{type: 'Log in'}], title: 'secure noSql', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Result result={{...result, from: 'noSql'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default NoSqlInjection;