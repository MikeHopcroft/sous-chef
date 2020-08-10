export const x = 1;

import {
  CatalogSpec,
  createWorld3,
  loadCatalogSpec,
  LogicalValidationSuite,
  ObjectLoader,
  speechToTextFilter,
  State,
  TextTurn,
} from 'prix-fixe';

import { put, select } from 'redux-saga/effects';
import { createShortOrderWorld2, LexiconSpec } from 'short-order';

import {
//   appendHistory,
  LoadWorldAction,
//   ProcessAction,
  setCart,
  setWorld,
  TranscriptReadyAction,
} from '../actions';

// import { runTests } from '../logic';

import { ApplicationState, BluePlateWorld } from './application-state';
// import { getSampleHistory } from './sample-history';
// import { getSampleHistoryES } from './sample-history-es';

const bakeryEN = require('../data/bakery.yaml');
const coffeeEN = require('../data/coffee.yaml');
const menuEN = require('../data/menu.yaml');
const lexiconSpecEN = require('../data/lexicon.yaml');

function getLoader(language: string) {
  return new ObjectLoader([
    ['/samples/menu/menu.yaml', menuEN],
    ['/samples/menu/bakery.yaml', bakeryEN],
    ['/samples/menu/coffee.yaml', coffeeEN],
  ]);
}

function getLexicon(language: string) {
  return lexiconSpecEN;
}

export function* loadWorldSaga(action: LoadWorldAction) {
  const loader = getLoader(action.language);
  const lexiconSpec = getLexicon(action.language);

  const spec: CatalogSpec = yield loadCatalogSpec(
    loader,
    '/samples/menu/menu.yaml'
  );

  const prixFixeWorld = createWorld3(spec);
  const shortOrderWorld = createShortOrderWorld2(
    prixFixeWorld,
    lexiconSpec,
    'snowball',
    false
  );

  // Sort for display by LexiconControl.
  (lexiconSpec as LexiconSpec).lexicon.sort((a,b) => 
    a.name.localeCompare(b.name)
  );

  const tokenizer = shortOrderWorld.lexer.tokenizer;
  const postings = tokenizer.getPostings();

  const bluePlateWorld: BluePlateWorld = {
    prixFixeWorld,
    lexiconSpec: lexiconSpec,
    postings,
    shortOrderWorld,
  }

  yield(put(setWorld(bluePlateWorld)));
}

// TODO: clean this up.
function getAppState(appState: ApplicationState): ApplicationState {
  return appState;
}

export function* transcriptionReadySaga({
  transcription,
  final
}: TranscriptReadyAction) {
  // TODO: remove final check for interim carts.
  if (final) {
    // TODO: call to speechToTextFilter() should not be duplicated
    // in applyProcess().
    const appState: ApplicationState = yield(select(getAppState));
    // console.log(`raw text: "${text}"`);
    const filtered = speechToTextFilter(transcription);
    // console.log(`filtered text: "${filtered}"`);
    const cart = appState.currentAttempt.initialCart;
    const state0: State = { cart };
    const state1: State = 
      yield appState.bluePlateWorld.shortOrderWorld.processor(
        filtered,
        state0
      );
    yield(put(setCart(state1.cart)));
    // yield(put(appendHistory(state1.cart, source, text)));
  }
}
