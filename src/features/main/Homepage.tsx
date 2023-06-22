import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Category from './Category';

function Homepage(): JSX.Element {
  return (
    <>
      <Header />
      <Category />
      <Outlet />
    </>
  );
}

export default Homepage;
