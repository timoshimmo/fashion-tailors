'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/bottom-nav';
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavRoutes = ['/', '/register'];
  const showNav = !noNavRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Runway Naija</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning={true}>
        <div className="relative flex flex-col min-h-screen w-full">
          <main className={cn("flex-1", showNav && "pb-24 md:pb-8")}>
            <div className={cn(showNav ? "container mx-auto max-w-lg px-4 pt-4 sm:px-6 lg:px-8" : "h-full")}>
              {children}
            </div>
          </main>
          {showNav && <BottomNav />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
