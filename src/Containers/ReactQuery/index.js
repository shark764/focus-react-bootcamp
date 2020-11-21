import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../Components/Grommet/Spinner';

function ReactQuery(props) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState({});
  const [i, setI] = useState(1);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await axios(`http://swapi.dev/api/people/${i}`);
      setData(response.data);
      setI((nI) => nI + 1);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [i]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  return (
    <div className="App">
      <h1>React Query example with Star Wars API</h1>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>
          <Spinner />
          Loading ...
        </div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default ReactQuery;
