import {
  ApplicationState
} from "./application-state";

export enum ActionType {
  ACCEPT_TERMS = 'ACCEPT_TERMS',
  COMPLETE_ROUND = 'COMPLETE_ROUND',
  COMPLETE_SESSION = 'COMPLETE_SESSION',
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
  satistifed: boolean;
  notes: string;
};

export function completeRound(
  satistifed: boolean,
  notes: string
): CompleteRoundAction {
  return { 
    type: ActionType.COMPLETE_ROUND,
    satistifed,
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

export interface TranscriptReadyAction {
  type: ActionType.TRANSCRIPT_READY;
  transcription: string;
  final: boolean;
};

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
  TranscriptReadyAction |
  UpdatePropertiesAction;
