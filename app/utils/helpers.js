import axios from 'axios';
import { Entity } from 'draft-js';

import { base_url, host } from '../config'

const SCENARIO_TYPE = 'scenario';
const COMMENT_TYPE = 'comment';

export const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const getDateArray = (date) => {
  console.log('get Date array', date)
  return [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ]
}

export function getScenarios(){
  return axios.get(`${base_url}/scenario_list`, {
    headers: { 'Host': host, 'Content-Type': 'application/json' }
  });
}

export function getScenario(id){
  return axios.get(`${base_url}/scenario/${id}`, {
    headers: { 'Host': host, 'Content-Type': 'application/json', 'Origin': host }
  })
    .then((response) => {
      return response.data;
    });
}

export function putScenario(id, data) {
  return axios.put(`${base_url}/scenario/${id}`, data, {
    headers: { 'Host': host, 'Content-Type': 'application/json' }
  });
}

export function deleteScenario(id, rev) {
  //return axios({
  //  method: 'delete',
  //  url: `${base_url}/enge_scenarios/${id}`,
  //  headers: { 'Host': host, 'Content-Type': 'application/json', 'If-Match': rev }
  //});
  return axios.delete(`${base_url}/scenario/${id}`, {
    headers: { 'Host': host, 'Content-Type': 'application/json', 'If-Match': rev },
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
  let meta = { type: type };
  let _id = '';
  if (!data._id) {
    switch(type) {
      case "scenario":
        _id = slugify(data.title + '_' + data.author + '_' + Date.now());
        break;
      case "comment":
        _id = slugify(data.ancestors.join('_') + data.author + '_' + Date.now());
        break;
      default:
        _id = Date.now();
    }
    meta._id = _id;
  }

  const _data = Object.assign({}, data, meta);
  return axios.put(`${base_url}/scenario/${_data._id}`, _data, {
    headers: { 'Host': host, 'Content-Type': 'application/json' }
  });
}

function getComments(scenario){
}

export default { deleteScenario, postScenario, putScenario, getScenario, getScenarios, postComment }
