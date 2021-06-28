import React, { Fragment } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

// can format it all in just a "()" since only returning a fragment
const Home = () => (
  <Fragment>
    <Search />
    <Users />
  </Fragment>
);

export default Home;
