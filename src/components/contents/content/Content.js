import React, {Component} from 'react';

// import './Sql-injection.css';

class Content extends Component {
  render() {
    return (
      <div className='content-container'>
        {this.props.children}
      </div>
    );
  }
}

export default Content;