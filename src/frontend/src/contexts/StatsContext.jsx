import { createContext, useState, useEffect, useMemo } from 'react';
import default_stats from '@/utils/default_stats';
import retrieveStats from '@/utils/retrieveStats';
import { toast } from 'sonner';

export const StatsContext = createContext(undefined);

export function StatsContextProvider({ children, starting_stats = default_stats }) {
  const [stats, setStats] = useState(starting_stats);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const promise = retrieveStats(); // resolves to { message, details, data }

        // bind toast to the same promise (don’t await the toast)
        toast.promise(promise, {
          loading: 'Retrieving statistical data...',
          success: (r) => r?.message ?? 'Stats loaded',
          error:   (err) => err?.message || 'Failed to retrieve stats',
        });

        const res = await promise; // get full object back
        if (!cancelled && res?.data) setStats(res.data);
      } catch (err) {
        console.error('Stats init error:', err);
        if (!cancelled) toast.error('Error: Unexpected Internal Error When Retrieving Stats');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // if you want to log when stats actually update, use a separate effect:
  // useEffect(() => { console.log('stats updated:', stats); }, [stats]);

  const value = useMemo(() => ({ stats, setStats }), [stats]);

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}
