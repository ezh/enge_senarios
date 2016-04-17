import React, { PropTypes } from 'react';
import Comment from './Comment';

const CommentList = ({comments}) => {
  return (
    <div>
    <ol className="media-list">
    {comments.map((comment,index) =>
      <Comment key={comment.comment._id ? comment.comment_id : index} author={comment.comment.author} text={comment.comment.text} />
    )}
    </ol>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList;
