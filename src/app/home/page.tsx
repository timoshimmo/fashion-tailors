import { FashionFeed } from "@/components/fashion-feed";
import { getFashionItems, getFashionEvents } from "@/lib/data";
import { FashionEvents } from "@/components/fashion-events";
import Image from 'next/image';

export default function HomePage() {
  const items = getFashionItems();
  const events = getFashionEvents();

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
          <div className="relative mb-5">
              <Image
                src="/img/icon/vou_icon.png"
                alt="Logo"
                className="w-full h-[60px] object-contain"
              />
          </div>
       {/* <h1 className="font-headline text-5xl text-primary">Vou</h1> */}
        <p className="mt-2 text-muted-foreground">Discover your style.</p>
      </header>
      <FashionEvents events={events} />
      <FashionFeed items={items} />
    </div>
  );
}
