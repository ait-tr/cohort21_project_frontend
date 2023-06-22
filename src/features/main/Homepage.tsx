import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Homepage(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Homepage;
