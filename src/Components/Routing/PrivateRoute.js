import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserAuthContext } from '../../auth/UserAuthProvider';

function PrivateRoute({ children, ...rest }) {
  const [user] = useContext(UserAuthContext);

  return (
    <Route {...rest}>
      {user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
          }}
        />
      )}
    </Route>
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
