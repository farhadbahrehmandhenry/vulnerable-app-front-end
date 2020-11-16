import React, {Component} from 'react';

import './NoSql-injection.css';

class NoSqlInjection extends Component {
  render() {
    var classes = ['nosql-injection-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>nosql injection</div>
    );
  }
}

export default NoSqlInjection;