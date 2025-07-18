'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
          <div className="relative mb-5">
              <Image
                src="/img/icon/vou_icon.png"
                alt="Logo"
                width={200}
                height={80}
                className="w-full h-[80px] object-contain"
              />
          </div>
        <Card>
          <CardHeader className="text-center">
             
            <CardTitle className="font-headline text-lg text-primary">
                Log in to continue your fashion journey.
            </CardTitle>
            {/* <CardDescription>Log in to continue your fashion journey.</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 h-[50px]">
              <Link href="/auth-success">
                Log In
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
