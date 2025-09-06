import Image from 'next/image';
import { Search } from 'lucide-react';
import type { FashionEvent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

interface FashionEventsProps {
  events: FashionEvent[];
}

export function FashionEvents({ events }: FashionEventsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-2xl text-primary">AI's Picks for You</h2>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-muted-foreground"/>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {events.map((event) => (
          <Card key={event.id} className="w-full shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <Image
              src={event.image}
              alt={event.name}
              width={150}
              height={225}
              className="w-full h-auto object-cover aspect-[2/3]"
              data-ai-hint={event.hint}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
