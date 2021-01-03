import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from 'grommet';
import Main from '../../Containers/Main';
import StateVsProps from '../../Containers/StateVsProps';
import ThinkingInReact from '../../Containers/ThinkingInReact';
import JSXExample from '../../Containers/JSXExample';
import TodoExample from '../../Containers/TodoExample';
import APIInteractions from '../../Containers/APIInteractions';
import ReduxExample from '../../Containers/ReduxExample';
import ReduxToolkit from '../../Containers/ReduxToolkit';
import ReactQuery from '../../Containers/ReactQuery';
import Contentful from '../../Containers/Contentful';
import Entry from '../../Containers/Contentful/Components/Entry';
import CustomHookExample from '../../Containers/CustomHookExample';
import FirestoreCrudExample from '../../Containers/FirestoreCrudExample';
import SignUp from '../Authentication/SignUp';
import SignIn from '../Authentication/SignIn';
import PasswordReset from '../Authentication/PasswordReset';
import ProfilePage from '../Authentication/ProfilePage';
import NoMatch from './NoMatch';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';

/**
 * Home will be <Main> component, to avoid matching to
 * routes, we use "exact" prop
 * All routes matched that are not configured, will redirect
 * to an error page.
 */
function Routing() {
  return (
    <Box width="xxlarge">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/jsx">
          <JSXExample />
        </Route>
        <Route path="/thinking-in-react">
          <ThinkingInReact />
        </Route>
        <Route path="/state-vs-props">
          <StateVsProps />
        </Route>
        <Route path="/todos">
          <TodoExample />
        </Route>
        <PrivateRoute path="/apis">
          <APIInteractions />
        </PrivateRoute>
        <PrivateRoute exact path="/redux">
          <ReduxExample />
        </PrivateRoute>
        <PrivateRoute exact path="/redux-toolkit">
          <ReduxToolkit />
        </PrivateRoute>
        <PrivateRoute path="/react-query">
          <ReactQuery />
        </PrivateRoute>
        <PrivateRoute exact path="/contentful/entries/:id?">
          <Entry />
        </PrivateRoute>
        <PrivateRoute exact path="/contentful">
          <Contentful />
        </PrivateRoute>
        <PrivateRoute path="/custom-hook">
          <CustomHookExample />
        </PrivateRoute>
        <PrivateRoute path="/firestore-crud">
          <FirestoreCrudExample />
        </PrivateRoute>
        <AuthRoute path="/sign-up">
          <SignUp />
        </AuthRoute>
        <AuthRoute path="/sign-in">
          <SignIn />
        </AuthRoute>
        <Route path="/password-reset">
          <PasswordReset />
        </Route>
        <PrivateRoute path="/profile">
          <ProfilePage />
        </PrivateRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Box>
  );
}

export default Routing;
