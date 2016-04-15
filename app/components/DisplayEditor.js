import React from 'react';
import { Editor, Entity, EditorState, ContentState, Modifier, RichUtils, CompositeDecorator, convertFromRaw, convertToRaw } from 'draft-js';

import TagBar from './TagBar';
import helpers from '../utils/helpers';

const styles = {
  social: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '2px 0',
  },
  technical: {
    backgroundColor: 'rgba(204,204,255,1.0)',
    padding: '2px 0',
  },
  economic: {
    backgroundColor: 'rgba(248,222,128,1.0)',
    padding: '2px 0',
  },
  highlight: {
    backgroundColor: 'rgba(248,122,222,1.0)',
    padding: '2px 0',
  }
};

function findHighlightEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey != null && Entity.get(entityKey).getType() === 'HIGHLIGHT'
      );
    },
    callback
  );
}

const Highlight = (props) => {
  const style = styles.highlight;
  return (
    <span {...props} style={style}>
    {props.children}
    </span>
  );
};

function initialEditorState(props) {
  console.log('initialEditorState', props)
  const decorator = new CompositeDecorator([
    {
      strategy: findHighlightEntities,
      component: Highlight
    }
  ]);

  const content = props.scenario.content;

  if (content && content.type && content.type == 'Draft-jsRaw') {
    const blocks = convertFromRaw(content.raw);
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(blocks),
      decorator
    );
  } else {
    return EditorState.createEmpty(decorator);
  }
}

class DisplayEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty() };
    //this.init(props);
    this.selectedEntity = null;
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this._onChange(editorState);
    this.handleTagClick = (tag) => this._handleTagClick(tag);
    this.saveContent = () => this._handleSaveContent();
  }

  logState() {
    const content = this.state.editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }

  _onChange(editorState) {
    const key = helpers.getEntityKey(editorState);

    if (key !== this.selectedEntity) {
      console.log('props.entityChange', key);
      //const entity = Entity.get(key);
      //console.log('entity', entity)
      this.props.entityChange(key);
      this.selectedEntity = key;
    }

    //onEntityChange()
    this.setState({editorState: editorState});
  }
  
  _addHighlight(data) {
    console.log('Adding a highlight');
    const key = Entity.create('HIGHLIGHT', 'MUTABLE', data);
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    if (!selection.isCollapsed()) {
      const newContentState = Modifier.applyEntity(
        contentState,
        selection,
        key
      );
      console.log(convertToRaw(contentState));
      const nextEditorState = EditorState.push(editorState, newContentState, "apply-entity");
      console.log(convertToRaw(newContentState));
      this.onChange(nextEditorState);
    }
  }

  init(props) {
    this.setState({editorState: initialEditorState(props)});
  }

  _handleTagClick(tag) {
    console.log(`You clicked the ${tag} button!`);
    this._addHighlight({tags: [tag]})
  }

  _handleCommentClick() {
    console.log('You are adding a comment');
    this._addHighlight({comments: []});
  }

  _handleSaveContent() {
    const {editorState} = this.state;
    const content = {
      type: 'Draft-jsRaw',
      raw: convertToRaw(editorState.getCurrentContent())
    };
    this.props.saveContent(content);
  }

  componentDidMount() {
    this.init(this.props);
  }
  
  componentWillReceiveProps(newProps) {
    this.init(newProps);
  }
  
  render() {
    console.log('DisplayEditor.render() props', this.props)
    console.log('DisplayEditor.render() state', this.state)
      
    const {editorState} = this.state;
    const {selectedEntity} = this.props;

    return (
      <div className="well" onClick={this.focus}>
      <TagBar editorState={editorState} onToggle={this.handleTagClick} />
      <hr />
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        ref="editor"
        spellCheck={true}
      />
      <input onClick={this.saveContent} type="button" value="Save" />
      </div>
    )
  }
}

DisplayEditor.propTypes = {
  scenario: React.PropTypes.object.isRequired,
  comments: React.PropTypes.array,
  saveContent: React.PropTypes.func.isRequired
}

export default DisplayEditor;

