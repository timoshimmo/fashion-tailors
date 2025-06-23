'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { getFashionItemById } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"

export default function OrderPage({ params }: { params: { id: string } }) {
  const item = getFashionItemById(params.id);
  const { toast } = useToast()

  if (!item) {
    notFound();
  }
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed!",
      description: `Your order for ${item.name} is confirmed.`,
      className: "bg-primary text-primary-foreground"
    })
  }

  // Mock measurements
  const measurements = [
    { label: 'Chest', value: '102 cm' },
    { label: 'Waist', value: '85 cm' },
    { label: 'Sleeve', value: '64 cm' },
    { label: 'Inseam', value: '78 cm' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Custom Order" />
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover max-h-96"
            data-ai-hint={item.hint}
          />
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="font-headline text-3xl text-primary">{item.name}</h2>
          <p className="text-muted-foreground">by {item.designer}</p>
          <p className="text-xl font-bold mt-2 text-accent">₦{item.price.toLocaleString()}</p>
          <p className="mt-2 text-sm">{item.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Measurements</CardTitle>
          <CardDescription>Based on your AI scan. You can adjust if needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {measurements.map((m) => (
              <div key={m.label} className="p-3 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="text-lg font-bold text-primary">{m.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="text-accent" />
            Payment Details
          </CardTitle>
          <CardDescription>Complete your purchase securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM / YY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
            </div>
            <Separator className="my-4"/>
            <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>₦{item.price.toLocaleString()}</span>
            </div>
             <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-lg py-6">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
