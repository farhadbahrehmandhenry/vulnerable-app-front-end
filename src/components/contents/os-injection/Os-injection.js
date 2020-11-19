import React, {Component} from 'react';
import hackerHandIcon from '../../../assets/hacker-hand.png';
import hackerIcon from '../../../assets/hacker.png';
import Hacker from '../../hacker/Hacker.js';

import './Os-injection.css';

class OsInjection extends Component {
  state = {
    hackerStatus: false,
  }
  render() {
    var classes = ['os-injection-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <div className='os-injection-container-hacker-button-container'>
          <div className='os-injection-container-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='os-injection-container-demonstration'>
          <div className='os-injection-form'>
            <input className='os-injection-input' placeholder='file name'></input>
            <button className='os-injection-btn'>Add File</button>
          </div>
          <div className='os-injection-files'></div>
          <Hacker isActive={this.state.hackerStatus}  text='3 OR 1=1' source={hackerHandIcon}/>
        </div>


      </div>
    );
  }
}

export default OsInjection;