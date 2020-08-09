export const ordersPerSession = 3;
export const attemptsPerOrder = 3;

interface Cart {
  items: string[];
}

export enum SessionState {
  LOADING,
  WELCOME,
  INSTRUCTIONS,
  ORDERING,
  FEEDBACK,
  THANKYOU
}

export enum OrderState {
  INITIAL_ATTEMPT,
  REPAIR_ATTEMPT,
  FEEDBACK,
  COMPLETE
}

export enum AttemptState {
  BEFORE_RECORD,
  BEFORE_TRANSCRIPTION,
  COMPLETE
}

export interface Attempt {
  initialCart: Cart;
  transcription?: string;
  resultCart?: Cart;
  satisfied?: boolean;
  notes?: string;
}

export interface Order {
  state: OrderState,
  isPractice: boolean;
  expected: Cart;
  attempts: Attempt[];
}

export interface ApplicationState {
  state: SessionState,
  termsAccepted?: boolean;
  instructionsRead?: boolean;
  currentOrder?: Order;
  currentAttemp?: Attempt;
  orders: Order[];
  notes?: string;
}

export function initialState(): ApplicationState {
  return {
    state: SessionState.LOADING,
    orders: [],
  }
}
