import React, {Component} from 'react';

import './Insecure-deserialization.css';

class InsecureDeserialization extends Component {
  render() {
    var classes = ['insecure-deserialixation-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>insecure deserialization</div>
    );
  }
}

export default InsecureDeserialization;