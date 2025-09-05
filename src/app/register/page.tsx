'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
       <div className="w-full max-w-md">
         <div className="relative mb-2 text-center">
              <Image
                src="/img/icon/vou_icon.png"
                alt="Logo"
                width={200}
                height={80}
                className="w-full h-[80px] object-contain"
              />
              <p className="font-subtitle text-2xl text-accent mt-2">The Bespoke Revolution</p>
          </div>
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-lg text-primary sr-only">Join us and discover unique fashion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name" className="sr-only">Full Name</Label>
              <Input id="name" type="text" placeholder="Full Name" required className="bg-primary/20 border-accent text-white placeholder:text-gray-300"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input id="email" type="email" placeholder="Email" required className="bg-primary/20 border-accent text-white placeholder:text-gray-300"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input id="password" type="password" placeholder="Password" required className="bg-primary/20 border-accent text-white placeholder:text-gray-300"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-4">
             <Button asChild className="w-full text-accent-foreground h-[60px] text-lg font-bold bg-[linear-gradient(to_bottom,#E6C66E,#B48A34)] hover:opacity-90">
              <Link href="/auth-success">
                Register
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Already have an account?{' '}
              <Link href="/" className="font-semibold text-accent hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
       </div>
    </div>
  );
}
