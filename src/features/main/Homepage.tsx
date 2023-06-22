import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Category from './Category';
import Cards from './Cards';

function Homepage(): JSX.Element {
  return (
    <>
      <Header />
      <Category />
      <Cards />
      <Outlet />
    </>
  );
}

export default Homepage;
