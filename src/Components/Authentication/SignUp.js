import {
  Box, Button, Form, FormField, Heading, MaskedInput, Text, TextInput,
} from 'grommet';
import { MailOption, Secure, UserSettings } from 'grommet-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, generateUserDocument, signInWithGoogle } from '../../auth/firebase';

const SignUp = () => {
  const [value, setValue] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (values) => {
    const { email, password, displayName } = values;
    try {
      const { user } = await createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
    } catch (err) {
      console.error(err);
      setError('Error Signing up with email and password');
    }
  };

  return (
    <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
      <Heading level="2">Sign Up</Heading>

      {error && <Text color="status-critical">{error}</Text>}

      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
          onReset={() => setValue({})}
          onSubmit={(event) => {
            createUserWithEmailAndPasswordHandler(event.value);
          }}
        >
          <FormField label="Display Name" name="displayName">
            <TextInput name="displayName" icon={<UserSettings />} />
          </FormField>

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
            <Button type="submit" label="Sign Up" primary />
          </Box>
        </Form>

        <Box align="center" justify="center" pad="medium" gap="small" margin={{ top: 'medium' }}>
          <Text>Or</Text>

          <Button type="button" label="Sign In with Google" onClick={signInWithGoogle} />

          <Text>
            Already have an account?
            {' '}
            <Link to="/sign-in">Sign In here</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;
