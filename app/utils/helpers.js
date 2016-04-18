import axios from 'axios';
import { Entity } from 'draft-js';

const hostname = '127.0.0.1';
const port = 5984;
const base_url = 'http://' + hostname + ':' + port;

const SCENARIO_TYPE = 'scenario';
const COMMENT_TYPE = 'comment';

export function getScenarios(){
  return axios.get(`${base_url}/enge_scenarios/_design/scenarios/_view/scenario_list`);
}

export function getScenario(id){
  return axios.get(`${base_url}/enge_scenarios/_design/scenarios/_view/scenario?startkey=["${id}"]&endkey=["${id}",{}]&include_docs=true`)
    .then((response) => {
      return response.data;
    });
}

export function putScenario(id, data) {
  return axios.put(`${base_url}/enge_scenarios/${id}`, data, {
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' }
  });
}

export function deleteScenario(id, rev) {
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

export function postScenario(data) {
  console.log('postScenario', data);
  return _postData(data, SCENARIO_TYPE);
}

export const postComment = (data) => {
  console.log('postComment', data)
   return _postData(data, COMMENT_TYPE)
}

function _postData(data, type) {
  const _data = Object.assign({}, data, {
    type: type
  });
  return axios.post(`${base_url}/enge_scenarios/`, _data, {
    headers: { 'Host': 'localhost', 'Content-Type': 'application/json' }
  });
}

function getComments(scenario){
}

export default { deleteScenario, postScenario, putScenario, getScenario, getScenarios, postComment }
