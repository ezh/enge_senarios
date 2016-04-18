import React from 'react';

import { Entity } from 'draft-js';

import DisplayEditor from './DisplayEditor';
import Comments from './Comments';

import { connect } from 'react-redux'
import { updateScenario, fetchScenario } from '../actions/scenarios'
import { entityChange } from '../actions/editor'
import { onNewComment } from '../actions/comments'


class Editor extends React.Component{
  constructor(props) {
    super(props);
    //this.fetchState = () => this._fetchState();
    this.handleSaveContent = (content) => this._handleSaveContent(content);
    this.handleAddComment = (text) => this._handleAddComment(text);
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
  }

  _handleAddComment(text) {
    const { scenario, username, editor, addComment } = this.props;
    const comment = {
      parent_id: scenario._id,
      entitykey: editor.selectedEntity,
      author: username,
      text: text,
      createdAt: Date.now()
    }
    addComment(comment);
  }

  render(){
    console.log('Editor.props', this.props);
    const { comments, scenario, entityChange, editor, onChange, showAddComment, commentIds, onAddComment } = this.props;

    return (
      <div>
      <div className="row">
      <div className="col-md-8">
      <h3>{scenario.title}</h3>
      <DisplayEditor editor={editor} scenario={scenario} selectedEntity={editor.selectedEntity} comments={comments} saveContent={this.handleSaveContent} onChange={onChange} />
      </div>
      <div className="col-md-4">
      <Comments onAddComment={this.handleAddComment} />
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
    username: state.users.username,
    scenario: state.scenario.scenario,
    editor: state.editor
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScenario: (id) => dispatch(fetchScenario(id)),
    updateScenario: (id, data) => dispatch(updateScenario(id, data)),
    addComment: (comment) => dispatch(onNewComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
