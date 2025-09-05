'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, ShoppingBag, User, Pencil, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/measure', label: 'Studio', icon: Sparkles },
  { href: '/order-history', label: 'Orders', icon: ShoppingBag },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-20 bg-card border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
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

        <div className="flex items-center justify-center">
            <Link href="/try-on" className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full bg-primary -translate-y-4 shadow-lg shadow-primary/50">
               <div className="absolute inset-0 rounded-full bg-accent animate-pulse"></div>
               <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary">
                    <Pencil className="w-8 h-8 text-primary-foreground" />
               </div>
            </Link>
        </div>
      </div>
    </footer>
  );
}
