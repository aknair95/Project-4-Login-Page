import React,{useContext}from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../storeContext/authContext';

const Navigation = () => {
  const cxt=useContext(AuthContext);          //using useContext hook
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
            <button onClick={cxt.onLogout}>Logout</button>
            </li>
            )}
            </ul>
          </nav>
  );
};

export default Navigation;
