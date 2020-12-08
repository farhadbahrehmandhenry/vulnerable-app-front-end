import { result } from 'lodash';
import React, {Component} from 'react';
import hackerFingerIcon from '../../../assets/hacker-finger.png';
import hackerIcon from '../../../assets/hacker.png';
import Buttons from '../../buttons/Buttons.js';
import _ from 'lodash';
import Hacker from '../../hacker/Hacker.js';
import Form from '../form/Form';
import './Os-injection.css';

class OsInjection extends Component {
  state = {
    hackerStatus: false,
    badCreatedFiles: [],
    scriptStatus: true,
    goodCreatedFiles: []
  }

  handleHackerButtonClick({status}) {
    this.setState({hackerStatus: status});
  }

  handleScriptButtonClick({status}) {
    this.setState({scriptStatus: status});
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
    var demonstrationClasses = ['sql-injection-demonstration', this.state.scriptStatus ? 'active' : ''];

    return (
      <div className={classes.join(' ')} >
        <Buttons 
          hackerButtonClick={({status}) => this.handleHackerButtonClick({status})} 
          scriptButtonClick={({status}) => this.handleScriptButtonClick({status})}
          type='os'
        />
        <div className={_.join(demonstrationClasses, ' ')}>
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
          <Hacker isActive={this.state.hackerStatus}  text='test3; ping -i 1 -c 10 127.0.0.1' source={hackerIcon} type='os'/>
        </div>
      </div>
    );
  }
}

export default OsInjection;