import React, {Component} from 'react';

import './Script.css';

class Script extends Component {
  render() {
    var {isActive} = this.props;
    var classes = ['script-container', isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>

      </div>
    )
  }
}

export default Script;