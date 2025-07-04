import { FashionFeed } from "@/components/fashion-feed";
import { getFashionItems, getFashionEvents } from "@/lib/data";
import { FashionEvents } from "@/components/fashion-events";

export default function HomePage() {
  const items = getFashionItems();
  const events = getFashionEvents();

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <h1 className="font-headline text-5xl text-primary">Vou</h1>
        <p className="mt-2 text-muted-foreground">Discover your style.</p>
      </header>
      <FashionEvents events={events} />
      <FashionFeed items={items} />
    </div>
  );
}
