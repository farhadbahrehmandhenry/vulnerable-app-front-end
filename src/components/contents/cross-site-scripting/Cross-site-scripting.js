import React, {Component} from 'react';

import './Cross-site-scripting.css';

class CrossSiteScripting extends Component {
  render() {
    var classes = ['cross-site-scripting-container', this.props.isActive ? 'active' : ''];

    return <div className={classes.join(' ')}>cross site scripting</div>;
  }
}

export default CrossSiteScripting;