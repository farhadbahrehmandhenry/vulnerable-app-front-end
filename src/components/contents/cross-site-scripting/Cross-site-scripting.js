import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import Buttons from '../../buttons/Buttons.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';

import './Cross-site-scripting.css';

class CrossSiteScripting extends Component {
  state = {
    hackerStatus: false,
    scriptStatus: true,
    badUploadedImages: [],
    goodUploadedImages: []
  }

  handleHackerButtonClick({status}) {
    this.setState({hackerStatus: status});
  }

  handleScriptButtonClick({status}) {
    this.setState({scriptStatus: status});
  }

  handleFetchedResult({result}) {
    var {badUploadedImages, goodUploadedImages} = {...this.state};

    if (result.type === 'bad') {
      badUploadedImages.push({imageUrl: result.imageUrl, from: result.from, type: 'bad'});
      this.setState({badUploadedImages});
    }
    else {
      goodUploadedImages.push({imageUrl: result.imageUrl, from: result.from, type: 'good'});
      this.setState({goodUploadedImages});
    }
  }

  render() {
    var classes = ['cross-site-scripting-container', this.props.isActive ? 'active' : ''];
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
        />
        <div className={_.join(demonstrationClasses, ' ')}>
          <Hacker isActive={this.state.hackerStatus} text='x.jpg" onClick="alert()"' source={hackerIcon} type='ldap'/>
          <Form 
            forms={{
              title: 'upload an image', 
              vulneribility: 'cross',
              textboxes:['cross images'],
              components: [
                {
                  id: 1, 
                  inputs: ['imageUrl'], 
                  buttons: [{type: 'Upload'}], 
                  title: 'insecure cross site scripting', 
                  type: 'bad', 
                  direction: 'column',
                  listOfItems: this.state.badUploadedImages
                },
                {
                  id: 2, 
                  inputs: ['imageUrl'], 
                  buttons: [{type: 'Upload'}], 
                  title: 'secure cross site scripting', 
                  type: 'good', 
                  direction: 'column',
                  listOfItems: this.state.goodUploadedImages
                }
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
        </div>
      </div>
    )
  }
}

export default CrossSiteScripting;
