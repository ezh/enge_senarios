import React from 'react';

import helpers from '../utils/helpers';

class TagButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.tag);
    };
  }

  render() {
    let className = 'btn';
    if (this.props.active) {
      className += ' btn-primary';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
      {this.props.label}
      </span>
    );
  }
}

const TAGS = [ 'social', 'economic', 'technical' ];


const TagBar = (props) => {
  const {editorState, onToggle, selectedTags} = props

  const isActive = (tag) => {
    return selectedTags.includes(tag);
  };
  return (
    <div className="btn-toolbar" role="toolbar">
    <div className="btn-group" role="group">
    {TAGS.map((tag,index) => <TagButton
      tag={tag}
      active={isActive(tag)}
      label={tag}
      onToggle={() => onToggle(tag)}
      key={index}
      />
    )}
    </div>
    </div>
  );
}

TagBar.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  editorState: React.PropTypes.object.isRequired
};

export default TagBar;
