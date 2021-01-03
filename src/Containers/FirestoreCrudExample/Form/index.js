import { Box, Layer, Text } from 'grommet';
import { StatusCritical, StatusGood } from 'grommet-icons';
import React, { useContext, useState } from 'react';
import { createPatient } from '../../../auth/firebase';
import { PatientsContext } from '../Context';
import FormLayout from './Layout';

function Form() {
  const {
    open: [open, setOpen],
  } = useContext(PatientsContext);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const create = (payload) => {
    setIsSuccess(false);
    setError(null);
    createPatient(payload)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  const onSubmit = (values) => {
    const payload = {
      ...values,
      birthdate: new Date(values.birthdate),
      studies: [],
    };

    console.log('values submitted', { values, payload });

    create(payload);
  };

  const onClose = () => setOpen(undefined);

  return open ? (
    <Layer position="right" full="vertical" modal onClickOutside={onClose} onEsc={onClose}>
      <Box pad="medium" elevation="medium" gap="small" width="large">
        {isSuccess && (
          <Box direction="row" gap="medium">
            <Text color="brand">
              Patient created successfully...
              {' '}
              <StatusGood color="brand" />
            </Text>
          </Box>
        )}

        {error && (
          <Box direction="row" gap="medium">
            <Text color="accent-1">
              An error has occurred...
              {' '}
              <StatusCritical color="accent-1" />
            </Text>
          </Box>
        )}

        <FormLayout
          onSubmit={onSubmit}
          currentValues={{
            address: '',
            birthdate: '',
            gender: '',
            name: '',
            phone: '',
            status: false,
            studies: [],
          }}
          // key={current.id}
        />
      </Box>
    </Layer>
  ) : null;
}

export default Form;
