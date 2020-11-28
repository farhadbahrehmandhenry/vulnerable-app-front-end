import React, {Component} from 'react';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import hackerIcon from '../../../assets/hacker.png';
import Form from '../form/Form';
import Result from '../result/Result';
import './Cross-site-scripting.css';

class CrossSiteScripting extends Component {
  state = {
    hackerStatus: false,
    hackerStatus: false,
    badUploadedImages: [],
    goodUploadedImages: []
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
  }

  handleFetchedResult({result}) {
    var {badUploadedImages, goodUploadedImages} = {...this.state};

    if (result.type === 'bad') {
      badUploadedImages.push({imageUrl: result.imageUrl, from: result.from});
      this.setState({badUploadedImages});
    }
    else {
      goodUploadedImages.push({imageUrl: result.imageUrl, from: result.from});
      this.setState({goodUploadedImages});
    }
  }

  render() {
    var classes = ['cross-site-scripting-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')}>
        <div className='cross-site-scripting-hacker-button-container'>
          <div className='cross-site-scripting-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='cross-site-scripting-demonstration'>
          <Hacker isActive={this.state.hackerStatus} text='something.com/something.jpg" onError="alert("hacked!")"' source={hackerIcon} type='ldap'/>
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