import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';
import { AnalyticsData, TimeRange } from '../types/analytics';

interface AnalyticsState {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: Error | null;
}

export const useAnalyticsStore = (range: TimeRange = '30d'): AnalyticsState => {
  const [state, setState] = useState<AnalyticsState>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    analyticsService
      .fetch(range)
      .then((data) => {
        if (mounted) setState({ data, isLoading: false, error: null });
      })
      .catch((err: Error) => {
        if (mounted) setState({ data: null, isLoading: false, error: err });
      });

    return () => {
      mounted = false;
    };
  }, [range]);

  return state;
};
