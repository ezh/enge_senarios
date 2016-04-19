import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import AddComment from '../containers/AddComment'
import CommentList from './CommentList'

import { fetchComments, addComment } from '../actions/comments';

const getCommentIds = (editor) => {
  const data =  editor.selectedEntity !== null ? Entity.get(editor.selectedEntity).getData() : {};
  if (data.comments) {
    return data.comments;
  }
  return [];
}

const Comments = ({ comments, onAddComment, showAddComment, username }) => {
  console.log('Comments render', comments)
  return (
    <div>
    <h3>Comments</h3>
    <CommentList comments={comments}/>
    { showAddComment &&
      <AddComment author={username} onAdd={onAddComment} />
    }
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string,
    syncing: PropTypes.bool.isRequired
  })).isRequired
}

const mapStateToProps = (state) => {
  console.log('comments stateToProps state', state)
  return {
    username: state.users.username,
    showAddComment: (state.editor.selectedEntity !== null),
    comments: (state.scenario.comments ? state.scenario.comments : []).filter(comment => comment.entitykey === state.editor.selectedEntity), //.filter((comment) => { getCommentIds(state.editor).includes(comment._id)}),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: () => dispatch(fetchComments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
