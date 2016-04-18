import React from 'react';
import { Editor, Entity, EditorState, ContentState, Modifier, RichUtils, CompositeDecorator, convertFromRaw, convertToRaw } from 'draft-js';
import { connect } from 'react-redux'
import { onChange, addHighlight } from '../actions/editor';

import TagBar from './TagBar';

class DisplayEditor extends React.Component {
  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
    this.handleSave = () => this._handleSaveContent();
  }

  _handleSaveContent() {
    const {editorState} = this.props;
    const content = {
      type: 'Draft-jsRaw',
      raw: convertToRaw(editorState.getCurrentContent())
    };
    this.props.saveContent(content);
  }

  render() {
    //console.log('DisplayEditor.render() props', this.props)
    const {editorState, selectedEntity, onTagClick, onChange} = this.props;
    let tags = []
    if (selectedEntity) {
      tags = Entity.get(selectedEntity).getData().tags;
    }
    return (
      <div className="well" onClick={this.focus}>
      <TagBar selectedTags={tags} onToggle={onTagClick} />
      <hr />
      <Editor
        editorState={editorState}
        onChange={onChange}
        ref="editor"
        spellCheck={true}
      />
      <input onClick={this.handleSave} type="button" value="Save" />
      </div>
    )
  }
}

DisplayEditor.propTypes = {
  scenario: React.PropTypes.object.isRequired,
  comments: React.PropTypes.array,
  saveContent: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor.editorState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTagClick: (tag) => dispatch(addHighlight({ tags: [tag]})),
    onChange: (editorState) => dispatch(onChange(editorState)),
    onSave: (content) => dispatch(saveScenario({
      type: 'Draft-jsRaw',
      raw: content
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEditor);

