import { Box, Text } from 'grommet';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../../auth/UserAuthProvider';
import allRoutes, { publicRoutes } from './utils';

function Menu() {
  const [user] = useContext(UserAuthContext);
  const routes = user ? allRoutes : publicRoutes;

  return (
    <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
      {routes.map((route) => (
        <Box key={route.to} pad={{ horizontal: 'medium', vertical: 'small' }}>
          <Link to={route.to} title={route.text}>
            {route.icon}
            <Text size="large" color="light-1" margin="small">
              {route.text}
            </Text>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default Menu;
