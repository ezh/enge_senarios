import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import AddScenario from '../containers/AddScenario'
import ScenarioList from './ScenarioList'

import { fetchScenarios, deleteScenario, addScenario } from '../actions/scenarios'

class Scenarios extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);  
  }

  componentDidMount() {
    const { fetchScenarios } = this.props
    fetchScenarios();
  }

  componentWillReceiveProps(newProps) {
    console.log('Scenario will receive props', newProps);
  }

  handleChange() {
    //this.props.dispatch
  }

  render() {
    const { onAddScenario, onDeleteScenario, username, scenarios } = this.props
    const { isFetching, items, addScenario } = scenarios

    return (
      <div>
      <AddScenario onAdd={(scenario) => onAddScenario(username, scenario)} />
      {isFetching && items.length === 0 &&
        <h2>Loading...</h2>
      }
      {!isFetching && items.length === 0 &&
        <h2>Empty...</h2>
      }
      <ScenarioList scenarios={items} onDelete={onDeleteScenario} />
      </div>
    );
  }
}

Scenarios.propTypes = {
  scenarios: React.PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    username: state.users.username,
    scenarios: state.scenarios
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddScenario: (username, scenario) => {
      dispatch(addScenario(username, scenario))
    },
    onDeleteScenario: (id, rev) => {
      dispatch(deleteScenario(id, rev))
    },
    fetchScenarios: () => {
      dispatch(fetchScenarios())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios);
