import React, { useContext } from 'react';
import { Nav } from 'grommet';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../auth/UserAuthProvider';
import allRoutes, { publicRoutes } from './utils';

function NavBar() {
  const [user] = useContext(UserAuthContext);
  const routes = user ? allRoutes : publicRoutes;

  return (
    <Nav direction="row">
      {routes.map((route) => (
        <Link key={route.to} to={route.to} title={route.text}>
          {route.icon}
        </Link>
      ))}
    </Nav>
  );
}

export default NavBar;
