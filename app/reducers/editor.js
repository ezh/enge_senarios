import { ENTITY_CHANGE, INIT_EDITOR } from '../actions/editor';
import { Editor, Entity, EditorState, ContentState, Modifier, RichUtils, CompositeDecorator, convertFromRaw, convertToRaw } from 'draft-js';

export const editor = (state = {
  selectedEntity: null,
  showAddComment: false,
  editorState: null
}, action) => {
  switch(action.type) {
    case ENTITY_CHANGE:
      return state; //TODO: wtf!
      return Object.assign({}, state, {
        selectedEntity: action.key,
        showAddComment: (action.key !== null)
      });
    case INIT_EDITOR:
      return Object.assign({}, state, {
        editorState: EditorState.createEmpty(decorator)
      })
      default:
      return state;
  }
}

export default editor;
