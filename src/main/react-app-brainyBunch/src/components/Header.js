import React from 'react';

import Navigation from '../components/Navigation';
import classes from '../css/header.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>Spotify Music</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;