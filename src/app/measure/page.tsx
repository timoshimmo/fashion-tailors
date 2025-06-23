'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Loader2, PartyPopper, Scan, Upload } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getMeasurements } from './actions';
import type { EstimateBodyMeasurementsOutput } from '@/ai/flows/estimate-body-measurements';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MeasurePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EstimateBodyMeasurementsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResults(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file || !preview) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const result = await getMeasurements(preview);
      if (result.error) {
        setError(result.error);
      } else {
        setResults(result.data);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const measurementLabels: { key: keyof EstimateBodyMeasurementsOutput; label: string }[] = [
    { key: 'neck', label: 'Neck' },
    { key: 'chest', label: 'Chest' },
    { key: 'waist', label: 'Waist' },
    { key: 'hips', label: 'Hips' },
    { key: 'shoulderWidth', label: 'Shoulder Width' },
    { key: 'sleeveLength', label: 'Sleeve Length' },
    { key: 'inseam', label: 'Inseam' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="AI Measurement" />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="text-accent" />
            Get Your Fit
          </CardTitle>
          <CardDescription>Upload a full-body photo for AI-powered measurements.</CardDescription>
        </CardHeader>
        <CardContent>
          <label
            htmlFor="photo-upload"
            className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 transition-colors"
          >
            {preview ? (
              <Image src={preview} alt="Photo preview" layout="fill" objectFit="contain" className="rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
              </div>
            )}
            <input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
          </label>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!preview || isLoading} className="w-full bg-accent hover:bg-accent/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Measuring...
              </>
            ) : (
              <>
                Get My Measurements <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Measurement Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <PartyPopper />
              Here Are Your Results!
            </CardTitle>
            <CardDescription>These are estimates. You can adjust them before ordering.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {measurementLabels.map(({ key, label }) => (
              <div key={key} className="p-3 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-lg font-bold text-primary">{results[key]} cm</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
