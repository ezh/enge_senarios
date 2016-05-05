import React, { PropTypes } from 'react';

import { connect } from 'react-redux'

import AddComment from '../containers/AddComment'
import Stickers from './Stickers'

import { makeComment } from '../utils/comment-helpers'

import { onNewComment } from '../actions/comments'
import { initial_users as USERS } from '../reducers/users'

const fullName = (username) => {
  const index = USERS.findIndex(u => (u.username === username))
    console.log('index of user', username, index, USERS)
    return index >= 0 ? USERS[index].full_name : ''
}

const NestedComment = ({author, text, id}) => {
  return (
    <div className="media">
      <div className="media-left">
      </div>
      <div className="media-body">
        <h4 className="media-header">{fullName(author)}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

const Comment = ({username, author, text, comments, ancestors, canReply, addComment, id, showStickers=false }) => {
  const replies = comments.filter(comment => comment.ancestors.includes(id));
  return (
    <li className="media">
    <div className="media-left media-middle">
    <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
    </div>
    <div className="media-body">
    <h4 className="media-header">{fullName(author)}</h4>
    <p>{text}</p>
    { showStickers && <Stickers /> }
    { replies.length > 0 && console.log('replies', replies) &&
      <div className="media">
      {replies.map( (comment,index) =>
        <NestedComment key={comment._id} id={comment._id } author={comment.author} text={comment.text} canReply={false} />
      )}
      </div>
    }
    { canReply && <AddComment author={username} onAdd={(comment) => addComment(makeComment(comment, username, ancestors)) }/> }
    </div>
    </li>
  );
}

const mapStateToProps = (state, ownProps) => {
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
