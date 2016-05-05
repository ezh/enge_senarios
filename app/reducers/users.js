import { SELECT_USER } from '../actions/users';

export const initial_users = [
  {
    username: 'dmaczka',
    full_name: 'Darren M.'
  },
  {
    username: 'jmorlock',
    full_name: 'John M.',
  },
  {
    username: 'champton',
    full_name: 'Cynthia H.'
  },
  {
    username: 'dtatar',
    full_name: 'Dr. T'
  }
];

export const users = (state = {
  username: initial_users[0].username,
  users: initial_users
}, action) => {
  switch(action.type) {
    case SELECT_USER:
      return Object.assign({}, state, {
        username: action.username
      });
    default:
      return state
  }
}

export default users;
