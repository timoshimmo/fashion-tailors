'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import type { FashionItem } from '@/lib/types';

interface FashionFeedProps {
  items: FashionItem[];
}

const styleCategories = [
    { name: 'A-Line', image: '/img/designs/female_style_3.jpg', hint: 'a-line dress' },
    { name: 'Corset', image: '/img/designs/female_style_9.jpg', hint: 'corset dress' },
    { name: 'Two-Piece', image: '/img/designs/female_style_10.jpg', hint: 'two piece outfit' },
    { name: 'Jumpsuit', image: '/img/designs/female_style_11.jpg', hint: 'jumpsuit fashion' },
]

export function FashionFeed({ items }: FashionFeedProps) {
  return (
    <div className="space-y-4">
        <div className="space-y-1">
            <h2 className="font-headline text-2xl text-primary">Shop by Style</h2>
            <p className="text-sm text-muted-foreground">
                Find the perfect style for any occasion.
            </p>
        </div>
        <Separator />
        <div className="grid grid-cols-4 gap-4 text-center">
            {styleCategories.map(category => (
                 <div key={category.name} className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 shadow-md">
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            data-ai-hint={category.hint}
                        />
                    </div>
                    <p className="text-sm font-medium text-primary">{category.name}</p>
                 </div>
            ))}
        </div>
    </div>
  );
}
