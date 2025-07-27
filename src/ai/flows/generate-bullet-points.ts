'use server';

/**
 * @fileOverview Generates bullet points for work experience using AI based on job title and responsibilities.
 *
 * - generateBulletPoints - A function that generates bullet points for work experience.
 * - GenerateBulletPointsInput - The input type for the generateBulletPoints function.
 * - GenerateBulletPointsOutput - The return type for the generateBulletPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBulletPointsInputSchema = z.object({
  jobTitle: z.string().describe('The job title of the work experience.'),
  responsibilities: z.string().describe('The responsibilities of the work experience.'),
});
export type GenerateBulletPointsInput = z.infer<typeof GenerateBulletPointsInputSchema>;

const GenerateBulletPointsOutputSchema = z.object({
  bulletPoints: z.array(z.string()).describe('The generated bullet points for the work experience.'),
});
export type GenerateBulletPointsOutput = z.infer<typeof GenerateBulletPointsOutputSchema>;

export async function generateBulletPoints(input: GenerateBulletPointsInput): Promise<GenerateBulletPointsOutput> {
  return generateBulletPointsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBulletPointsPrompt',
  input: {schema: GenerateBulletPointsInputSchema},
  output: {schema: GenerateBulletPointsOutputSchema},
  prompt: `You are an expert resume writer. Generate 3-5 bullet points based on the job title and responsibilities provided.

Job Title: {{{jobTitle}}}
Responsibilities: {{{responsibilities}}}

Bullet Points:`,
});

const generateBulletPointsFlow = ai.defineFlow(
  {
    name: 'generateBulletPointsFlow',
    inputSchema: GenerateBulletPointsInputSchema,
    outputSchema: GenerateBulletPointsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
