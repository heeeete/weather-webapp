import { Heart, Home } from 'lucide-react';

export const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/book-mark', label: '즐겨찾기', icon: Heart },
] as const;
