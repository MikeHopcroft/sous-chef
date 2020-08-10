import { Reducer } from 'redux';

import {
  ActionType,
  AnyAction,
  CompleteRoundAction,
  SetCartAction,
  SetWorldAction,
  UpdatePropertiesAction
} from './actions';

import {
  ApplicationState,
  Round,
  roundsPerOrder,
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
      case ActionType.COMPLETE_ROUND:
        return applyCompleteRound(state, action);
      case ActionType.SET_CART:
        return applySetCart(state, action);
      case ActionType.SET_WORLD:
        return applySetWorld(state, action);
      case ActionType.UPDATE_PROPERTIES:
        return applyUpdateProperties(state, action);
      default:
        return state;
    }
  };

  function applyCompleteRound(
    state: ApplicationState,
    { type, ...rest }: CompleteRoundAction
  ): ApplicationState {
    const round: Round = {
      ...state.currentRound,
      ...rest
    }

    const rounds = state.currentOrder.rounds.concat([round]);

    let currentRound = undefined;
    if (rounds.length < roundsPerOrder && !round.resultCartOk) {
      currentRound = {
        initialCart: round.resultCart
      }
    }

    const currentOrder = {
      ...state.currentOrder,
      rounds
    }

    return { ...state, currentOrder, currentRound };
  }

  function applySetCart(
    appState: ApplicationState,
    { cart }: SetCartAction
  ): ApplicationState {
    return {
      ...appState,
      currentRound: {
        ...appState.currentRound,
        resultCart: cart
      }
    };
  }
    
function applySetWorld(
  appState: ApplicationState,
  { bluePlateWorld }: SetWorldAction
): ApplicationState {
  return {
    ...appState,
    bluePlateWorld,
  };
}

function applyUpdateProperties(
  appState: ApplicationState,
  { updates }: UpdatePropertiesAction
): ApplicationState {
  return {
    ...appState,
    ...updates
  }
}
