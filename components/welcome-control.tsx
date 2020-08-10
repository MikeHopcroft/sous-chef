import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  ApplicationState,
  AnyAction,
  SessionState,
  updateProperties
} from "../actions";

const markdown = require('./welcome.md').default.toString();

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
  dispatchAnyAction(action: AnyAction);
};

interface State {
  termsAccepted: boolean;
}

class WelcomeControl extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { termsAccepted: false };
    this.onAccepted = this.onAccepted.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  onAccepted(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ termsAccepted: e.target.checked })
  }

  onContinue() {
    const action = updateProperties({
      state: SessionState.INSTRUCTIONS,
      termsAccepted: true
    });
    this.props.dispatchAnyAction(action);
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>
              <ReactMarkdown source={markdown}/>
            </Form.Label>
            <Form.Check
              name='accepted'
              type='checkbox'
              label='I accept these terms.'
              onChange={this.onAccepted}
              style={{paddingLeft: '2em'}}
            />
          </Form.Group>
        </Form>
        <Button
            className="btn btn-success btn-sm"
            disabled={ !this.state.termsAccepted }
            onClick={ this.onContinue }
          >
            Continue
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeControl);
