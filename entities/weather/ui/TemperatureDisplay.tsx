type Props = {
  temp: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUnit?: boolean;
  toFixed?: number;
};

const sizeClassMap = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-3xl',
  xl: 'text-5xl',
};

export function TemperatureDisplay({ temp, size = 'md', showUnit = true, toFixed = 1 }: Props) {
  const value = toFixed ? temp.toFixed(toFixed) : temp;

  return (
    <span className={`${sizeClassMap[size]} font-semibold tabular-nums`}>
      {value}
      {showUnit && <span className="text-muted-foreground">°</span>}
    </span>
  );
}
