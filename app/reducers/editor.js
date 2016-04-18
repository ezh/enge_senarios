import { ENTITY_CHANGE, INIT_EDITOR, ON_CHANGE, ADD_HIGHLIGHT, SET_CONTENT, SET_SELECTED_ENTITY } from '../actions/editor';
import { Entity, EditorState, ContentState, Modifier, convertFromRaw, convertToRaw } from 'draft-js';
import { decorator, getEntityKey } from '../utils/editor-helper'

const setContent = (state, content) => {
  if (content && content.type && content.type === 'Draft-jsRaw') {
    const blocks = convertFromRaw(content.raw);
    return Object.assign({}, state, {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(blocks),
        decorator
      )
    });
  }
  return state;
}

const contentFromState = (editorState) => {
  return {
    type: 'Draft-jsRaw',
    raw: convertToRaw(editorState.getCurrentContent())
  }
}

export const editor = (state = {
  selectedEntity: null,
  editorState: EditorState.createEmpty(decorator)
}, action) => {
  //console.log('editor.dispatch', action);
  const { editorState } = state;
  switch(action.type) {
    case SET_SELECTED_ENTITY:
      return Object.assign({}, state, {
        selectedEntity: action.key,
      });
    case ON_CHANGE:
      return Object.assign({}, state, {
        selectedEntity: getEntityKey(action.editorState),
        //        needsSave: !(action.scenario.content === contentFromState(action.editorState)),
        editorState: action.editorState
      });
    case INIT_EDITOR:
      return Object.assign({}, state, {
        editorState: EditorState.createEmpty(decorator)
      });
    case SET_CONTENT:
      const {content} = action;
      return setContent(state, content);
      break;
    case ADD_HIGHLIGHT:
      const key = Entity.create('HIGHLIGHT', 'MUTABLE', action.data);
      //console.log('editorState', editorState)
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      if (!selection.isCollapsed()) {
        const newContentState = Modifier.applyEntity(
          contentState,
          selection,
          key
        );
        const nextEditorState = EditorState.push(editorState, newContentState, "apply-entity");
        return Object.assign({}, state, {
          editorState: nextEditorState
        });
      }
    default:
      return state;
  }
  return state;
}

export default editor;
