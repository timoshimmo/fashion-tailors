'use client';

import Image from 'next/image';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import logo from '/public/img/icon/ic_vou_logo.png';

export function AppHeader() {
    return (
        <header className="sticky top-0 z-40 w-full bg-primary">
            <div className="container mx-auto flex h-20 max-w-lg items-center justify-between px-4 sm:px-6 lg:px-8">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-primary-foreground" />
                    <span className="sr-only">Open menu</span>
                </Button>
                <Link href="/home">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={120}
                        height={50}
                        className="w-full h-[50px] object-contain"
                    />
                </Link>
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" className="relative h-10 w-10">
                        <ShoppingCart className="h-6 w-6 text-primary-foreground" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">1</span>
                        <span className="sr-only">Open cart</span>
                    </Button>
                    <Link href="/profile">
                        <Avatar className="h-8 w-8 border-2 border-accent">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="woman portrait" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </div>
        </header>
    );
}
