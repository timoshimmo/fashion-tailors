'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import logo from '/public/img/icon/ic_vou_logo.png';

export default function AuthSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <div className="relative mb-5">
              <Image
                src={logo}
                alt="Logo"
                width={200}
                height={140}
                className="w-full lg:h-[140px] h-[100px] object-contain"
              />
          </div>
        <Card className="text-center mt-5">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="font-headline text-2xl text-primary">
              You're All Set!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">You have been successfully authenticated. Welcome to Vou!</p>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-[50px]">
              <Link href="/home">
                Continue to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
