import { connect } from 'react-redux'
import ScenarioList from '../components/ScenarioList'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddScenario: (scenario) => {
      dispatch(addScenario(scenario))
    },
    onDeleteScenario: (id) => {
      dispatch(removeScenario(id))
    }
  };
}

const VisibleScenarioList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScenarioList);

export default VisibleScenarioList;
