'use client';

import { Heart, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/shared/ui/card';

const DUMMY_FAVORITES = [
  { id: 'seoul', name: '서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'busan', name: '부산광역시', lat: 35.1796, lon: 129.0756 },
  { id: 'jeju', name: '제주특별자치도', lat: 33.4996, lon: 126.5312 },
];

export default function FavoritesPage() {
  const favorites = DUMMY_FAVORITES;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">즐겨찾기</h1>
        <p className="text-muted-foreground">자주 확인하는 지역을 저장해두세요</p>
      </div>

      {favorites.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="mb-4 size-12 text-muted-foreground/50" />
            <CardTitle className="mb-2 text-lg">즐겨찾기가 없습니다</CardTitle>
            <CardDescription className="mb-4 text-center">
              지역을 검색하고 즐겨찾기에 추가해보세요
            </CardDescription>
            <Button asChild>
              <Link href="/">
                <Plus className="size-4" />
                지역 검색하기
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((place) => (
            <Link key={place.id} href={`/place/${place.id}`}>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{place.name}</h3>
                    <p className="text-sm text-muted-foreground">날씨 확인하기</p>
                  </div>
                  <Heart className="size-5 fill-red-500 text-red-500" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
