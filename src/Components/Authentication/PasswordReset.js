import {
  Box, Button, Form, FormField, Heading, MaskedInput, Text,
} from 'grommet';
import { MailOption } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../auth/firebase';

const PasswordReset = () => {
  const [value, setValue] = useState({ email: '', password: '' });
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = (values) => {
    const { email } = values;

    sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
      })
      .catch((err) => {
        console.error(err);
        setError('Error resetting password');
      });
  };

  useEffect(() => {
    // effect
    const interval = setInterval(() => {
      setEmailHasBeenSent(false);
    }, 3000);

    return () => {
      // cleanup
      clearInterval(interval);
    };
  }, [emailHasBeenSent]);

  return (
    <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
      <Heading level="2">Reset your Password</Heading>

      {emailHasBeenSent && <Text color="primary">An email has been sent to you!</Text>}

      {error && <Text color="status-critical">{error}</Text>}

      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
          onReset={() => setValue({})}
          onSubmit={(event) => {
            sendResetEmail(event.value);
          }}
        >
          <FormField label="Email" name="email" required>
            <MaskedInput
              name="email"
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                { fixed: '@' },
                { regexp: /^[\w]+$/, placeholder: 'my' },
                { fixed: '.' },
                { regexp: /^[\w]+$/, placeholder: 'com' },
              ]}
              icon={<MailOption />}
            />
          </FormField>

          <Box direction="row" justify="center" gap="medium" margin={{ top: 'medium' }}>
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Send me a reset link" primary />
          </Box>
        </Form>

        <Box align="center" justify="center" pad="medium" gap="small" margin={{ top: 'medium' }}>
          <Link to="/sign-in">&larr; back to sign in page</Link>
        </Box>
      </Box>
    </Box>
  );
};
export default PasswordReset;
