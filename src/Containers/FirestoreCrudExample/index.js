import { Box } from 'grommet';
import React from 'react';
import PatientsProvider from './Context';
import Form from './Form';
import List from './List';

function FirestoreCrudExample() {
  // const create = () => {
  //   createPatient({
  //     studies: [
  //       {
  //         dateAt: '1/2/2020',
  //         doctor: 'rosales',
  //         name: 'doppler',
  //         service: 'x ray',
  //       },
  //     ],
  //   })

  return (
    <PatientsProvider>
      <Box direction="row" pad="medium" gap="medium">
        <List />
        <Form />
      </Box>
    </PatientsProvider>
  );
}

export default FirestoreCrudExample;
