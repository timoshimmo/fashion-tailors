import { getFashionItems, getFashionEvents } from '@/lib/data';
import { FashionCard } from '@/components/fashion-card';
import { FashionEvents } from '@/components/fashion-events';
import { FashionFeed } from '@/components/fashion-feed';
import { PromoCard } from '@/components/promo-card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const fashionItems = getFashionItems();
  const fashionEvents = getFashionEvents();

  return (
    <div className="flex flex-col gap-6 pb-24">
      <PromoCard />
      <FashionEvents events={fashionEvents} />
      <FashionFeed items={fashionItems} />
       <Separator />
      <div>
        <div className="space-y-1 mb-4">
            <h2 className="font-headline text-2xl text-primary">Discover Unique Designs</h2>
            <p className="text-sm text-muted-foreground">
                Handpicked for you.
            </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {fashionItems.map((item) => (
            <FashionCard key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
