import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import { toggleGroupBy, toggleFilterBy } from '../actions/aggregate'

import Stickers from './Stickers'

const Button = ({label, isActive, onClick, iconLabel }) => {
  let btnClass = 'btn-default'
  if (isActive) {
    btnClass += ' active'
  }
  
  return (
    <button className={`btn ${btnClass}`}>
    <span className={"glyphicon " + iconLabel}></span>
    &nbsp;
    {label}
    </button>
  )
}

const FilterControls = ({groupByList, filterByList, filteringBy, groupingBy, toggleGroupBy, toggleFilterBy}) => {
  return (
    <div>
    <div className="row">
    <span>Group by: </span>
    <div className="btn-toolbar" role="toolbar" aria-label="Controls to group and filter aggregate comments">
    <div id="groupBy-btn-group" className="btn-group" role="group">
    {groupByList.map((value, index) => <Button
      label={value[0]}
      key={index}
      isActive={groupingBy === value}
      iconLabel={value[1]}
      onClick={(value) => console.log('group by', value[0])}
      />)}
    </div>
    </div>
    </div>
    <div className="row">
    <span>Filter by: </span>
    <div className="btn-toolbar" role="toolbar" aria-label="Controls to group and filter aggregate comments">
    <div className="btn-group" role="group">
    {filterByList.map((value, index) => <Button
      label={value}
      key={index}
      isActive={filteringBy.includes(value)}
      onClick={(value) => console.log('filter by', value)}
      />)}
    </div>
    <Stickers />
    </div>
    </div>
    </div>
  )
}

FilterControls.propTypes = {
  groupByList: PropTypes.array.isRequired,
  filterByList: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggleGroupBy: PropTypes.func.isRequired,
  toggleFilterBy: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    filteringBy: state.aggregate.filterBy,
    groupingBy: state.aggregate.groupBy
  }
}

export default connect(mapStateToProps, {toggleGroupBy, toggleFilterBy})(FilterControls);
