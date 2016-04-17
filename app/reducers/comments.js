import { ADD_COMMENT, POST_COMMENT, FETCH_COMMENTS, REQUEST_COMMENTS, RECEIVE_COMMENTS, REQUEST_POST } from '../actions/comments';

export const comments = (state = {
  isFetching: false,
  items: [],
  lastUpdate: null
}, action) => {
  switch(action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        comments: action.comments,
        lastUpdate: action.receivedAt
      });
    case ADD_COMMENT:
      const comment = {
        synced: false,
        comment: action.comment
      };
      return Object.assign({}, state, {
        items: [...state.items, comment]
      });
    case POST_COMMENT:
      console.log('POST_COMMENT', action)
    default:
      return state;
  }
}

export default comments;
