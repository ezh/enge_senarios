import React from 'react';

let AddScenario = ({onAdd}) => {
  let input;
 
  return (
    <div className="input-group col-md-8">
    <input type="text" className="form-control" placeholder="Add new scenario" ref={node => {
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

AddScenario.propTypes = {
  onAdd: React.PropTypes.func.isRequired
}

export default AddScenario;
