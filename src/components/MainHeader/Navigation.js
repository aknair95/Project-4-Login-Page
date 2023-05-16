import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../storeContext/authContext';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(cxt) =>{
        return (
          <nav className={classes.nav}>
            <ul>
            {cxt.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
            )}
            {cxt.isLoggedIn && (
            <li>
            <a href="/">Admin</a>
            </li>
            )}
            {cxt.isLoggedIn && (
            <li>
            <button onClick={props.onLogout}>Logout</button>
            </li>
            )}
            </ul>
          </nav>
        )
      }}
    
    </AuthContext.Consumer>
  );
};

export default Navigation;
