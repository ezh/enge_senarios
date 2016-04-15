import { createStore } from 'redux'

import scenarioApp from './reducers'

let store = createStore(scenarioApp);

const initialState = {
  messages: [],
  scenarios: []
};

const addMessage = (state, message) => {
  return Object.assign({}, state, {
    messages: [
      ...messages,
      message
    ]
  });
}
