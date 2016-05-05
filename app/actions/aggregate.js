export const TOGGLE_GROUPBY = 'TOGGLE_GROUPBY'
export const TOGGLE_FILTERBY = 'TOGGLE_FILTERBY'

export function toggleGroupBy(value) {
  return {
    type: TOGGLE_GROUPBY,
    value: value
  }
}

export function toggleFilterBy(value) {
  return {
    type: TOGGLE_FILTERBY,
    value: value
  }
}
