import { combineReducers } from 'redux'
import { scenario, scenarios } from './scenarios'
import comments from './comments'
import editor from './editor'
import users from './users'
import aggregate from './aggregate'

const scenarioApp = combineReducers({
  users,
  scenario,
  scenarios,
  editor,
  comments,
  aggregate
})

export default scenarioApp
