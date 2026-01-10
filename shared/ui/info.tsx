import { cn } from '../lib/utils';

export function Info({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto mt-10 w-fit text-xl text-muted-foreground', className)}
      {...props}
    />
  );
}
