import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Box, Button, Heading, Text,
} from 'grommet';
import { Sync } from 'grommet-icons';
import { SearchContext } from '../Context/SearchContext';
import { getEntries } from '../sdk';
import Spinner from '../../../Components/Grommet/Spinner';
import BaseList from '../Components/BaseList';

function Records() {
  const [searchString] = useContext(SearchContext);

  const fetchRecords = async () => {
    const entries = await getEntries({
      content_type: 'records',
      'fields.title[match]': searchString,
    });

    console.log(`%cRecords fetched using... "${searchString}":`, 'background: #ccc; color: #444;', entries);
    return entries;
  };

  const {
    // status,
    isFetching,
    isLoading,
    error: queryError,
    data: records,
    refetch,
  } = useQuery('fetchRecords', fetchRecords, {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });

  const handleManualRefetch = () => {
    // manually refetch
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchString]);

  return (
    <>
      {queryError && (
        <Heading margin="medium" color="status-critial">
          Oops!!! an error has ocurred :(
        </Heading>
      )}

      {isLoading && (
        <Box pad="large" margin="large">
          <Spinner />
          <Text color="complement-1">Loading...</Text>
        </Box>
      )}

      {records && (
        <>
          <Box direction="row" gap="medium" margin={{ vertical: 'medium' }}>
            <Button icon={<Sync />} label="Manual Refetch" onClick={handleManualRefetch} />

            {isFetching && (
              <>
                <Spinner />
                <Text color="complement-2" margin={{ horizontal: 'medium' }}>
                  Fetching...
                </Text>
              </>
            )}
          </Box>

          <BaseList items={records} />
        </>
      )}
    </>
  );
}

export default Records;
