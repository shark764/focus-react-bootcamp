import { useEffect, useState } from 'react';

export function useExample({ isOnline: initialOnline = false, status: initialStatus = 'notready' } = {}) {
  const [isOnline, setIsOnline] = useState(initialOnline || false);
  const [status, setStatus] = useState(initialStatus || 'notready');
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Executing effect
     * We will increment visits every 3 seconds
     * Interval will init 3 seconds after component was mounted
     */
    const interval = setInterval(() => {
      setIsOnline((online) => !online);
      setStatus((lastStatus) => (lastStatus === 'ready' ? 'notready' : 'ready'));
    }, 3000);

    const interval2 = setInterval(() => {
      setError((lastError) => (lastError ? null : 'An error has ocurred.'));
      setStatus('failed');
      setIsOnline(false);
    }, 10000);

    return () => {
      /**
       * This code will be executed right before component
       * gets unmounted
       * We clear interval here to avoid effect to be executed
       * after component no longer exists
       */
      clearInterval(interval);
      clearInterval(interval2);
      console.log('Your component will unmount, so I will be unmounted too, bye!');
    };
  }, []);

  return { isOnline, status, error };
}

export default useExample;
