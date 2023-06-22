import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Category from './Category';

function Main(): JSX.Element {
  return (
    <>
      <NavBar />
      <Category />
      <Outlet />
    </>
  );
}

export default Main;
