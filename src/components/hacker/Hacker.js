import React, {Component} from 'react';

import './Hacker.css';

class Hacker extends Component {
  render() {
    var {isActive, type, text} = this.props;
    var classes = ['hacker-container', isActive ? 'active' : '', type];

    return (
      <div className={classes.join(' ')}>
        {type !== 'os' ? 
          <img src={this.props.source}></img> : 
          <input className='hacker-input' type='text' value={text} onChange={() => console.log()}></input>
        }
        {type !== 'os' ? 
          <input className='hacker-input' type='text' value={text} onChange={() => console.log()}></input> :
          <img src={this.props.source}></img>
        }
      </div>
    )
  }
}

export default Hacker;