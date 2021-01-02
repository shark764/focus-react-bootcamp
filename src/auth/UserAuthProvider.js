import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, generateUserDocument } from './firebase';
import { log } from '../utils';
import { getUserAuthenticatedData } from './utils';

export const UserAuthContext = createContext();

function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // effect
    const onAuthStateChangedHandler = async (userAuth) => {
      const userAuthDoc = await generateUserDocument(userAuth);
      const userAuthData = getUserAuthenticatedData(userAuth);
      let userAuthFormatted = null;

      if (userAuth) {
        userAuthFormatted = { ...userAuthData, ...userAuthDoc };
        userAuthFormatted.photoURL = userAuthFormatted.photoURL
          || `https://ui-avatars.com/api/?name=${userAuthFormatted.displayName.replace(/\s+/g, '+')}`;
        log(
          'info',
          'User is authenticated with Firebase service.',
          userAuthFormatted.displayName,
          userAuthFormatted.email,
        );
      } else {
        log('warning', 'User not authenticated.', userAuthFormatted);
      }

      setUser(userAuthFormatted);
    };

    auth.onAuthStateChanged(onAuthStateChangedHandler);
  }, []);

  return <UserAuthContext.Provider value={[user, setUser]}>{children}</UserAuthContext.Provider>;
}

UserAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuthProvider;
