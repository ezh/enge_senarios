import helpers from '../utils/helpers'

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const POST_COMMENT = 'POST_COMMENT';

export function fetchComments() {
  return function(dispatch) {
    dispatch(requestComments());
  }
}
