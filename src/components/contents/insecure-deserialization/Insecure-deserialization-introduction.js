import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './Insecure-deserialization.css';

class InsecureDeserializationIntroduction extends Component {
  render() {
    var classes = ['insecure-deserialization-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='deserialization' />
      </div>
    );
  }
}

export default InsecureDeserializationIntroduction;