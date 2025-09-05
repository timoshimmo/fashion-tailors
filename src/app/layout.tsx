'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';

const SVG_ICON_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHJ4PSI4NSIgZmlsbD0iIzU5M0M1OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjU2IiBmaWxsPSIjRTlFM0YzIj5WPC90ZXh0Pjwvc3ZnPg==';

export default function RootLayout({
  children,
}: Readonly<{
 children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavRoutes = ['/', '/register', '/auth-success'];
  const isAuthPage = noNavRoutes.includes(pathname);

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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', isAuthPage && 'auth-bg')} suppressHydrationWarning={true}>
        <div className="relative flex flex-col min-h-screen w-full">
          {!isAuthPage && <AppHeader />}
          <main className={cn("flex-1")}>
            <div className={cn(isAuthPage ? "h-full" : "container mx-auto max-w-lg px-4 pt-4 sm:px-6 lg:px-8")}>
              {children}
            </div>
          </main>
          {!isAuthPage && <BottomNav />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
