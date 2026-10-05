import { useEffect, useState } from 'react';
import api from './api';
export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    api.get('/services', {
      signal: controller.signal,
      timeout: 10000
    }).then(r => {
      if (!Array.isArray(r.data.data)) throw new Error('Invalid service response');
      setServices(r.data.data);
    }).catch(e => {
      if (!controller.signal.aborted) setError('Online services could not be loaded. Please try again or call us.');
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [attempt]);
  return {
    services,
    loading,
    error,
    retry: () => setAttempt(a => a + 1)
  };
}
