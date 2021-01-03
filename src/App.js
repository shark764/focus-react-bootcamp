import React, { useContext, useState } from 'react';
import {
  Avatar, Box, Button, Collapsible, Grommet, Heading, Layer, ResponsiveContext, Stack, Text,
} from 'grommet';
import {
  HashRouter, Link, Redirect, useHistory,
} from 'react-router-dom';
import {
  Apps, FormClose, Logout, User,
} from 'grommet-icons';
import Routing from './Components/Routing';
import RtMenu from './Components/Routing/Menu';
import NavBar from './Components/Routing/NavBar';
import AccountMenu from './Components/Routing/AccountMenu';
import { UserAuthContext } from './auth/UserAuthProvider';
import { signOut } from './auth/firebase';

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
  menu: {
    background: 'brand',
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
  const [user] = useContext(UserAuthContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <HashRouter>
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box fill>
              <AppBar>
                <Heading level="4" margin="none">
                  {user ? `Welcome, ${user.displayName}` : "Hey look!, I'm using Groomet"}
                </Heading>

                <NavBar />

                <Box justify="end" direction="row" gap="xsmall">
                  <Button icon={<Apps />} onClick={() => setShowSidebar(!showSidebar)} />

                  <AccountMenu />
                </Box>
              </AppBar>

              <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align="baseline" justify="center" pad="medium">
                  <Routing />
                </Box>

                {!showSidebar || size !== 'small' ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      align="center"
                      gap="small"
                      direction="row"
                      // margin={{ bottom: 'large' }}
                      pad="medium"
                      background="harmonie-5"
                    >
                      {user ? (
                        <Stack alignSelf="start" align="center" anchor="top-right">
                          <Link to="/profile">
                            <Avatar src={user.photoURL} title={user.displayName} />
                          </Link>
                          <Box pad="xsmall" background="green" round responsive={false} />
                        </Stack>
                      ) : (
                        <Avatar background="default">
                          <User color="secondary" />
                        </Avatar>
                      )}

                      {user ? (
                        <Box>
                          <Link to="/profile">
                            <Text color="#f8f8f8">{user.displayName}</Text>
                          </Link>
                          <Text size="small" weight="bold" color="harmonie-2">
                            {user.email}
                          </Text>

                          <Button hoverIndicator="harmonie-6" onClick={signOut}>
                            <Box direction="row" align="center" gap="xsmall">
                              <Logout size="small" color="harmonie-3" />
                              <Text size="small" color="harmonie-3">
                                Sign Out
                              </Text>
                            </Box>
                          </Button>
                        </Box>
                      ) : (
                        <Box>
                          <Link to="/sign-in" title="Sign In">
                            <Text color="primary">Sign In</Text>
                          </Link>
                          <Link to="/sign-up" title="Sign Up">
                            <Text color="harmonie-1" size="small">
                              Sign Up
                            </Text>
                          </Link>
                          <Link to="/password-reset" title="Forgot Password?">
                            <Text color="harmonie-1" size="small">
                              Forgot Password?
                            </Text>
                          </Link>
                        </Box>
                      )}
                    </Box>

                    <Box
                      flex
                      width="medium"
                      background="harmonie-4"
                      elevation="small"
                      align="baseline"
                      justify="center"
                      fill="vertical"
                    >
                      <RtMenu />
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>
                    <Box background="light-2" tag="header" justify="end" align="center" direction="row">
                      <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
                    </Box>
                    <Box fill background="default" align="center" justify="center">
                      <RtMenu />
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    </HashRouter>
  );
}

export default App;
