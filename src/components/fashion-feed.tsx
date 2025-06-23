'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FashionCard } from './fashion-card';
import type { FashionItem } from '@/lib/types';

interface FashionFeedProps {
  items: FashionItem[];
}

export function FashionFeed({ items }: FashionFeedProps) {
  const femaleItems = items.filter((item) => item.category === 'female');
  const maleItems = items.filter((item) => item.category === 'male');

  return (
    <Tabs defaultValue="for-her" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
        <TabsTrigger value="for-her">For Her</TabsTrigger>
        <TabsTrigger value="for-him">For Him</TabsTrigger>
      </TabsList>
      <TabsContent value="for-her">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {femaleItems.map((item) => (
            <FashionCard key={item.id} item={item} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="for-him">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {maleItems.map((item) => (
            <FashionCard key={item.id} item={item} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
