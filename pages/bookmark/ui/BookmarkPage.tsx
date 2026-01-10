import { FavoritesPlacesList } from '@/widgets/bookmark-weather';

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">즐겨찾기</h1>
        <p className="text-muted-foreground">자주 확인하는 지역을 저장해두세요</p>
      </div>

      {/* {favorites.length === 0 ? (
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
      ) : ( */}
      <FavoritesPlacesList />
      {/* )} */}
    </div>
  );
}
