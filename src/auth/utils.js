export const getUserAuthenticatedData = (userAuth) => {
  if (!userAuth) {
    return;
  }

  const {
    uid, displayName, email, metadata, phoneNumber, photoURL,
  } = userAuth;
  // eslint-disable-next-line consistent-return
  return {
    uid,
    displayName,
    email,
    metadata: {
      creationTime: metadata.creationTime,
      lastSignInTime: metadata.lastSignInTime,
    },
    phoneNumber,
    photoURL,
  };
};

export default getUserAuthenticatedData;
