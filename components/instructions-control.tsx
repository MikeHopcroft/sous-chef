import React from "react";
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  ApplicationState,
  AnyAction,
  SessionState,
  updateProperties
} from "../actions";

import { createRandomOrder } from '../lib';

const markdown = require('./instructions.md').default.toString();

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
  dispatchAnyAction(action: AnyAction);
};

class InstructionsControl extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.onContinue = this.onContinue.bind(this);
  }

  onContinue() {
    const action = updateProperties({
      state: SessionState.ORDERING,
      currentOrder: createRandomOrder(this.props.application.bluePlateWorld)
    });
    this.props.dispatchAnyAction(action);
  }

  render() {
    return (
      <div>
        <ReactMarkdown source={markdown}/>
        <Button
            className="btn btn-success btn-sm"
            // disabled={
            //   !this.props.application.speechConfig.speechSupport ||
            //   this.props.application.isRecording
            // }
            onClick={this.onContinue}
          >
            Practice
        </Button>
      </div>
    )
  }
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchAnyAction(action: AnyAction) {
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructionsControl);
