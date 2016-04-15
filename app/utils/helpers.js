import axios from 'axios';
import { Entity } from 'draft-js';

const hostname = '127.0.0.1';
const port = 5984;
const base_url = 'http://' + hostname + ':' + port;

function getScenarios(){
  return axios.get(`${base_url}/enge_scenarios/_design/scenarios/_view/scenario_list`);
}

function getScenario(id){
  return axios.get(`${base_url}/enge_scenarios/${id}`)
    .then((response) => {
      return response.data;
    });
}

function putScenario(id, data) {
  return axios.put(`${base_url}/enge_scenarios/${id}`, data, {
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' }
  });
}

function deleteScenario(id, rev) {
  return axios({
    method: 'delete',
    url: `${base_url}/enge_scenarios/${id}`,
    data: { '_rev': rev },
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' }
  });
  return axios.delete(`${base_url}/enge_scenarios/${id}`, {
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' },
    data: { '_rev': rev }
  });
}

function postScenario(data) {
  console.log('postScenario', data);
  data.type = 'scenario';
  return axios.post(`${base_url}/enge_scenarios/`, data, {
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' }
  });
}

function getComments(scenario){
}

// Helpers for draft-js, maybe best in separate file
function getEntityKey(editorState) {
  const selectionState = editorState.getSelection();
  const startKey = selectionState.getStartKey();
  const key = editorState
    .getCurrentContent()
    .getBlockForKey(startKey).getEntityAt(selectionState.getStartOffset());
  return key;
}

function getHighlightTags(editorState) {
  let tags = [];
  const key = getEntityKey(editorState);
  if (key) {
    const data = Entity.get(key).getData();
    if (data.tags) {
      tags = data.tags;
    }
  }
  return tags;
}

function getHighlightComments(editorState) {
  return ['not implemented'];
}

const helpers = {
  getScenarios(){
    return [];
  }
};

export default { getScenarios, getScenario, putScenario, postScenario, deleteScenario, getHighlightTags, getHighlightComments, getEntityKey };
