import React, {Component} from 'react';
import _ from 'lodash';
import SqlInjection from '../contents/sql-injection/Sql-injection';
import NoSqlInjection from '../contents/noSql-injection/NoSql-injection';
import OsInjection from '../contents/os-injection/Os-injection';
import LdapInjection from '../contents/ldap-injection/Ldap-injection';
import CrossSiteScripting from '../contents/cross-site-scripting/Cross-site-scripting';
import InsecureDeserialization from '../contents/insecure-deserialization/Insecure-deserialization';
import Content from '../contents/content/Content';
import Tab from './tab/Tab';

import './Tabs.css';

class Tabs extends Component {
  state = {
    contents: [
      {key: 'sqlInjection', isActive: true},
      {key: 'noSqlInjection', isActive: false}, 
      {key: 'oSInjection', isActive: false},
      {key: 'lDAPInjection', isActive: false},
      {key: 'crossSiteScripting', isActive: false},
      {key: 'insecureDeserialization', isActive: false}
    ]
  }

  handleTabSelect({content}) {
    var contents = [...this.state.contents];
    var newContents = _.map(contents, c => ({key: c.key, isActive: c.key === content ? true : false }));

    this.setState({contents: newContents});
  }

  render() {
    var tabs = [
      {key: 'noSqlInjection', value: 'NoSQL Injection'},
      {key: 'sqlInjection', value: 'SQL Injection'},
      {key: 'oSInjection', value: 'OS Injection'},
      {key: 'lDAPInjection', value: 'LDAP Injection'}, 
      {key: 'crossSiteScripting', value: 'Cross-site scripting'}, 
      {key: 'insecureDeserialization', value: 'Insecure deserialization'}
    ];

    return (
      <div className="tabs-container">
        <div className='tabs'>
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
          <SqlInjection isActive={_.find(this.state.contents, content => content.key === 'sqlInjection').isActive}/>
          <NoSqlInjection isActive={_.find(this.state.contents, content => content.key === 'noSqlInjection').isActive}/>
          <OsInjection isActive={_.find(this.state.contents, content => content.key === 'oSInjection').isActive}/>
          <LdapInjection isActive={_.find(this.state.contents, content => content.key === 'lDAPInjection').isActive}/>
          <CrossSiteScripting isActive={_.find(this.state.contents, content => content.key === 'crossSiteScripting').isActive}/>
          <InsecureDeserialization isActive={_.find(this.state.contents, content => content.key === 'insecureDeserialization').isActive}/>
        </Content>
      </div>
    );
  }
}

export default Tabs;