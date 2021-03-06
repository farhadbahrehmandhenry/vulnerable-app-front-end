import React, {Component} from 'react';
import _ from 'lodash';
import SqlInjection from '../contents/sql-injection/Sql-injection';
import NoSqlInjection from '../contents/noSql-injection/NoSql-injection';
import OsInjection from '../contents/os-injection/Os-injection';
import LdapInjection from '../contents/ldap-injection/Ldap-injection';
import CrossSiteScripting from '../contents/cross-site-scripting/Cross-site-scripting';
import InsecureDeserialization from '../contents/insecure-deserialization/Insecure-deserialization';
import SqlInjectionIntroduction from '../contents/sql-injection/Sql-injection-introduction';
import NoSqlInjectionIntroduction from '../contents/noSql-injection/NoSql-injection-introduction';
import OsInjectionIntroduction from '../contents/os-injection/Os-injection-introduction';
import LdapInjectionIntroduction from '../contents/ldap-injection/Ldap-injection-introduction';
import CrossSiteScriptingIntroduction from '../contents/cross-site-scripting/Cross-site-scripting-introduction';
import InsecureDeserializationIntroduction from '../contents/insecure-deserialization/Insecure-deserialization-introduction';

import Content from '../contents/content/Content';
import Tab from './tab/Tab';

import './Tabs.css';

class Tabs extends Component {
  state = {
    contents: [
      {key: 'sqlInjection', isActive: true},
      {key: 'noSqlInjection', isActive: false}, 
      {key: 'oSCommandInjection', isActive: false},
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
      {key: 'sqlInjection', value: 'SQL Injection'},
      {key: 'noSqlInjection', value: 'NoSQL Injection'},
      {key: 'oSCommandInjection', value: 'OS Command Injection'},
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
        {this.props.type === 'demo' ? 
          <Content>
            <SqlInjection isActive={_.find(this.state.contents, content => content.key === 'sqlInjection').isActive}/>
            <NoSqlInjection isActive={_.find(this.state.contents, content => content.key === 'noSqlInjection').isActive}/>
            <OsInjection isActive={_.find(this.state.contents, content => content.key === 'oSCommandInjection').isActive}/>
            <LdapInjection isActive={_.find(this.state.contents, content => content.key === 'lDAPInjection').isActive}/>
            <CrossSiteScripting isActive={_.find(this.state.contents, content => content.key === 'crossSiteScripting').isActive}/>
            <InsecureDeserialization isActive={_.find(this.state.contents, content => content.key === 'insecureDeserialization').isActive}/>
          </Content> :
          <Content>
            <SqlInjectionIntroduction isActive={_.find(this.state.contents, content => content.key === 'sqlInjection').isActive}/>
            <NoSqlInjectionIntroduction isActive={_.find(this.state.contents, content => content.key === 'noSqlInjection').isActive}/>
            <OsInjectionIntroduction isActive={_.find(this.state.contents, content => content.key === 'oSCommandInjection').isActive}/>
            <LdapInjectionIntroduction isActive={_.find(this.state.contents, content => content.key === 'lDAPInjection').isActive}/>
            <CrossSiteScriptingIntroduction isActive={_.find(this.state.contents, content => content.key === 'crossSiteScripting').isActive}/>
            <InsecureDeserializationIntroduction isActive={_.find(this.state.contents, content => content.key === 'insecureDeserialization').isActive}/>
          </Content>
      }
      </div>
    );
  }
}

export default Tabs;