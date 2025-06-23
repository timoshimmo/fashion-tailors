import { FashionFeed } from "@/components/fashion-feed";
import { getFashionItems } from "@/lib/data";

export default function Home() {
  const items = getFashionItems();

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <h1 className="font-headline text-5xl text-primary">Runway Naija</h1>
        <p className="mt-2 text-muted-foreground">The future of Nigerian fashion.</p>
      </header>
      <FashionFeed items={items} />
    </div>
  );
}
