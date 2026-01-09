import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/ko'; // ✅ 추가

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatKstLabel(dtSeconds: number, format: string): string {
  return dayjs.unix(dtSeconds).tz('Asia/Seoul').locale('ko').format(format);
}
