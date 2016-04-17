import React, { PropTypes } from 'react';

import AddComment from '../containers/AddComment'

const Comment = ({author, text, replies}) => {
  return (
    <li className="media">
    <div className="media-left">
    AVATAR
    </div>
    <div className="media-body">
    <h4 className="media-header">{author}</h4>
    <p>{text}</p>
    { replies && replies.length > 0 &&
      <div class="media">
      {replies.map(comment => {
        <Comment {...comment} />
      })}
      </div>
    }
    Reply: <AddComment />
    </div>
    </li>
  );
}

export default Comment;
