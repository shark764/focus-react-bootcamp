import { Box, Heading, Text } from 'grommet';
import React from 'react';
import { useLocation } from 'react-router-dom';

function NoMatch() {
  const location = useLocation();

  return (
    <Box alignSelf="center" align="center" justify="center" elevation="medium" width="large" pad="medium">
      <Heading level="2">
        No match for
        {' '}
        <Text size="xxlarge" weight="bold" color="secondary">
          {location.pathname}
        </Text>
      </Heading>
    </Box>
  );
}

export default NoMatch;
