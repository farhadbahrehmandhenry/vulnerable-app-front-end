import React, {Component} from 'react';

import './Os-injection.css';

class OsInjection extends Component {
  render() {
    var classes = ['os-injection-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>OS injection</div>
    );
  }
}

export default OsInjection;