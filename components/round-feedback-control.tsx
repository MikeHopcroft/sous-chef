import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaMicrophone } from 'react-icons/fa';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction, completeRound } from "../actions";

import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
  dispatchAnyAction(action: AnyAction);
};

interface State {
  orderOk?: boolean;
  transcriptionOk?: boolean;
}

class RoundFeedbackControl extends React.Component<Props, State> {
  notes = React.createRef<HTMLTextAreaElement>();

  constructor(props) {
    super(props);
    this.state = {
      transcriptionOk: undefined
    }
    this.onOrderOK = this.onOrderOK.bind(this);
    this.onTranscriptionOK = this.onTranscriptionOK.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  onOrderOK(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({orderOk: e.target.value === 'true'});
  }

  onTranscriptionOK(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({transcriptionOk: e.target.value === 'true'});
  }

  onContinue() {
    this.props.dispatchAnyAction(completeRound(
      this.state.transcriptionOk,
      this.state.orderOk,
      this.notes.current.value
    ));
  }

  render() {
    return (
      <Form>
        <div style={{paddingTop: '2ex'}}>
          <div>
            <Form.Group>
              <Form.Label>
                We transcribed your speech as, "<i>I'd like a grande iced latte</i>."
                Did we get the transcription right?
              </Form.Label>
              <Form.Check
                name='transcriptionOK'
                type='radio'
                label='yes'
                value='true'
                defaultChecked={this.state.transcriptionOk === true}
                onChange={this.onTranscriptionOK}
                style={{paddingLeft: '2em'}}
              />
              <Form.Check
                name='transcriptionOK'
                type='radio'
                label='no'
                value='false'
                defaultChecked={this.state.transcriptionOk === false}
                onChange={this.onTranscriptionOK}
                style={{paddingLeft: '2em'}}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group>
              <Form.Label>
                It looks like your order contains the right items.
                Does it contain the items you expected at this point?
              </Form.Label>
              <Form.Check
                name='orderOK'
                type='radio'
                label='yes'
                value='true'
                defaultChecked={this.state.orderOk === true}
                onChange={this.onOrderOK}
                style={{paddingLeft: '2em'}}
              />
              <Form.Check
                name='orderOK'
                type='radio'
                label='no'
                value='false'
                defaultChecked={this.state.orderOk === false}
                onChange={this.onOrderOK}
                style={{paddingLeft: '2em'}}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group>
              <Form.Label>Feel free to elaborate here.</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                cols={80}
                style={{width:'unset'}}
                // placeholder="elaborate"
                ref={this.notes}
                // defaultValue={azureRegion}
              />
            </Form.Group>
          </div>
          <div>
            <Button
              className="btn btn-success btn-sm"
              disabled={
                this.state.transcriptionOk === undefined ||
                this.state.orderOk === undefined
              }
              onClick={this.onContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </Form>
    )
  }
}

      //   <div style={{paddingTop: '1ex'}}>
      //     At this point you can
      //   </div>
      //   <div>
      //     <Button
      //         className="btn btn-success btn-sm"
      //         // disabled={
      //         //   !this.props.application.speechConfig.speechSupport ||
      //         //   this.props.application.isRecording
      //         // }
      //         // onClick={this.startRecognition}
      //       >
      //         <FaMicrophone />
      //         Modify this order
      //     </Button>
      //   </div>
      //   <div>
      //     <Button
      //         className="btn btn-danger btn-sm"
      //         // disabled={
      //         //   !this.props.application.speechConfig.speechSupport ||
      //         //   this.props.application.isRecording
      //         // }
      //         // onClick={this.startRecognition}
      //       >
      //         Try a new order
      //     </Button>
      //   </div>
      //   <div>
      //     <Button
      //         className="btn btn-normal btn-sm"
      //         // disabled={
      //         //   !this.props.application.speechConfig.speechSupport ||
      //         //   this.props.application.isRecording
      //         // }
      //         // onClick={this.startRecognition}
      //       >
      //         Finish your session
      //     </Button>
      //   </div>
      // </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(RoundFeedbackControl);
