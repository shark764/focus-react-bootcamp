import { Box, Button } from 'grommet';
import { AddCircle } from 'grommet-icons';
import React, { useContext, useEffect, useState } from 'react';
import { addStudyToPatient, getPatientsCollection } from '../../../auth/firebase';
import { PatientsContext } from '../Context';
import Patients from './Patients';

function List() {
  const [patients, setPatients] = useState([]);
  const {
    open: [, setOpen],
  } = useContext(PatientsContext);

  const onCollectionUpdate = (querySnapshot) => {
    const temporaryDocs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPatients(temporaryDocs);
  };

  useEffect(() => {
    // effect
    const unsubscribe = getPatientsCollection().onSnapshot(onCollectionUpdate);

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);

  const onOpen = () => setOpen(true);

  const addStudy = () => {
    addStudyToPatient('IREzi5cnpqnndVUpXjrI', {
      name: 'RX',
      doctor: 'any doctor',
      service: 'x ray',
      dateAt: new Date(),
    })
      .then((result) => {
        console.log('study added', { result });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box pad="medium" elevation="medium" fill gap="small">
      <Box direction="row" gap="medium" justify="end">
        <Button type="button" onClick={onOpen} label="Add" icon={<AddCircle color="brand" />} color="accent-1" />

        <Button
          type="button"
          onClick={addStudy}
          label="Add Test Study"
          icon={<AddCircle color="brand" />}
          color="accent-2"
        />
      </Box>

      <Patients patients={patients} />
    </Box>
  );
}

export default List;
