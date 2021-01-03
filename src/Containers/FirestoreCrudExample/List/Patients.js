import { DataTable, Text } from 'grommet';
import {
  StatusCritical, StatusGood, User, UserFemale,
} from 'grommet-icons';
import { DateTime } from 'luxon';
import React from 'react';
import Studies from './Studies';

function Patients({ patients }) {
  return (
    <DataTable
      background={{
        header: 'controls',
        body: ['white', 'light-2'],
        footer: 'dark-3',
      }}
      columns={[
        {
          property: 'id',
          header: <Text>Id</Text>,
          render: (row) => <Text size="small">{row.id}</Text>,
          primary: true,
        },
        {
          property: 'name',
          header: <Text>Name</Text>,
          render: (row) => <Text size="small">{row.name}</Text>,
        },
        {
          property: 'birthdate',
          header: <Text>Birthdate</Text>,
          render: (row) => row.birthdate && (
          <Text size="small">
            {`${DateTime.fromMillis(row.birthdate.toMillis()).toLocaleString(DateTime.DATE_FULL)}`}
          </Text>
          ),
        },
        {
          property: 'gender',
          header: <Text>Gender</Text>,
          render: (row) => (row.gender === 'male' ? (
            <User color="brand" size="medium" />
          ) : (
            <UserFemale color="secondary" size="medium" />
          )),
        },
        {
          property: 'phone',
          header: <Text>Phone Number</Text>,
          render: (row) => <Text size="small">{row.phone}</Text>,
        },
        {
          property: 'address',
          header: <Text>Address</Text>,
          render: (row) => <Text size="small">{row.address}</Text>,
        },
        {
          property: 'status',
          header: <Text>Status</Text>,
          render: (row) => (row.status ? <StatusGood color="brand" size="medium" /> : <StatusCritical color="default" size="medium" />),
        },
        {
          property: 'created',
          header: <Text>Created At</Text>,
          render: (row) => row.created && (
          <Text size="small">
            {DateTime.fromMillis(row.created.toMillis()).toLocaleString(DateTime.DATETIME_MED)}
          </Text>
          ),
        },
        {
          property: 'studies',
          header: <Text>Studies</Text>,
          render: (row) => <Studies studies={row.studies} />,
        },
      ]}
      data={patients}
    />
  );
}

export default Patients;
