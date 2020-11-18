import React, {Component} from 'react';
import hacker from '../../assets/hacker.png';

import './Hacker.css';

class Hacker extends Component {
  render() {
    var classes = ['hacker-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <img src={hacker}></img>
        <input className='hacker-input' type='text' value={this.props.text} onChange={() => console.log()}></input>
      </div>
    )
  }
}

export default Hacker;