import React, { PropTypes } from 'react';
import { Entity, CompositeDecorator } from 'draft-js';

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
    //backgroundColor: 'rgba(204,122,222,1.0)',
    padding: '2px 0',
  }
};

export const Highlight = (props) => {
  const style = styles.highlight;
  return (
    <mark {...props} style={style} className="bg-info">
    {props.children}
    </mark>
  );
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

export const decorator = new CompositeDecorator([
  {
    strategy: findHighlightEntities,
    component: Highlight
  }
]);

// Helpers for draft-js, maybe best in separate file
export function getEntityKey(editorState) {
  const selectionState = editorState.getSelection();
  const startKey = selectionState.getStartKey();
  const key = editorState
    .getCurrentContent()
    .getBlockForKey(startKey).getEntityAt(selectionState.getStartOffset());
  return key;
}

export function getHighlightTags(editorState) {
  let tags = [];
  const key = getEntityKey(editorState);
  if (key) {
    const data = Entity.get(key).getData();
    if (data.tags) {
      tags = data.tags;
    }
  }
  return tags;
}

export function getHighlightComments(editorState) {
  return ['not implemented'];
}
