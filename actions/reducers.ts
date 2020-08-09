import { Reducer } from 'redux';

import {
  ActionType,
  AnyAction,
  UpdatePropertiesAction
} from './actions';

import {
  ApplicationState,
  initialState,
} from './application-state';

///////////////////////////////////////////////////////////////////////////////
//
// Reducer
//
///////////////////////////////////////////////////////////////////////////////
export const ApplicationStateReducer: Reducer<ApplicationState, AnyAction> =
  (state: ApplicationState = initialState(), action): ApplicationState => {
    switch (action.type) {
      case ActionType.UPDATE_PROPERTIES:
        return applyUpdateProperties(state, action);
      default:
        return state;
    }
  };


function applyUpdateProperties(
  appState: ApplicationState,
  { updates }: UpdatePropertiesAction
): ApplicationState {
  return {
    ...appState,
    ...updates
  }
}
