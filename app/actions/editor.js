export const ENTITY_CHANGE = 'ENTITY_CHANGE';
export const INIT_EDITOR = 'INIT_EDITOR';
export const ADD_HIGHLIGHT = 'ADD_HIGHLIGHT';
export const EDITOR_CHANGE = 'EDITOR_CHANGE';
export const SET_CONTENT = 'SET_CONTENT';
export const SET_SELECTED_ENTITY = 'SET_SELECTED_ENTITY';
export const ON_CHANGE = 'EDITOR_ON_CHANGE';

export function initEditor() {
  return {
    type: INIT_EDITOR
  }
}

export function entityChange(key) {
  return {
    type: ENTITY_CHANGE,
    key: key
  }
}

export function setContent(content) {
  return {
    type: SET_CONTENT,
    content: content
  }
}

export function onChange(editorState) {
  return {
    type: ON_CHANGE,
    editorState: editorState,
  }
}

export function setSelectedEntity(key) {
  return {
    type: SET_SELECTED_ENTITY,
    key: key
  }
}

export function addHighlight(data) {
  return {
    type: ADD_HIGHLIGHT, // use editorState from app state
    data: data
  }
}
