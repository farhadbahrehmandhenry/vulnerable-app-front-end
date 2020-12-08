import React, {Component} from 'react';
import Tabs from '../tabs/Tabs';
import MainTabs from '../tabs/mainTabs/MainTabs.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainTabs />
      </div>
    );
  }
}

export default App;
