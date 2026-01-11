import { SearchBar } from '@/features/location-search';
import { Info } from '@/shared/ui/info';

export function PermissionDenied() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <section>
        <Info className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-semibold">위치 정보 권한이 거절되었습니다</h1>
          <p className="text-sm">현재 위치 날씨 확인을 원하시면 위치 정보 권한을 허용해주세요.</p>
        </Info>
      </section>
    </div>
  );
}
