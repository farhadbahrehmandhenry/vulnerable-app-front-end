import React, {Component} from 'react';

import './Tab.css';

class Tab extends Component {
  state = {
    isActive: false
  }

  handleTabSelection() {
    this.setState({});
  }

  render() {
    var {tab} = this.props;
    var classes = ['tab-title', this.props.tab.key, this.props.isActive ? 'active' : ''];

    return (
      <div className='tab-container'>
        <h5 className={classes.join(' ')} onClick={() => this.props.handleSelect({content: tab.key})}>{tab.value}</h5> 
      </div>
    );
  }
}

export default Tab;