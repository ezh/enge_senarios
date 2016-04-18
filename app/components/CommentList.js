import React, { PropTypes } from 'react';
import Comment from './Comment';

const CommentList = ({comments, readOnly}) => {
  return (
    <div>
    <ol className="media-list">
    {comments.map((comment,index) =>
      <Comment canReply={!readOnly} key={comment._id ? comment._id : index} author={comment.author} ancestors={comment.ancestors.concat(comment._id)} text={comment.text} />
    )}
    </ol>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList;
