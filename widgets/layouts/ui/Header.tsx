'use client';

import { Cloud } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui/button';

import { navItems } from '../model/navItems';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Cloud className="size-6 text-primary" />
          <span className="text-lg font-bold">날씨</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button key={item.href} variant={isActive ? 'secondary' : 'ghost'} size="sm" asChild>
                <Link href={item.href} className="gap-2">
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
