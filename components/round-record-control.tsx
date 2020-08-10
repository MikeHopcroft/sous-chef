import React from "react";
import Button from 'react-bootstrap/Button';
import { FaMicrophone } from 'react-icons/fa';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction } from "../actions";

import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

interface State {
  isRecording: boolean;
}

class RoundRecordControl extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isRecording: false };
    this.startRecording = this.startRecording.bind(this);
  }

  startRecording() {
    this.setState({ isRecording: true });
  }

  render() {
    return (
      <div style={{paddingTop: '2ex'}}>
        <div>
          When you are ready to start or update your order, just press
          the record button, below, and start speaking. You can say things
          like
          <ul>
            <li>"<i>I'd like a grande iced latte</i>"</li>
            <li>"<i>Actually remove the cappuccino</i>"</li>
            <li>"<i>Make that macchiato decaf</i>"</li>
            <li>"<i>Add vanilla syrup to the latte</i>"</li>
            <li>"<i>Also get me a lemon poppy seed muffin</i>"</li>
          </ul>
        </div>
        When you finish speaking, the system will update the cart.
        <div>
          <Button
                className="btn btn-success btn-sm"
                disabled={ this.state.isRecording }
                onClick={this.startRecording}
              >
                <FaMicrophone/> Record
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundRecordControl);
