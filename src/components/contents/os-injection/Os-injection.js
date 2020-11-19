import React, {Component} from 'react';
import hackerFingerIcon from '../../../assets/hacker-finger.png';
import hackerIcon from '../../../assets/hacker.png';
import Hacker from '../../hacker/Hacker.js';
import OsInjectionForm from './os-injection-form/Os-injection-form';
import './Os-injection.css';

class OsInjection extends Component {
  state = {
    hackerStatus: false,
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
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
          <div className='os-injection-form-container'>
            <OsInjectionForm type='bad'/>
            <OsInjectionForm type='good'/>
          </div>
          <Hacker isActive={this.state.hackerStatus}  text='3 OR 1=1' source={hackerFingerIcon} type='os'/>
        </div>
      </div>
    );
  }
}

export default OsInjection;