import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserAuthContext } from '../../auth/UserAuthProvider';

function AuthRoute({ children, ...rest }) {
  const [user] = useContext(UserAuthContext);

  return (
    <Route {...rest}>
      {!user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )}
    </Route>
  );
}
AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
