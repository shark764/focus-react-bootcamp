import {
  Box, Button, DataTable, Text,
} from 'grommet';
import { CaretDown, CaretUp } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

function Studies({ studies = [] }) {
  const [open, setOpen] = useState(false);

  const Icon = open ? <CaretUp /> : <CaretDown />;

  return (
    <Box>
      <Button onClick={() => setOpen((isOpen) => !isOpen)}>{Icon}</Button>

      {open && (
        <DataTable
          background={{
            header: 'harmonie-2',
            body: ['white', 'light-1'],
          }}
          columns={[
            {
              property: 'name',
              header: <Text size="xsmall">Name</Text>,
              render: (row) => <Text size="xsmall">{row.name}</Text>,
              primary: true,
            },
            {
              property: 'service',
              header: <Text size="xsmall">Service</Text>,
              render: (row) => <Text size="xsmall">{row.service}</Text>,
            },
            {
              property: 'doctor',
              header: <Text size="xsmall">Doctor</Text>,
              render: (row) => <Text size="xsmall">{row.doctor}</Text>,
            },
            {
              property: 'dateAt',
              header: <Text size="xsmall">Date</Text>,
              render: (row) => (
                <Text size="xsmall">
                  {`${DateTime.fromMillis(row.dateAt.toMillis()).toLocaleString(DateTime.DATE_FULL)}`}
                </Text>
              ),
            },
          ]}
          data={studies}
        />
      )}
    </Box>
  );
}

export default Studies;
