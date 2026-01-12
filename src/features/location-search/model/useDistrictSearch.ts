'use client';

import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { locationQueries } from '@/entities/location';
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
  const qc = useQueryClient();

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
      const data = await qc.fetchQuery(locationQueries.geocode(district));

      if (data) {
        router.push(`/weather/${data.lat}/${data.lon}`);
      } else {
        alert('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('selectDistrict', error);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
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
