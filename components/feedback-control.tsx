import React from "react";
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction } from "../actions";

// import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

class FeebackControl extends React.Component<Props> {
  render() {
    return <div>Gather feedback.</div>
  }
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeebackControl);
