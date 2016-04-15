import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import scenarioApp from './reducers'

const loggerMiddleware = createLogger();

console.log('configureStore', scenarioApp);

export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    scenarioApp,
    routing: routerReducer
  })

  return createStore(
    scenarioApp,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}

