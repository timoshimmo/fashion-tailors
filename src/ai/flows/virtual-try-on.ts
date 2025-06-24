'use server';

/**
 * @fileOverview A virtual try-on AI agent.
 *
 * - virtualTryOn - A function that generates an image of a person wearing a specific garment.
 * - VirtualTryOnInput - The input type for the virtualTryOn function.
 * - VirtualTryOnOutput - The return type for the virtualTryOn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualTryOnInputSchema = z.object({
  personPhotoDataUri: z
    .string()
    .describe(
      "A photo of the person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  garmentPhotoDataUri: z
    .string()
    .describe(
      "A photo of the garment, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VirtualTryOnInput = z.infer<typeof VirtualTryOnInputSchema>;

const VirtualTryOnOutputSchema = z.object({
  generatedImageUri: z
    .string()
    .describe('The generated try-on image as a data URI.'),
});
export type VirtualTryOnOutput = z.infer<typeof VirtualTryOnOutputSchema>;

export async function virtualTryOn(
  input: VirtualTryOnInput
): Promise<VirtualTryOnOutput> {
  return virtualTryOnFlow(input);
}

const virtualTryOnFlow = ai.defineFlow(
  {
    name: 'virtualTryOnFlow',
    inputSchema: VirtualTryOnInputSchema,
    outputSchema: VirtualTryOnOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        { media: { url: input.personPhotoDataUri } },
        { media: { url: input.garmentPhotoDataUri } },
        { text: 'You are an expert fashion stylist AI. Generate a new, photorealistic image of the person from the first image wearing the garment from the second image. The person\'s face, pose, and body should be preserved. The garment should be realistically adapted to the person\'s body. The background should be a simple, neutral studio setting.' },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to produce an image.');
    }
    
    return { generatedImageUri: media.url };
  }
);
