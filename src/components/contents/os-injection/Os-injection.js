import { result } from 'lodash';
import React, {Component} from 'react';
import hackerFingerIcon from '../../../assets/hacker-finger.png';
import hackerIcon from '../../../assets/hacker.png';
import Hacker from '../../hacker/Hacker.js';
import Form from '../form/Form';
import './Os-injection.css';

class OsInjection extends Component {
  state = {
    hackerStatus: false,
    badCreatedFiles: [],
    goodCreatedFiles: []
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
  }

  handleFetchedResult({result}) {
    var {badCreatedFiles, goodCreatedFiles} = {...this.state};

    if (result.type === 'bad') {
      badCreatedFiles.push({fileName: result.res.fileName, time: result.res.time, status: result.res.type, from:result.from});
      this.setState({badCreatedFiles});
    }
    else {
      goodCreatedFiles.push({fileName: result.res.fileName, time: result.res.time, status: result.res.type, from:result.from});
      this.setState({goodCreatedFiles});
    }
  }

  render() {
    var classes = ['os-injection-container', this.props.isActive ? 'active' : ''];

    return (
      <div className={classes.join(' ')} >
        <div className='os-injection-container-hacker-button-container'>
          <div className='os-injection-container-hacker' onClick={() => this.handleHackerButtonClick()}>
            <img src={hackerIcon}></img>
          </div>
        </div>
        <div className='os-injection-container-demonstration'>
          <Form 
            forms={{
              title: 'Create new file', 
              vulneribility: 'os',
              textboxes:['os files'],
              components: [
                {
                  id: 1, 
                  inputs: ['fileName'], 
                  buttons: [{type: 'Create'}], 
                  title: 'insecure OS Command', 
                  type: 'bad', 
                  direction: 'column',
                  listOfItems: this.state.badCreatedFiles
                },
                {
                  id: 2, 
                  inputs: ['fileName'], 
                  buttons: [{type: 'Create'}], 
                  title: 'secure OS Command', 
                  type: 'good', 
                  direction: 'column',
                  listOfItems: this.state.goodCreatedFiles
                }
              ]
            }}
            handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Hacker isActive={this.state.hackerStatus}  text='test3; ping -i 1 -c 10 127.0.0.1' source={hackerFingerIcon} type='os'/>
        </div>
      </div>
    );
  }
}

export default OsInjection;