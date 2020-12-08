import React, {Component} from 'react';
import _ from 'lodash';
import Tab from '../tab/Tab';
import Demo from '../../contents/demo/Demo.js';
import Introduction from '../../contents/introduction/Introduction.js';
import Content from '../../contents/content/Content';
import './MainTabs.css';

class Tabs extends Component {
  state = {
    contents: [
      {key: 'introduction', isActive: true},
      {key: 'demo', isActive: false}, 
    ]
  }

  handleTabSelect({content}) {
    var contents = [...this.state.contents];
    var newContents = _.map(contents, c => ({key: c.key, isActive: c.key === content ? true : false }));

    this.setState({contents: newContents});
  }

  render() {
    var tabs = [
      {key: 'introduction', value: 'Introduction'},
      {key: 'demo', value: 'Demo'},
    ];

    return (
      <div className="main-tabs-container">
        <div className='main-tabs'>
          {_.map(tabs, tab => {
            return (
              <Tab 
                tab={tab} 
                handleSelect={({content}) => this.handleTabSelect({content})}
                isActive={_.find(this.state.contents, content => content.key === tab.key).isActive}
                key={tab.key}
              />
            )
          })}
        </div>
        <Content>
          <Introduction isActive={_.find(this.state.contents, content => content.key === 'introduction').isActive}/>
          <Demo isActive={_.find(this.state.contents, content => content.key === 'demo').isActive}/>
        </Content>
      </div>
    );
  }
}

export default Tabs;