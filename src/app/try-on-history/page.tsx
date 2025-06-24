
'use client';

import React from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTryOnHistory } from '@/lib/data';
import { Camera } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { TryOnHistoryItem } from '@/lib/types';

export default function TryOnHistoryPage() {
  const historyItems = getTryOnHistory();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Try-On History" />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="text-accent" />
            Your Past Try-Ons
          </CardTitle>
          <CardDescription>A gallery of your virtual try-on sessions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {historyItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You have no try-on history.</p>
          ) : (
            historyItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex flex-col gap-4">
                  <div>
                     <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                     <h3 className="font-bold text-primary text-lg">{item.garmentName}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                          <Image
                              src={item.generatedImage}
                              alt="Generated try-on image"
                              fill
                              className="object-cover"
                              data-ai-hint="woman fashion"
                          />
                          <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1 rounded-tr-lg">Result</div>
                      </div>
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                          <Image
                              src={item.garmentImage}
                              alt={item.garmentName}
                              fill
                              className="object-cover"
                              data-ai-hint={item.garmentHint}
                          />
                           <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-2 py-1 rounded-tr-lg">Garment</div>
                      </div>
                  </div>
                </div>
                {index < historyItems.length - 1 && <Separator />}
              </React.Fragment>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
