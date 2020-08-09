import React from "react";
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
    return <ReactMarkdown source={markdown}/>
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
