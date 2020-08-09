import React from "react";
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction, SessionState } from "../actions";

import Feedback from './feedback-control';
import Instructions from './instructions-control';
import InternalError from './internal-error-control';
import Loading from './loading-control';
import Order from './order-control';
import Thankyou from './thankyou-control';
import Welcome from './welcome-control';

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

class FrameControl extends React.Component<Props> {
  render() {
    switch (this.props.application.state) {
      case SessionState.LOADING:
        return <Loading />;
      case SessionState.WELCOME:
        return <Welcome />;
      case SessionState.INSTRUCTIONS:
        return <Instructions />;
      case SessionState.ORDERING:
        return <Order />;
      case SessionState.FEEDBACK:
        return <Feedback />;
      case SessionState.THANKYOU:
        return <Thankyou />;
      default:
        return <InternalError />;
    }
  }
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameControl);
