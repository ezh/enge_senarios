import { TOGGLE_GROUPBY, TOGGLE_FILTERBY } from '../actions/aggregate'

export const aggregate = (state = {
  groupBy: null,
  filterBy: []
}, action) => {
  //console.log('aggregate reducer', action)
  switch(action.type) {
    case TOGGLE_GROUPBY:
      return Object.assign({}, state, {
        groupBy: action.value
      });
    case TOGGLE_FILTERBY:
      const index = state.filterBy.indexOf(action.value);
      const newFilterBy = state.filterBy.includes(action.value) ? [ ...state.filterBy.slice(1,index), ...state.filterBy.slice(index+1) ] : [ ...state.filterBy, action.value ]
      return Object.assign({}, state, {
          filterBy: newFilterBy
      });
    default:
      return state
  }
}

export default aggregate;
