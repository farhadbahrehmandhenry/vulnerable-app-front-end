import React, {Component} from 'react';
import sqlBadWay from '../../assets/sql-bad.png';
import sqlGoodWay from '../../assets/sql-good.png';
import noSqlBadWay from '../../assets/nosql-bad.png';
import noSqlGoodWay from '../../assets/nosql-good.png';
import ldapBadWay from '../../assets/ldap-bad.png';
import ldapGoodWay from '../../assets/ldap-good.png';
import crossBadWay from '../../assets/cross-bad.png';
import crossGoodWay from '../../assets/cross-good.png';
import crossBadWayOne from '../../assets/cross-bad1.png';
import crossGoodWayOne from '../../assets/cross-good1.png';
import deserializationBadWay from '../../assets/deserialization-bad.png';
import deserializationGoodWay from '../../assets/deserialization-good.png';
import osBadWay from '../../assets/os-bad.png';
import osGoodWay from '../../assets/os-good.png';

import './Script.css';

class Script extends Component {
  render() {
    var {isActive, type} = this.props;
    var classes = ['script-container', isActive ? 'active' : ''];
    var badWayIcon, goodWayIcon;

    if (type === 'sql') {
      badWayIcon = sqlBadWay;
      goodWayIcon = sqlGoodWay;
    }
    else if (type === 'nosql') {
      badWayIcon = noSqlBadWay;
      goodWayIcon = noSqlGoodWay;
    }
    else if (type === 'ldap') {
      badWayIcon = ldapBadWay;
      goodWayIcon = ldapGoodWay;
    }
    else if (type === 'os') {
      badWayIcon = osBadWay;
      goodWayIcon = osGoodWay;
    }
    else if (type === 'cross') {
      badWayIcon = crossBadWay;
      goodWayIcon = crossGoodWay;
      var badWayIconOne = crossBadWayOne;
      var goodWayIconOne = crossGoodWayOne;
    }
    else if (type === 'deserialization') {
      badWayIcon = deserializationBadWay;
      goodWayIcon = deserializationGoodWay;
    }

    return (
      <div className={classes.join(' ')}>
        <img src={badWayIcon} alt='script'></img>
        {/* {type === 'cross' && <img src={badWayIconOne} alt='script'></img>} */}
        <img src={goodWayIcon} alt='script'></img>
        {/* {type === 'cross' && <img src={goodWayIconOne} alt='script'></img>} */}
      </div>
    )
  }
}

export default Script;