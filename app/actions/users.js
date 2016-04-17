export const SELECT_USER = 'SELECT_USER';

export function selectUser(username) {
  return {
    type: SELECT_USER,
    username: username
  }
}
