import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import type { FashionEvent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface FashionEventsProps {
  events: FashionEvent[];
}

export function FashionEvents({ events }: FashionEventsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-headline text-2xl text-primary">Fashion Events</h2>
          <p className="text-sm text-muted-foreground">
            Discover the hottest events in the Nigerian fashion scene.
          </p>
        </div>
      </div>
      <Separator />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {events.map((event) => (
              <Card key={event.id} className="w-[300px] shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={event.image}
                  alt={event.name}
                  width={300}
                  height={150}
                  className="w-full h-[150px] object-cover object-top-center"
                  data-ai-hint={event.hint}
                />
                <CardContent className="p-4">
                  <h3 className="font-headline text-lg truncate text-primary">{event.name}</h3>
                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
