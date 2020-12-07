import { Box, Heading } from 'grommet';
import React from 'react';
import JSONPretty from 'react-json-pretty';
import useExample from './useExample';

function CustomHookExample() {
  const example = useExample();
  const example2 = useExample({ isOnline: true, status: 'ready' });

  return (
    <Box width="xxlarge">
      <Heading level="3" margin={{ vertical: 'medium' }}>
        Hey look!!... I&#39;m using a custom hook :)
      </Heading>

      <JSONPretty id="json-pretty" data={example} />

      <JSONPretty id="json-pretty" data={example2} />
    </Box>
  );
}

export default CustomHookExample;
