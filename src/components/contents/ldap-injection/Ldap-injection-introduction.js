import React, {Component} from 'react';
import _ from 'lodash';
import IntroductionContent from '../introduction/introduction-content/Introduction-content.js';

import './Ldap-injection.css';

class LdapInjectionIntroduction extends Component {
  render() {
    var classes = ['ldap-injection-introduction-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={_.join(classes, ' ')}>
        <IntroductionContent injectionTitle='ldap' />
      </div>
    );
  }
}

export default LdapInjectionIntroduction;