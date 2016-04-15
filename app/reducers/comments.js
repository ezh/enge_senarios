import { ADD_COMMENT, FETCH_COMMENTS, REQUEST_COMMENTS, RECEIVE_COMMENTS, REQUEST_POST } from '../actions/comments';

const comments = (state = {
  isFetching: false,
  comments: [],
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
    case REQUEST_POST:
      let comment = action.comment;
      comment.synced = false;
      return Object.assign({}, state, {
        comments: [...state.comments, comment]
      });
    default:
      return state;
  }
}

export default comments;
