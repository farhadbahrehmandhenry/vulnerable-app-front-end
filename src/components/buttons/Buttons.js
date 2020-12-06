import React, {Component} from 'react';
import Script from '../script/Script.js';
import hackerIcon from '../../assets/hacker.png';
import scriptIcon from '../../assets/script-icon.png';
import './Buttons.css';

class Buttons extends Component {
  state = {
    hackerStatus: false,
    scriptStatus: false,
  }

  hackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
    this.props.hackerButtonClick({status: this.state.hackerStatus})
  }

  scriptButtonClick() {
    this.setState({scriptStatus: !this.state.scriptStatus});
    this.props.scriptButtonClick({status: this.state.scriptStatus})
  }

  render() {
    return (
      <>
        <div className='buttons-container'>
          <div className='hacker-button-container'>
            <div className='hacker' onClick={() => this.hackerButtonClick()}>
              <img src={hackerIcon}></img>
            </div>
          </div>
          <div className='script-button-container'>
            <div className='script' onClick={() => this.scriptButtonClick()}>
              <img src={scriptIcon}></img>
            </div>
          </div>
        </div>
        <Script isActive={this.state.scriptStatus}/>
      </>
    )
  }
}

export default Buttons;