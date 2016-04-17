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
    backgroundColor: 'rgba(248,122,222,1.0)',
    padding: '2px 0',
  }
};

export const Highlight = (props) => {
  const style = styles.highlight;
  return (
    <span {...props} style={style}>
    {props.children}
    </span>
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
