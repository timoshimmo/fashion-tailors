import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/bottom-nav';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Runway Naija',
  description: 'Nigerian Fashion & AI-Powered Measurements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <div className="relative flex flex-col min-h-screen w-full">
          <main className="flex-1 pb-24 md:pb-8">
            <div className="container mx-auto max-w-lg px-4 pt-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
