import {
  Box, Button, Heading, Image, Text,
} from 'grommet';
import { Logout } from 'grommet-icons';
import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import { signOut } from '../../auth/firebase';
import { UserAuthContext } from '../../auth/UserAuthProvider';

const PasswordReset = () => {
  const [user] = useContext(UserAuthContext);

  if (!user) {
    return (
      <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
        <Heading level="2">Profile</Heading>

        <Text color="secondary">No user logged in</Text>
      </Box>
    );
  }

  const {
    photoURL, displayName, email, metadata, phoneNumber,
  } = user;

  return (
    <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
      <Heading level="2">Profile</Heading>

      <Box width="medium" align="center" justify="center" gap="small">
        <Image fit="contain" src={photoURL} alt={displayName} height="250" />

        <Text color="default" size="large" weight="bold">
          {displayName}
        </Text>
        <Text color="primary">{email}</Text>

        <Box fill="horizontal" border={{ color: 'brand', size: 'xsmall' }} margin="small" />

        <Box gap="small" direction="row">
          <Text>Created:</Text>
          <Text color="controls">
            {DateTime.fromRFC2822(metadata.creationTime).toLocaleString(DateTime.DATETIME_MED)}
          </Text>
        </Box>
        <Box gap="small" direction="row">
          <Text>Last Sign In:</Text>
          <Text color="controls">
            {DateTime.fromRFC2822(metadata.lastSignInTime).toLocaleString(DateTime.DATETIME_MED)}
          </Text>
        </Box>
        <Box gap="small" direction="row">
          <Text>Phone Number:</Text>
          <Text color="controls">{phoneNumber || ' - '}</Text>
        </Box>

        <Box align="center" justify="center" pad="medium" gap="small" margin={{ top: 'medium' }}>
          <Button type="button" label="Sign Out" onClick={signOut} icon={<Logout />} />
        </Box>
      </Box>
    </Box>
  );
};
export default PasswordReset;
