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

const Comments = ({ comments, onAddComment, showAddComment }) => {
  console.log('Comments render', comments)
  return (
    <div>
    <h3>Comments</h3>
    <CommentList comments={comments}/>
    { showAddComment &&
      <AddComment onAdd={onAddComment} />
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
  }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    showAddComment: (state.editor.selectedEntity !== null),
    comments: state.comments.items, //.filter((comment) => { getCommentIds(state.editor).includes(comment._id)}),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: () => dispatch(fetchComments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
