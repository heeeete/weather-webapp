import { cn } from '@/shared/lib/utils';

type Props = {
  temp: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUnit?: boolean;
  toFixed?: number;
} & React.ComponentProps<'span'>;

const sizeClassMap = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-3xl',
  xl: 'text-5xl',
};

export function TemperatureDisplay({
  temp,
  size = 'md',
  showUnit = true,
  toFixed = 1,
  ...props
}: Props) {
  const { className, ...rest } = props;
  const value = toFixed ? temp.toFixed(toFixed) : temp;

  return (
    <span className={cn(`${sizeClassMap[size]} font-semibold tabular-nums`, className)} {...rest}>
      {value}
      {showUnit && <span className="text-muted-foreground">°</span>}
    </span>
  );
}
