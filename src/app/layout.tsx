'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/bottom-nav';
import { Toaster } from "@/components/ui/toaster"

const SVG_ICON_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSI4NSIgZmlsbD0iIzU5M0M1OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjU2IiBmaWxsPSIjRTlFM0YzIj5WPC90ZXh0Pjwvc3ZnPg==';

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
        <title>Vou</title>
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Vou" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vou" />
        <meta name="description" content="Discover your style." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#593C59" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href={SVG_ICON_DATA_URI} />

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
