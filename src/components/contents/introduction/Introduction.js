import React, {Component} from 'react';
import _ from 'lodash';
import Tabs from '../../tabs/Tabs.js';

import './Introduction.css';

class Introduction extends Component {
  render() {
    var classes = ['introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <Tabs type='introduction'/>
      </div>
    )
  }
}

export default Introduction;