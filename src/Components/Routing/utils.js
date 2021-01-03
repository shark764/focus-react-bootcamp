import React from 'react';
import {
  Beacon,
  CloudSoftware,
  Code,
  Connect,
  GraphQl,
  Home,
  Html5,
  Node,
  Reactjs,
  Storage,
  Task,
  VmMaintenance,
} from 'grommet-icons';

export const publicRoutes = [
  {
    to: '/',
    icon: <Home color="light-1" />,
    text: 'Home',
  },
  {
    to: '/jsx',
    icon: <Html5 color="light-1" />,
    text: 'JSX',
  },
  {
    to: '/thinking-in-react',
    icon: <Reactjs color="light-1" />,
    text: 'Thinking in React',
  },
  {
    to: '/state-vs-props',
    icon: <Code color="light-1" />,
    text: 'State vs Props',
  },
  {
    to: '/todos',
    icon: <Task color="light-1" />,
    text: 'Todo List',
  },
];

export const privateRoutes = [
  {
    to: '/apis',
    icon: <Node color="light-1" />,
    text: 'API Interactions',
  },
  {
    to: '/redux',
    icon: <Connect color="light-1" />,
    text: 'Redux',
  },
  {
    to: '/redux-toolkit',
    icon: <VmMaintenance color="light-1" />,
    text: 'Redux Toolkit',
  },
  {
    to: '/react-query',
    icon: <GraphQl color="light-1" />,
    text: 'React Query',
  },
  {
    to: '/contentful',
    icon: <CloudSoftware color="light-1" />,
    text: 'Contentful',
  },
  {
    to: '/custom-hook',
    icon: <Beacon color="light-1" />,
    text: 'Custom Hook Example',
  },
  {
    to: '/firestore-crud',
    icon: <Storage color="light-1" />,
    text: 'Firebase Firestore Crud',
  },
];

export default [...publicRoutes, ...privateRoutes];
