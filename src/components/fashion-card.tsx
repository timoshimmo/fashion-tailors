import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { FashionItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FashionCardProps {
  item: FashionItem;
}

export function FashionCard({ item }: FashionCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group rounded-2xl">
      <Link href={`/try-on?id=${item.id}`}>
        <div className="relative">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={300}
            className="w-full h-auto object-cover aspect-[2/3]"
            data-ai-hint={item.hint}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-card/50 hover:bg-card rounded-full h-8 w-8 text-muted-foreground hover:text-accent"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <CardContent className="p-3">
          <h3 className="font-headline text-lg truncate text-primary">{item.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{item.designer}</p>
          {/*<p className="font-bold mt-1 text-foreground">
            ₦{item.price.toLocaleString()}
          </p>*/}
        </CardContent>
      </Link>
    </Card>
  );
}
