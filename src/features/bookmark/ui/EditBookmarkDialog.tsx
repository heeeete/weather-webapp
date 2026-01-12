import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

import { useEditBookmarkName } from '../model/useEditBookmarkName';

export default function EditBookmarkDialog({
  open,
  locationId,
  defaultName,
  onOpenChange,
}: {
  open: boolean;
  locationId: string;
  defaultName: string;
  onOpenChange: (open: boolean) => void;
}) {
  const { onSubmit } = useEditBookmarkName({
    locationId,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="truncate">{defaultName}</DialogTitle>
          <DialogDescription>즐겨찾기 이름을 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <Input name="name" defaultValue={defaultName} key={locationId} />
          <Button type="submit">저장</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
