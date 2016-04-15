export const ENTITY_CHANGE = 'ENTITY_CHANGE';
export const INIT_EDITOR = 'INIT_EDITOR';

export function initEditor() {
  return {
    type: INIT_EDITOR
  }
}

export function entityChange(key) {
  return {
    type: ENTITY_CHANGE,
    key: key
  }
}
