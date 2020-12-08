import React, {Component} from 'react';
import _ from 'lodash';
import sqlInjectionIcon from '../../../../assets/sql-icon.png'
import sqlInjectionContent from '../../../../assets/sql-content.png'
import sqlInjectionPreventing from '../../../../assets/sql-preventing.png'

import nosqlInjectionIcon from '../../../../assets/nosql-icon.png'
import nosqlInjectionContent from '../../../../assets/nosql-content.png'
import nosqlInjectionPreventing from '../../../../assets/nosql-preventing.png'

import osInjectionIcon from '../../../../assets/os.png'
import osInjectionContent from '../../../../assets/os-content.png'
import osInjectionPreventing from '../../../../assets/os-preventing.png'

import ldapInjectionIcon from '../../../../assets/ldap.jpg'
import ldapInjectionContent from '../../../../assets/ldap-content.png'
import ldapInjectionPreventing from '../../../../assets/ldap-preventing.png'

import crossInjectionIcon from '../../../../assets/cross-icon.png'
import crossInjectionContent from '../../../../assets/cross-content.png'
import crossInjectionPreventing from '../../../../assets/cross-preventing.png'

import deserializationInjectionIcon from '../../../../assets/deserialization-icon.jpg'
import deserializationInjectionContent from '../../../../assets/deserialization-content.png'
import deserializationInjectionPreventing from '../../../../assets/deserialization-preventing.png'

import './Introduction-content.css';

class IntroductionContent extends Component {
  render() {
    var classes = ['introduction-content-container', this.props.isActive ? 'active' : ''];
    var {injectionTitle, injectionContent, preventingContent} = this.props;
    var injectionIcon, injectionContent, injectionPreventing;

    if (injectionTitle === 'sql') {
      injectionIcon = sqlInjectionIcon;
      injectionContent = sqlInjectionContent;
      injectionPreventing = sqlInjectionPreventing;
    }
    else if (injectionTitle === 'nosql') {
      injectionIcon = nosqlInjectionIcon;
      injectionContent = nosqlInjectionContent;
      injectionPreventing = nosqlInjectionPreventing;
    }
    else if (injectionTitle === 'os') {
      injectionIcon = osInjectionIcon;
      injectionContent = osInjectionContent;
      injectionPreventing = osInjectionPreventing;
    }
    else if (injectionTitle === 'ldap') {
      injectionIcon = ldapInjectionIcon;
      injectionContent = ldapInjectionContent;
      injectionPreventing = ldapInjectionPreventing;
    }
    else if (injectionTitle === 'cross') {
      injectionIcon = crossInjectionIcon;
      injectionContent = crossInjectionContent;
      injectionPreventing = crossInjectionPreventing;
    }
    else if (injectionTitle === 'deserialization') {
      injectionIcon = deserializationInjectionIcon;
      injectionContent = deserializationInjectionContent;
      injectionPreventing = deserializationInjectionPreventing;
    }

    return (
      <div className={classes.join(' ')}>
        <div className='introduction-content-injection'>
          <img src={injectionContent}></img>
        </div>
        <div className='introduction-content-img'>
          <img src={injectionIcon}></img>
        </div>
        <div className='introduction-content-preventing'>
          <img src={injectionPreventing}></img>
        </div>
      </div>
    )
  }
}

export default IntroductionContent;