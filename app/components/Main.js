import React from 'react';
import { Link } from 'react-router';

import UserSelection from './UserSelection'

const Main = ({children}) => {
    return (
<div className="main-container">
  <nav className="navbar navbar-default" role="navigation">
    <div className="row">
      <div className="col-sm-6 col-sm-offset-2">
        <h1>Culturally Relevant Problem Designer</h1>
      </div>
      <div className="col-sm-4" style={{marginTop: 15}}>
        <UserSelection />
      </div>
    </div>
    <div className="row">
      <span className="col-sm-7 col-sm-offset-2">
        <Link to="/">HOME</Link>
      </span>
    </div>
  </nav>
  <div className="container">
    {children}
  </div>
</div>
    )
};

export default Main;
