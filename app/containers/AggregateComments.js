import React, { Compontent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import FilterControls from '../components/FilterControls'
import CommentList from '../components/CommentList'
import { TAGS } from '../components/TagBar'

const groupBy = [
  [ "tag", "glyphicon-tags" ],
  [ "author", "glyphicon-user"]
];

const filterBy = TAGS;


const AggregateComments = ({comments}) => {
  return (
    <div>
    <h4>Aggregate Comments</h4>
    <FilterControls groupByList={groupBy} filterByList={filterBy} onToggle={(label) => console.log('button click', label)} />
    <CommentList readOnly={true} comments={comments} />
    </div>
  )
}

AggregateComments.propTypes = {
  comments: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { scenarioid } = ownProps;
  
  return {
    comments: (state.scenario.comments ? state.scenario.comments : [])
  }
}

export default connect(mapStateToProps)(AggregateComments);
