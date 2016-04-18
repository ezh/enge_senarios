import React, { PropTypes } from 'react';

import { connect } from 'react-redux'

import AddComment from '../containers/AddComment'

import { makeComment } from '../utils/comment-helpers'

import { onNewComment } from '../actions/comments'

const NestedComment = ({author, text, id}) => {
  console.log('nested comment', author, text)
  return (
    <div className="media">
      <div className="media-left">
      </div>
      <div className="media-body">
        <h4 className="media-header">reply by {author}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

const Comment = ({username, author, text, comments, ancestors, canReply, addComment, id }) => {
  const replies = comments.filter(comment => comment.ancestors.includes(id));
  return (
    <li className="media">
    <div className="media-left">
    AVATAR
    </div>
    <div className="media-body">
    <h4 className="media-header">{author}</h4>
    <p>{text}</p>
    { replies.length > 0 && console.log('replies', replies) &&
      <div class="media">
      {replies.map( (comment,index) =>
        <NestedComment key={comment._id} id={comment._id } author={comment.author} text={comment.text} canReply={false} />
      )}
      </div>
    }
    { canReply && <AddComment onAdd={(comment) => addComment(makeComment(comment, username, ancestors)) }/> }
    </div>
    </li>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.users.username,
    comments: state.scenario.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => dispatch(onNewComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
