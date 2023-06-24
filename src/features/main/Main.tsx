import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Category from './Category';

function Main(): JSX.Element {
  return (
    <>
      <Header />
      <Category />
      <Outlet />
    </>
  );
}

export default Main;
