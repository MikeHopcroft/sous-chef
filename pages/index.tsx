import React from 'react';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeLatest } from 'redux-saga/effects';

import {
  ActionType,
  initialState,
  loadWorld,
  loadWorldSaga,
  transcriptionReadySaga
} from '../actions';

import { ApplicationStateReducer } from '../actions/reducers'
import FrameControl from '../components/frame-control';

const sagaMiddleware = createSagaMiddleware()

const initial = initialState();
const store = createStore(
  ApplicationStateReducer,
  applyMiddleware(sagaMiddleware)
);

// // https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
// let speechConfig = initial.speechConfig;
// store.subscribe(() => {
//   const config = store.getState().speechConfig;
//   if (config !== speechConfig) {
//     speechConfig = config;
//     saveSpeechConfig(speechConfig);
//   }
// });

sagaMiddleware.run(initSagas)
store.dispatch(loadWorld('en-US'));

function* initSagas() {
  // console.log('initSagas()');
  yield takeLatest(ActionType.LOAD_WORLD, loadWorldSaga);
  yield takeLatest(ActionType.TRANSCRIPT_READY, transcriptionReadySaga);
}

export default function Home() {
  return (
    <Provider store={store}>
        <FrameControl/>
    </Provider>
  );
}
