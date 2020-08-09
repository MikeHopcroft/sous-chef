import React from "react";
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction } from "../actions";

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

class InternalErrorControl extends React.Component<Props> {
  render() {
    return <div>Internal error.</div>
  }
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalErrorControl);
