import React from 'react';

let AddComment = ({onAdd, author}) => {
  let input;
  
  return (
    <div className="input-group">
    <input type="text" className="form-control" placeholder={`Comment as ${author}`} ref={node => {
      input = node
    }}/>
    <span className="input-group-btn">
    <button className="btn btn-default" type="button" onClick={() => {
      onAdd(input.value);
      input.value = '';
    }}>Add</button>
    </span>
    </div>
  );
}

AddComment.propTypes = {
  onAdd: React.PropTypes.func.isRequired
}

export default AddComment;
