import { Cart, World } from 'prix-fixe';
import { LexiconSpec, ShortOrderWorld } from 'short-order';
import { InvertedIndex } from 'token-flow';

export const ordersPerSession = 5;
export const roundsPerOrder = 3;

export interface BluePlateWorld {
  prixFixeWorld: World;
  lexiconSpec: LexiconSpec;
  postings: InvertedIndex;
  shortOrderWorld: ShortOrderWorld;
  // testResults: AllTestResults;
};

// interface Cart {
//   items: string[];
// }

export enum SessionState {
  LOADING,
  WELCOME,
  INSTRUCTIONS,
  ORDERING,
  FEEDBACK,
  THANKYOU
}

// export enum OrderState {
//   INITIAL_ATTEMPT,
//   REPAIR_ATTEMPT,
//   FEEDBACK,
//   COMPLETE
// }

// export enum RoundState {
//   BEFORE_RECORD,
//   BEFORE_TRANSCRIPTION,
//   COMPLETE
// }

export interface Round {
  initialCart: Cart;
  transcription?: string;
  resultCart?: Cart;
  resultCartOk?: boolean;
  userTextOk?: boolean;
  userCartOk?: boolean;
  notes?: string;
}

export interface Order {
  // state: OrderState,
  isPractice: boolean;
  expectedCart: Cart;
  rounds: Round[];
}

export interface ApplicationState {
  state: SessionState,
  termsAccepted?: boolean;
  instructionsRead?: boolean;
  currentOrder?: Order;
  currentRound?: Round;
  orders: Order[];
  notes?: string;
  bluePlateWorld?: BluePlateWorld;
}

export function initialState(): ApplicationState {
  return {
    state: SessionState.WELCOME,
    currentOrder: {
      // state: OrderState.INITIAL_ATTEMPT,
      isPractice: false,
      expectedCart: {
        items: [
          {
            uid: 0,
            quantity: 1,
            key: '302:1:2',
            children: []
          }
        ]
      },
      rounds: []
    },
    currentRound: {
      initialCart: { items: [] }
    },
    orders: [],
  }
}
