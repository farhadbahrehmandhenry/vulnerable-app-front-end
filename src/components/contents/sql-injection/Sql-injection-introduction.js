import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './Sql-injection.css';

class SqlInjectionIntroduction extends Component {

  render() {
    var classes = ['sql-injection-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='sql' />
      </div>
    );
  }
}

export default SqlInjectionIntroduction;