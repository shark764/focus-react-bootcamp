import React, { useState } from 'react';
import { Tab, Tabs } from 'grommet';
import { Spotify, System, Ticket } from 'grommet-icons';
import { useHistory, useLocation } from 'react-router-dom';
import Courses from './Courses';
import Records from './Records';
import Movies from './Movies';
import SearchProvider from './Context/SearchContext';
import SearchBar from './Components/SearchBar';

function useQuery() {
  // To access the query params from a url, we need to use the react router useLocation hook.
  return new URLSearchParams(useLocation().search);
}

function useQueryParam(key) {
  return useQuery().get(key);
}

function Contentful() {
  let paramIndex = 0;
  switch (useQueryParam('tab')) {
    case 'records':
      paramIndex = 1;
      break;
    case 'movies':
      paramIndex = 2;
      break;
    default:
      break;
  }
  const [activeIndex, setActiveIndex] = useState(paramIndex);
  const history = useHistory();

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.

  const onActive = (index) => {
    setActiveIndex(index);

    const params = new URLSearchParams();
    switch (index) {
      case 1:
        params.append('tab', 'records');
        break;
      case 2:
        params.append('tab', 'movies');
        break;
      default:
        params.delete('tab');
        break;
    }
    history.push({ search: params.toString() });
  };

  return (
    <SearchProvider>
      <SearchBar />

      <Tabs margin="medium" activeIndex={activeIndex} onActive={onActive}>
        <Tab title="REST Courses (useEffect)" margin="medium" icon={<System />}>
          <Courses />
        </Tab>
        <Tab title="REST Records (React-Query)" margin="medium" icon={<Spotify />}>
          <Records />
        </Tab>
        <Tab title="REST Movies (Contentful SDK)" margin="medium" icon={<Ticket />}>
          <Movies />
        </Tab>
      </Tabs>
    </SearchProvider>
  );
}

export default Contentful;
