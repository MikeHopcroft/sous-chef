import React from "react";
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction } from "../actions";

const markdown = require('./welcome.md').default.toString();

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

class WelcomeControl extends React.Component<Props> {
  render() {
    // return <div>Welcome. Please accept EULA to continue.</div>
    return (
      <div>
        <ReactMarkdown source={markdown}/>
        <Button
            className="btn btn-success btn-sm"
            // disabled={
            //   !this.props.application.speechConfig.speechSupport ||
            //   this.props.application.isRecording
            // }
            // onClick={this.startRecognition}
          >
            I accept these terms
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeControl);
