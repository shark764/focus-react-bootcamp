import React, { useState } from 'react';
import { Box, Button, Collapsible, Grommet, Heading, Layer, ResponsiveContext } from 'grommet';
import { HashRouter } from 'react-router-dom';
import { Apps, FormClose } from 'grommet-icons';
import { ReactQueryDevtools } from 'react-query-devtools';
import Routing from './Components/Routing';
import Menu from './Components/Routing/Menu';
import NavBar from './Components/Routing/NavBar';

const theme = {
  global: {
    colors: {
      primary: '#ee4540',
      secondary: '#c72c41',
      brand: '#801336',
      controls: '#510a32',
      default: '#2d142c',
      'harmonie-1': '#dfc4cd',
      'harmonie-2': '#c08a9b',
      'harmonie-3': '#906774',
      'harmonie-4': '#600e28',
      'harmonie-5': '#400a1b',
      'harmonie-6': '#300714',
      'complement-1': '#136c80',
      'complement-2': '#13805d',
    },
    font: {
      family: 'sans-serif',
      size: '18px',
      height: '20px',
    },
  },
  card: {
    container: {
      elevation: 'large',
    },
    footer: {
      pad: 'medium',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <HashRouter>
        <Grommet theme={theme} full>
          <ResponsiveContext.Consumer>
            {(size) => (
              <Box fill>
                <AppBar>
                  <Heading level="4" margin="none">
                    Hey look!, I'm using Groomet
                  </Heading>

                  <NavBar />

                  <Button icon={<Apps />} onClick={() => setShowSidebar(!showSidebar)} />
                </AppBar>

                <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                  <Box flex align="baseline" justify="center" pad="medium">
                    <Routing />
                  </Box>

                  {!showSidebar || size !== 'small' ? (
                    <Collapsible direction="horizontal" open={showSidebar}>
                      <Box
                        flex
                        width="medium"
                        background="harmonie-4"
                        elevation="small"
                        align="baseline"
                        justify="center"
                        fill="vertical"
                      >
                        <Menu />
                      </Box>
                    </Collapsible>
                  ) : (
                    <Layer>
                      <Box background="light-2" tag="header" justify="end" align="center" direction="row">
                        <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
                      </Box>
                      <Box fill background="default" align="center" justify="center">
                        <Menu />
                      </Box>
                    </Layer>
                  )}
                </Box>
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
