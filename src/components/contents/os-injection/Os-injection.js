import React, {Component} from 'react';
import hackerFingerIcon from '../../../assets/hacker-finger.png';
import hackerIcon from '../../../assets/hacker.png';
import Hacker from '../../hacker/Hacker.js';
import Form from '../form/Form';
import './Os-injection.css';

class OsInjection extends Component {
  state = {
    hackerStatus: false,
  }

  handleHackerButtonClick() {
    this.setState({hackerStatus: !this.state.hackerStatus});
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
              title: 'Create new file using CLI', 
              vulneribility: 'os',
              textboxes:['os files'],
              components: [
                {id: 1, inputs: ['fileName'], buttons: ['Create'], title: 'insecure OS Command', type: 'bad', direction: 'column'},
                {id: 2, inputs: ['fileName'], buttons: ['Create'], title: 'secure OS Command', type: 'good', direction: 'column'}
              ]
            }}
            // handleFetch={({result}) => this.handleFetchedResult({result})}
          />
          <Hacker isActive={this.state.hackerStatus}  text='3 OR 1=1' source={hackerFingerIcon} type='os'/>
        </div>
      </div>
    );
  }
}

export default OsInjection;