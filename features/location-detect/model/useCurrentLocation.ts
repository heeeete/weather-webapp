'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface GeoState {
  status: 'idle' | 'loading' | 'success' | 'denied' | 'error' | 'unsupported';
  lat?: number;
  lon?: number;
  errorMessage?: string;
}

export function useCurrentLocation(options?: { auto?: boolean }) {
  const auto = options?.auto ?? false;
  const requestedRef = useRef(false);

  const [state, setState] = useState<GeoState>({ status: 'idle' });

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({ status: 'unsupported' });
      return;
    }

    setState({ status: 'loading' });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'success',
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied' });
          return;
        }
        setState({ status: 'error', errorMessage: err.message });
      },
      { maximumAge: 60_000 },
    );
  }, []);

  useEffect(() => {
    if (!auto) return;
    if (requestedRef.current) return;
    requestedRef.current = true;

    queueMicrotask(() => {
      request();
    });
  }, [auto]);

  return { state, request };
}
