'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getGeocode } from '@/entities/location';
import { normalizeDistrictName } from '@/features/location-search/lib/normalizeDistrict';
import koreaDistricts from '@/shared/assets/korea_districts.json';

interface Options {
  limit?: number;
  onSelectDistrict?: (district: string) => void;
}

export function useDistrictSearch(options: Options) {
  const limit = options.limit ?? 50;
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const districts = useMemo(() => koreaDistricts.map((d) => normalizeDistrictName(d)), []);

  const items = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const qLower = q.toLowerCase();
    return districts.filter((d) => d.toLowerCase().includes(qLower)).slice(0, limit);
  }, [query, limit, districts]);

  const show = open && query.trim().length > 0;

  const selectDistrict = async (district: string) => {
    setQuery(district);
    setOpen(false);
    try {
      const data = await getGeocode(district);
      router.push(`/weather/${data.lon}/${data.lat}`);
    } catch (error) {
      console.error('selectDistrict', error);
    }
  };

  const onChangeQuery = (v: string) => {
    setQuery(v);
    setOpen(v.trim().length > 0);
  };

  const onFocus = () => {
    if (query.trim().length > 0) setOpen(true);
  };

  const onBlur = () => {
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setOpen(false);
  };

  return {
    query,
    items,
    show,
    onChangeQuery,
    onFocus,
    onBlur,
    onKeyDown,
    selectDistrict,
  };
}
