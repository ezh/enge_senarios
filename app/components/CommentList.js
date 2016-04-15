import React, { PropTypes } from 'react';
import Comment from './Comment';

const CommentList = ({comments}) => {
  return (
    <div>
    <ol className="media-list">
    {comments.map(comment =>
      <Comment key={comment._id} author={comment.author} text={comment.text} />
    )}
    </ol>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList;
