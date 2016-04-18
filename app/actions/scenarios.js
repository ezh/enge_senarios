import helpers, { getDateArray } from '../utils/helpers'

export const ADD_SCENARIO = 'ADD_SCENARIO';
export const SAVE_SCENARIO = 'SAVE_SCENARIO';
export const DELETE_SCENARIO = 'DELETE_SCENARIO';


/* Async Actions */
export const FETCH_SCENARIOS = 'FETCH_SCENARIOS';
export const REQUEST_SCENARIOS = 'REQUEST_SCENARIOS';
export const RECEIVE_SCENARIOS = 'RECEIVE_SCENARIOS';

export const FETCH_SCENARIO = 'FETCH_SCENARIO';
export const REQUEST_SCENARIO = 'REQUEST_SCENARIO';
export const RECEIVE_SCENARIO = 'RECEIVE_SCENARIO';
export const UPDATE_REVISION = 'UPDATE_REVISION';

import {setContent} from './editor'

export function addScenario(username, scenario) {
  return function(dispatch) {
    const data = {
      author: username,
      title: scenario,
      created_at: getDateArray(new Date()),
    };
    // dispatch(saving...)
    console.log('dispatch post scenario', data);
    helpers.postScenario(data).then(data => {
      console.log('postScenario respone', data);
      if (data.status === 201) {
        dispatch(fetchScenarios());
      }
    })
  }
}

export function saveSenario(scenario) {
  return {
    type: SAVE_SCENARIO,
    data: scenario
  }
}

export function deleteScenario(id, rev) {
  return function(dispatch) {
    helpers.deleteScenario(id, rev).then(response => {
      if (data.status === 201) {
        dispatch(fetchScenarios());
      }
    });
  }
  return {
    type: DELETE_SCENARIO,
    id: id
  }
}

export function requestScenarios() {
  return {
    type: REQUEST_SCENARIOS
  }
}

export function updateScenario(id, data) {
  return function(dispatch) {
    helpers.putScenario(id, data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(updateRevision(id, response.data.rev))
        } else {
          console.log('updateScenario', response);
        }
      });
  }
}

export function updateRevision(id, rev) {
  return {
    type: UPDATE_REVISION,
    id: id,
    rev: rev,
    updated_at: getDateArray(new Date())
  }
}

export function receiveScenarios(json) {
  return {
    type: RECEIVE_SCENARIOS,
    scenarios: json.data.rows.map(child => child.value),
    received_at: getDateArray(new Date())
  }
}

export function requestScenario() {
  return {
    type: REQUEST_SCENARIO
  }
}

export function receiveScenario(json) {
  return (dispatch) => {
    const scenario = json.rows[0].doc;
    dispatch(setScenario(scenario, json.rows.length > 1 ? json.rows.slice(1).map(row => row.doc) : []))
    dispatch(setContent(scenario.content));
  }
}

export function setScenario(json, comments=[]) {
  return {
    type: RECEIVE_SCENARIO,
    scenario: json,
    comments: comments
  }
}

export function fetchScenarios() {
  return function(dispatch) {
    dispatch(requestScenarios());

    helpers.getScenarios()
      .then((data) => {
        dispatch(receiveScenarios(data))
      })
  }
}

export function fetchScenario(id) {
  return function(dispatch) {
    dispatch(requestScenario());

    console.log(`fetch Scenario ${id}`)
    helpers.getScenario(id)
      .then(data => dispatch(receiveScenario(data)));
  }
}

export function storeScenario(scenario) {
  postScenario(scenario).
    then((data) => {
      console.log('storeScenario', data)
    })
}
