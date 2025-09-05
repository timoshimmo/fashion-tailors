import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <p className="mb-8">This is the home page.</p>
      <Button asChild>
        <Link href="/">Back to Login</Link>
      </Button>
    </div>
  );
}
