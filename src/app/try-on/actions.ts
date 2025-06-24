'use server';

import { virtualTryOn, VirtualTryOnOutput } from '@/ai/flows/virtual-try-on';

export async function generateVirtualTryOnImage(
  personPhotoDataUri: string,
  garmentPhotoDataUri: string
): Promise<{ data?: VirtualTryOnOutput; error?: string }> {
  try {
    const result = await virtualTryOn({ personPhotoDataUri, garmentPhotoDataUri });
    return { data: result };
  } catch (error) {
    console.error('AI virtual try-on failed:', error);
    return { error: 'Failed to generate the image. Please try again with different photos.' };
  }
}
