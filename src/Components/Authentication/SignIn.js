import {
  Box, Button, Form, FormField, Heading, MaskedInput, Text, TextInput,
} from 'grommet';
import { MailOption, Secure } from 'grommet-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithGoogle } from '../../auth/firebase';

const SignIn = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = async (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(email, password).catch((err) => {
      setError('Error signing in with password and email!');
      console.error('Error signing in with password and email', err);
    });
  };

  return (
    <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
      <Heading level="2">Sign In</Heading>

      {error && <Text color="status-critical">{error}</Text>}

      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
          onReset={() => setValue({})}
          onSubmit={(event) => {
            signInWithEmailAndPasswordHandler(event.value);
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

          <FormField label="Password" name="password">
            <TextInput type="password" name="password" icon={<Secure />} />
          </FormField>

          <Box direction="row" justify="center" gap="medium" margin={{ top: 'medium' }}>
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Sign In" primary />
          </Box>
        </Form>

        <Box align="center" justify="center" pad="medium" gap="small" margin={{ top: 'medium' }}>
          <Text>Or</Text>

          <Button type="button" label="Sign In with Google" onClick={signInWithGoogle} />

          <Text>
            Don&#39;t have an account?
            {' '}
            <Link to="/sign-up">Sign Up here</Link>
          </Text>

          <Link to="/password-reset">Forgot Password?</Link>
        </Box>
      </Box>
    </Box>
  );
};
export default SignIn;
