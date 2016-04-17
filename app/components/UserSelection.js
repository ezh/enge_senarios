import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import { selectUser } from '../actions/users';

const User = ({username, full_name, onClick, active}) => {
  let className = "btn";
  if (active) {
    className += ' btn-primary';
  }
  return (
    <li className={className} onClick={() => onClick(username)}>{full_name}</li>
  );
}
const UserSelection = ({users, username, onClick}) => {
  return (
    <ul>
    {users.map(user =>
      <User username={user.username} full_name={user.full_name} active={user.username === username} onClick={onClick} />
    )}
    </ul>
  );
}

UserSelection.propTypes = {
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  console.log('UserSelection state', state);
  return {
    username: state.users.username,
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (username) => dispatch(selectUser(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelection);
