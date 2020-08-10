import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaMicrophone } from 'react-icons/fa';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction, completeRound } from "../actions";

import styles from './controls.module.css';

import RoundFeedbackControl from "./round-feedback-control";
import RoundRecordControl from "./round-record-control";

interface Props {
  application: ApplicationState;
  dispatchAnyAction(action: AnyAction);
};

class RoundControl extends React.Component<Props, State> {
  notes = React.createRef<HTMLTextAreaElement>();

  constructor(props) {
    super(props);
  }

  render() {
    const round = this.props.application.currentRound;
    if (round === undefined) {
      // We've finished all order update rounds.
      // Gather feedback on this order.
      return <div>Gather feedback on order here</div>
    } else if (round.resultCart === undefined) {
      // We're waiting to record user speech.
      return <RoundRecordControl/>
    } else {
      return <RoundFeedbackControl/>
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(RoundControl);
