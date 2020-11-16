import React, {Component} from 'react';

import './Ldap-injection.css';

class LdapInjection extends Component {
  render() {
    var classes = ['ldap-injection-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>LDAP injection</div>
    );
  }
}

export default LdapInjection;