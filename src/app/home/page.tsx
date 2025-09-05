import { FashionFeed } from "@/components/fashion-feed";
import { getFashionItems, getFashionEvents } from "@/lib/data";
import { FashionEvents } from "@/components/fashion-events";
import Image from 'next/image';
import { PromoCard } from "@/components/promo-card";

export default function HomePage() {
  const items = getFashionItems();
  const events = getFashionEvents();

  return (
    <div className="flex flex-col gap-8">
      <FashionEvents events={events} />
      <PromoCard />
      <FashionFeed items={items} />
    </div>
  );
}
