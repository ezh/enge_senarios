import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const Scenario = ({ title, _id, author, onDeleteClick }) => {
  return (
    <li className='list-group-item row'>
    <span className='col-md-8'>
    <Link to={`/scenario/${_id}`}>{title}</Link>
    </span>
    <span className='col-md-2'>{author}</span>
    <span className='btn col-md-2' onClick={onDeleteClick}>X</span>
    </li>
  )
}

const ScenarioList = ({ scenarios, onDelete }) => {
  return (
    <div>
    <ul className="list-group">
    {scenarios.map(scenario => 
      <Scenario
        key={scenario._id}
        {...scenario}
        onDeleteClick={() => onDelete(scenario._id, scenario._rev)}
      />
    )}
    </ul>
    </div>
  );
}

ScenarioList.propTypes = {
  scenarios: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};


export default ScenarioList;
