'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, PartyPopper, ShoppingCart, Upload, User } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateVirtualTryOnImage } from './actions';
import type { VirtualTryOnOutput } from '@/ai/flows/virtual-try-on';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getFashionItemById } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import type { FashionItem } from '@/lib/types';

async function toDataURL(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function NoItemSelected() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Virtual Try-On" />
      <Card className="text-center">
        <CardHeader>
          <CardTitle>No Item Selected</CardTitle>
          <CardDescription>
            Please select a garment from the home page to use the virtual try-on feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/home">Browse Fashion Items</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function TryOnDisplay({ item }: { item: FashionItem }) {
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [garmentDataUri, setGarmentDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VirtualTryOnOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item.image) {
      toDataURL(item.image)
        .then(setGarmentDataUri)
        .catch((err) => {
          console.error('Failed to convert garment image to data URI', err);
          setError('Could not load garment image for try-on.');
        });
    }
  }, [item.image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!personPreview || !garmentDataUri) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateVirtualTryOnImage(personPreview, garmentDataUri);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const Uploader = ({ id, preview, onChange, title, icon }: { id: string; preview: string | null; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; title: string; icon: React.ReactNode }) => (
    <div className="flex flex-col gap-2">
      <h3 className="font-headline text-lg flex items-center gap-2 text-primary">{icon} {title}</h3>
      <label htmlFor={id} className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 transition-colors">
        {preview ? (<Image src={preview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg" />) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span>
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
          </div>
        )}
        <input id={id} type="file" className="hidden" onChange={onChange} accept="image/png, image/jpeg, image/webp" />
      </label>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
       <PageHeader title="Virtual Try-On" />
       <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>Upload a photo of yourself to see how this item looks on you.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-lg flex items-center gap-2 text-primary">Garment</h3>
            <div className="relative w-full h-64 rounded-lg overflow-hidden border">
              <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" className="rounded-lg" data-ai-hint={item.hint}/>
            </div>
          </div>
          <Uploader id="person-upload" preview={personPreview} onChange={handleFileChange} title="Your Photo" icon={<User className="text-accent" />}/>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!personPreview || !garmentDataUri || isLoading} className="w-full bg-accent hover:bg-accent/90">
            {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>) : (<>Try It On <ArrowRight className="ml-2 h-4 w-4" /></>)}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Generation Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent"><PartyPopper /> Your Virtual Try-On!</CardTitle>
            <CardDescription>Here is the generated image of you wearing the selected garment.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
              <Image src={result.generatedImageUri} alt="Virtual try-on result" layout="fill" objectFit="cover" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
              <Link href={`/order/${item.id}`}><ShoppingCart className="mr-2 h-5 w-5" /> Proceed to Order</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

function TryOnPageComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return <NoItemSelected />;
  }

  const item = getFashionItemById(id);

  if (!item) {
    notFound();
  }

  return <TryOnDisplay item={item} />;
}

export default function TryOnPage() {
  return (
    <Suspense fallback={<TryOnPageSkeleton />}>
      <TryOnPageComponent />
    </Suspense>
  );
}

function TryOnPageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Virtual Try-On" />
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-lg flex items-center gap-2 text-primary">Garment</h3>
            <Skeleton className="w-full h-64 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-lg flex items-center gap-2 text-primary"><User className="text-accent" /> Your Photo</h3>
            <Skeleton className="w-full h-64 rounded-lg" />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full bg-accent hover:bg-accent/90">
            Try It On <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
