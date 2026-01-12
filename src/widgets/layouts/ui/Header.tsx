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
        <Link href="/" className="flex cursor-pointer items-center gap-2" aria-label="홈으로 이동">
          <Cloud className="size-6 text-primary" aria-hidden={true} focusable={false} />
          <span className="text-lg font-bold">날씨</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button key={item.href} variant={isActive ? 'secondary' : 'ghost'} size="sm" asChild>
                <Link
                  href={item.href}
                  className="gap-2"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="size-4" aria-hidden={true} focusable={false} />
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
