import React, {Component} from 'react';
import Tabs from '../../tabs/Tabs.js';
import _ from 'lodash';

import './Demo.css';

class Demo extends Component {
  render() {
    var classes = ['demo-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <Tabs type='demo'/>
      </div>
    )
  }
}

export default Demo;
