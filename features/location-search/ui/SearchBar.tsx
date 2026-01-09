'use client';

import { useRef } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';

import { useDistrictSearch } from '../model/useDistrictSearch';

interface Props {
  limit?: number;
  onSelectDistrict?: (district: string) => void;
}

export default function SearchBar({ limit = 50, onSelectDistrict }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { query, items, show, onChangeQuery, onFocus, onBlur, onKeyDown, selectDistrict } =
    useDistrictSearch({ limit, onSelectDistrict });

  return (
    <div ref={rootRef} className="relative w-full max-w-xl">
      <Command shouldFilter={false} className="rounded-xl border bg-background shadow-sm">
        <CommandInput
          placeholder="지역을 검색하세요... (예: 서울, 강남구)"
          value={query}
          onValueChange={onChangeQuery}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="h-11"
        />

        {show && (
          <CommandList className="absolute top-full right-0 left-0 z-50 mt-2 max-h-80 overflow-auto rounded-xl border bg-background shadow-md">
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>

            <CommandGroup heading={`검색 결과 (${items.length}개)`}>
              {items.map((district) => (
                <CommandItem
                  key={district}
                  value={district}
                  onSelect={() => selectDistrict(district)}
                  className="cursor-pointer"
                >
                  <span className="truncate">{district}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
