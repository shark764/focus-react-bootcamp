import { Box, Heading } from 'grommet';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/adventure_time.css';
import { getEntry } from '../sdk';

function Record() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams();
  const {
    // status,
    // isFetching,
    // isLoading,
    // error: queryError,
    data: entry,
  } = useQuery(`fetchRecord-${id}`, async () => {
    const cfEntry = await getEntry(id);

    console.log(`%cEntry fetched using... "${id}":`, 'background: #eee; color: #444;', cfEntry);
    return cfEntry;
  });

  return (
    <Box width="xxlarge">
      <Heading level="3" margin={{ vertical: 'medium' }}>
        ID: 
{' '}
{id}
      </Heading>

      {entry && <JSONPretty id="json-pretty" data={entry} />}
    </Box>
  );
}

export default Record;
