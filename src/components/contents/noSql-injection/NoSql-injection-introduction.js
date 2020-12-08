import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './NoSql-injection.css';

class NoSqlInjectionIntroduction extends Component {
  render() {
    var classes = ['nosql-injection-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='nosql' />
      </div>
    );
  }
}

export default NoSqlInjectionIntroduction;