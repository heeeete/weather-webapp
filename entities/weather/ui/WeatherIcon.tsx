'use client';

import Image from 'next/image';

type Props = {
  icon: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ariaHidden?: boolean;
  priority?: boolean;
};

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 100,
};

export function WeatherIcon({
  icon,
  description = '',
  size = 'md',
  ariaHidden = false,
  priority = false,
}: Props) {
  const dimension = sizeMap[size];

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      width={dimension}
      height={dimension}
      className="drop-shadow-sm"
      aria-hidden={ariaHidden}
      priority={priority}
    />
  );
}
