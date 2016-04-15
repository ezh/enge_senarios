import React from 'react';

import { Entity } from 'draft-js';

import DisplayEditor from './DisplayEditor';
import Comments from './Comments';

import { connect } from 'react-redux'
import { updateScenario, fetchScenario } from '../actions/scenarios'
import { entityChange } from '../actions/editor'

import helpers from '../utils/helpers'

class Editor extends React.Component{
  constructor(props) {
    super(props);
    //this.fetchState = () => this._fetchState();
    this.handleSaveContent = (content) => this._handleSaveContent(content);
  }

  _fetchState() {
    helpers.getScenario(this.props.params.scenarioid)
      .then((data) => this.setState({ scenario: data }));
  }

  _entityChange() {
    
  }
  
  componentDidMount() {
    //lookup scenario for this.props.params.scenarioid
    const { fetchScenario, params } = this.props
    fetchScenario(params.scenarioid)
  }
  
  _handleSaveContent(content) {
    const { updateScenario } = this.props;
    
    let scenario = this.props.scenario;
    scenario.content = content;
    updateScenario(scenario._id, scenario);
    //this.fetchState();
  }

  render(){
    console.log('Editor.props', this.props);
    const { comments, scenario, entityChange, editor } = this.props;

    return (
      <div>
      <div className="row">
      <div className="col-md-8">
      <h3>{scenario.title}</h3>
      <DisplayEditor scenario={scenario} selectedEntity={editor.selectedEntity} comments={comments} saveContent={this.handleSaveContent} entityChange={entityChange} />
      </div>
      <div className="col-md-4">
      <Comments showAddComment={editor.showAddComment} />
      </div>
      </div>
      <div className="row">
      <div className="col-md-8">
      Aggregate
      </div>
      </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    scenario: state.scenario.scenario,
    comments: state.comments,
    editor: state.editor
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScenario: (id) => dispatch(fetchScenario(id)),
    updateScenario: (id, data) => dispatch(updateScenario(id, data)),
    entityChange: (key) => dispatch(entityChange(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
