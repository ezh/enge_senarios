import helpers from '../utils/helpers'

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const POST_COMMENT = 'POST_COMMENT'; // a post has been requested

export function fetchComments() {
  return function(dispatch) {
    dispatch(requestComments());
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment: comment
  }
}

export function onNewComment(comment) {
  return (dispatch) => {
    //dispatch(requestPost());
    console.log('onNewComment', comment);
    //helpers.putComment(username, text)
    dispatch(addComment(comment));
    //do ajax, on success dispatch(commentSaved())
  }
}
