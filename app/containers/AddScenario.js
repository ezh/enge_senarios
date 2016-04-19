import React from 'react';

let AddScenario = ({onAdd, author}) => {
  let input;
 
  return (
    <div className="input-group col-md-12">
    <div className="col-md-8">
    <input type="text" className="form-control" placeholder="Add new scenario" ref={node => {
      input = node
    }}/>
    </div>
    <div className="col-md-2">
    by {author}
    </div>
    <div className="input-group-btn col-md-2">
    <button className="btn btn-default" type="button" onClick={() => {
      onAdd(input.value);
      input.value = '';
    }}>Add</button>
    </div>
    </div>
  );
}

AddScenario.propTypes = {
  onAdd: React.PropTypes.func.isRequired
}

export default AddScenario;
