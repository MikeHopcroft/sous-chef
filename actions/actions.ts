import { Cart } from 'prix-fixe';

import {
  ApplicationState,
  BluePlateWorld
} from "./application-state";

export enum ActionType {
  ACCEPT_TERMS = 'ACCEPT_TERMS',
  COMPLETE_ROUND = 'COMPLETE_ROUND',
  COMPLETE_SESSION = 'COMPLETE_SESSION',
  LOAD_WORLD = 'LOAD_WORLD',
  SET_CART = 'SET_CART',
  SET_WORLD = 'SET_WORLD',
  TRANSCRIPT_READY = 'TRANSCRIPT_READY',
  UPDATE_PROPERTIES = 'UPDATE_PROPERTIES',
};

export interface AcceptTermsAction {
  type: ActionType.ACCEPT_TERMS;
  termsAccepted: boolean;
};

export function acceptTerms(
  termsAccepted: boolean
): AcceptTermsAction {
  return { 
    type: ActionType.ACCEPT_TERMS,
    termsAccepted,
  };
}

export interface CompleteRoundAction {
  type: ActionType.COMPLETE_ROUND;
  transcriptionOk: boolean;
  cartOk: boolean;
  notes: string;
};

export function completeRound(
  transcriptionOk: boolean,
  cartOk: boolean,
  notes: string
): CompleteRoundAction {
  return { 
    type: ActionType.COMPLETE_ROUND,
    transcriptionOk,
    cartOk,
    notes
  };
}

export interface CompleteSessionAction {
  type: ActionType.COMPLETE_SESSION;
  notes: string;
};

export function completeSession(
  notes: string
): CompleteSessionAction {
  return { 
    type: ActionType.COMPLETE_SESSION,
    notes
  };
}

export interface LoadWorldAction {
  type: ActionType.LOAD_WORLD;
  language: string;
};

export function loadWorld(language: string): LoadWorldAction {
  return { type: ActionType.LOAD_WORLD, language };
}

export interface SetCartAction {
  type: ActionType.SET_CART;
  cart: Cart;
};

export function setCart(cart: Cart): SetCartAction {
  return { type: ActionType.SET_CART, cart };
}

export interface TranscriptReadyAction {
  type: ActionType.TRANSCRIPT_READY;
  transcription: string;
  final: boolean;
};

export interface SetWorldAction {
  type: ActionType.SET_WORLD;
  bluePlateWorld: BluePlateWorld;
};

export function setWorld(
  bluePlateWorld: BluePlateWorld
): SetWorldAction {
  console.log('setWorld');
  return {
    type: ActionType.SET_WORLD,
    bluePlateWorld,
  };
}

export function transcriptionReady(
  transcription: string,
  final: boolean
): TranscriptReadyAction {
  return { 
    type: ActionType.TRANSCRIPT_READY,
    transcription,
    final
  };
}

export interface UpdatePropertiesAction {
  type: ActionType.UPDATE_PROPERTIES,
  updates: Partial<ApplicationState>
};

export function updateProperties(
  updates: Partial<ApplicationState>
): UpdatePropertiesAction {
  return { 
    type: ActionType.UPDATE_PROPERTIES,
    updates
  };
}

export type AnyAction =
  AcceptTermsAction |
  CompleteRoundAction | 
  CompleteSessionAction |
  LoadWorldAction |
  SetCartAction |
  SetWorldAction |
  TranscriptReadyAction |
  UpdatePropertiesAction;
