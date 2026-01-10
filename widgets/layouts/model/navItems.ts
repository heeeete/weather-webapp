import { Heart, Home } from 'lucide-react';

export const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/bookmark', label: '즐겨찾기', icon: Heart },
] as const;
