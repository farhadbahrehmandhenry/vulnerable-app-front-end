import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './Os-injection.css';

class OSInjectionIntroduction extends Component {
  render() {
    var classes = ['os-injection-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='os' />
      </div>
    );
  }
}

export default OSInjectionIntroduction;