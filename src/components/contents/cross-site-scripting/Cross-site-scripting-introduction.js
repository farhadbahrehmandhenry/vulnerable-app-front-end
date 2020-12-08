import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './Cross-site-scripting.css';

class CrossSiteScriptingIntroduction extends Component {
  render() {
    var classes = ['cross-site-scripting-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='cross' />
      </div>
    );
  }
}

export default CrossSiteScriptingIntroduction;
