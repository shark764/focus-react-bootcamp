import {
  Box, Button, CheckBox, DateInput, Form, FormField, RadioButtonGroup, TextInput,
} from 'grommet';
import {
  Calendar, Directions, Phone, UserSettings,
} from 'grommet-icons';
import React from 'react';

function FormLayout({ onSubmit, currentValues }) {
  const [value, setValue] = React.useState(currentValues);

  return (
    <Form
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
      onReset={() => setValue(currentValues)}
      onSubmit={(event) => {
        onSubmit(event.value);
      }}
    >
      <FormField label="Name" name="name">
        <TextInput name="name" icon={<UserSettings />} />
      </FormField>

      <FormField label="Birthdate" name="birthdate">
        <DateInput name="birthdate" format="yyyy-mm-dd" icon={<Calendar />} />
      </FormField>

      <FormField name="gender">
        <RadioButtonGroup name="gender" options={['male', 'female']} />
      </FormField>

      <FormField label="Phone" name="phone">
        <TextInput name="phone" icon={<Phone />} />
      </FormField>

      <FormField label="Address" name="address">
        <TextInput name="address" icon={<Directions />} />
      </FormField>

      <FormField name="status">
        <CheckBox name="status" label="Active?" />
      </FormField>

      <Box direction="row" justify="between" margin={{ top: 'medium' }}>
        <Button label="Cancel" />
        <Button type="reset" label="Reset" />
        <Button type="submit" label="Submit" primary />
      </Box>
    </Form>
  );
}

export default FormLayout;
