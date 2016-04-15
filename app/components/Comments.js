import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import AddComment from '../containers/AddComment'
import CommentList from './CommentList'

import { fetchComments, addComment } from '../actions/comments';

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments, onAdd, username, showAddComment } = this.props;
    return (
      <div>
      <h3>Comments</h3>
      <CommentList comments={comments.comments}/>
      { showAddComment &&
        <AddComment onAdd={(comment) => onAdd(username, comment)} />
      }
      </div>
    );
  }
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
    comments: state.comments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: () => dispatch(fetchComments()),
    onAdd: (username, comment) => dispatch(addComment(username, comment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
