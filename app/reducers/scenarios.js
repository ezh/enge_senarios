import { ADD_SCENARIO, SAVE_SCENARIO, DELETE_SCENARIO, REQUEST_SCENARIOS, RECEIVE_SCENARIOS, REQUEST_SCENARIO, RECEIVE_SCENARIO, UPDATE_REVISION } from '../actions/scenarios'

export const scenario = (state = {
  isFetching: false,
  scenario: {}
}, action) => {
  switch(action.type) {
    case REQUEST_SCENARIO:
      return Object.assign({}, state, {
        isFetching: true,
        scenario: {},
        comments: [],
      });

      break;
    case RECEIVE_SCENARIO:
      return Object.assign({}, state, {
        isFetching: false,
        scenario: action.scenario,
        comments: action.comments,
        lastUpdated: action.receivedAt
      });
      break;
    case UPDATE_REVISION:
      let scenario = state.scenario;
      scenario._rev = action.rev;
      return Object.assign({}, state, {
        isFetching: false,
        scenario: scenario
      });
    default:
      return state;
  }
}

const static_scenarios = (state = [], action) => {
  let index
  switch(action.type) {
    case ADD_SCENARIO:
      return [
        ...state,
        {
          title: action.scenario,
          author: action.username,
          content: {
            type: 'none'
          }
        }
      ];
      break;
    case SAVE_SCENARIO:
      index = state.findIndex((s) => s._id == action.id );
      if (typeof(index) != 'undefined') {
        return [
          ...scenarios.slice(0, index),
          action.data,
          ...scenarios.slice(index + 1)
        ];
      } else {
        return state;
      }
      break;
    case DELETE_SCENARIO:
      index = state.findIndex((s) => s._id == action.id );
      if (typeof(index) != 'undefined') {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
}

export const scenarios = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  lastUpdated: null
}, action) => {
  switch(action.type) {
    case REQUEST_SCENARIOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_SCENARIOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.scenarios,
        lastUpdated: action.receivedAt
      });
    case DELETE_SCENARIO:
      const index = state.items.findIndex(scenario => scenario._id === action.id);
      console.log('DELETE_SCENARIO', action, index)
      return Object.assign({}, state, {
        items: [ ...state.items.slice(0, index),
          ...state.items.slice(index+1)
        ]
      });
    case ADD_SCENARIO:
      return Object.assign({}, state, {
        items: [ ...state.items,
          action.payload
        ]
      });
      break;
    default:
      return state;
  }
}

export default { scenario, scenarios };
