import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';
import Result from '../result/Result';

import './Insecure-deserialization.css';

class InsecureDeserialization extends Component {
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
    var classes = ['insecure-deserialization-container', this.props.isActive ? 'active' : ''];
    var {result} = this.state;

    return (
      <div className={_.join(classes, ' ')}>
        <div className='insecure-deserialization-hacker-button-container'>
          <div className='nosql-injection-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='insecure-deserialization-demonstration'>
          <Hacker isActive={this.state.hackerStatus} text='_$$ND_FUNC$$_function (){ alert("injection"); }()' source={hackerIcon} type='nosql'/>
          <Form 
            forms={{
              title: 'Log in', 
              vulneribility: 'deserialization',
              components: [
                {id: 1, inputs: ['username', 'password'], buttons: [{type: 'Sign up'}], title: 'insecure deserialization', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['username', 'password'], buttons: [{type: 'Sign up'}], title: 'secure deserialization', type: 'good', direction: 'column'}
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Result result={{...result, from: 'deserialization'}} resetResult={() => this.setState({result: {}})}/>
        </div>
      </div>
    );
  }
}

export default InsecureDeserialization;