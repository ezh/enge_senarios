import { combineReducers } from 'redux'
import { scenario, scenarios } from './scenarios'
import comments from './comments'
import editor from './editor'

const scenarioApp = combineReducers({
  scenario,
  scenarios,
  editor,
  comments
})

export default scenarioApp
