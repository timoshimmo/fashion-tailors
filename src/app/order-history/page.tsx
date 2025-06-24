
'use client';

import React from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTransactions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';
import type { Transaction } from '@/lib/types';

export default function OrderHistoryPage() {
  const transactions = getTransactions();

  const getStatusVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Processing':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Order History" />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="text-accent"/>
            Your Past Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {transactions.length === 0 ? (
             <p className="text-muted-foreground text-center py-8">You have no past orders.</p>
          ) : (
            transactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                <div className="flex items-center gap-4">
                  <Image
                    src={transaction.image}
                    alt={transaction.itemName}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover aspect-square"
                    data-ai-hint={transaction.hint}
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-primary">{transaction.itemName}</h3>
                    <p className="text-sm text-muted-foreground">{transaction.designer}</p>
                    <p className="font-bold text-lg mt-1">₦{transaction.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                     <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                     <Badge variant={getStatusVariant(transaction.status)}>{transaction.status}</Badge>
                  </div>
                </div>
                {index < transactions.length - 1 && <Separator />}
              </React.Fragment>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
