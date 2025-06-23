'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanLine, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/measure', label: 'Measure', icon: ScanLine },
  { href: '#', label: 'Profile', icon: User }, // Placeholder
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-20 bg-card border-t">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn("w-6 h-6 mb-1 transition-transform group-hover:scale-110", isActive && "text-accent")} />
              <span className="text-sm font-body">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
