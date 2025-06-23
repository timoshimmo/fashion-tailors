'use server';

import { estimateBodyMeasurements, EstimateBodyMeasurementsOutput } from '@/ai/flows/estimate-body-measurements';

export async function getMeasurements(
  photoDataUri: string
): Promise<{ data?: EstimateBodyMeasurementsOutput; error?: string }> {
  try {
    const result = await estimateBodyMeasurements({ photoDataUri });
    return { data: result };
  } catch (error) {
    console.error('AI measurement failed:', error);
    return { error: 'Failed to process the image. Please try another photo.' };
  }
}
