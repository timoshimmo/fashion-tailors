'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2, PartyPopper, Shirt, Upload, User } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateVirtualTryOnImage } from './actions';
import type { VirtualTryOnOutput } from '@/ai/flows/virtual-try-on';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TryOnPage() {
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VirtualTryOnOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<string | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!personPreview || !garmentPreview) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateVirtualTryOnImage(personPreview, garmentPreview);
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
  
  const Uploader = ({ id, preview, onChange, title, icon }: { id: string, preview: string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, title: string, icon: React.ReactNode}) => (
    <div className="flex flex-col gap-2">
      <h3 className="font-headline text-lg flex items-center gap-2 text-primary">{icon} {title}</h3>
      <label
        htmlFor={id}
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 transition-colors"
      >
        {preview ? (
          <Image src={preview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg" />
        ) : (
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
          <CardTitle>Create Your Look</CardTitle>
          <CardDescription>Upload a photo of yourself and a photo of a clothing item to see how it fits.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Uploader id="person-upload" preview={personPreview} onChange={handleFileChange(setPersonPreview)} title="Your Photo" icon={<User className="text-accent" />} />
          <Uploader id="garment-upload" preview={garmentPreview} onChange={handleFileChange(setGarmentPreview)} title="Garment Photo" icon={<Shirt className="text-accent" />} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!personPreview || !garmentPreview || isLoading} className="w-full bg-accent hover:bg-accent/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Try It On <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
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
            <CardTitle className="flex items-center gap-2 text-accent">
              <PartyPopper />
              Your Virtual Try-On!
            </CardTitle>
            <CardDescription>Here is the generated image of you wearing the selected garment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
              <Image src={result.generatedImageUri} alt="Virtual try-on result" layout="fill" objectFit="cover" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
