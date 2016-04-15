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
  const {editorState, onToggle} = props

  const isActive = (tag) => {
    //return false;
    return helpers.getHighlightTags(editorState).includes(tag);
  };
  return (
    <div>
    {TAGS.map((tag,index) => <TagButton
      tag={tag}
      active={isActive(tag)}
      label={tag}
      onToggle={onToggle}
      key={index}
      />
    )}
    </div>
  );
}

TagBar.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  editorState: React.PropTypes.object.isRequired
};

export default TagBar;
