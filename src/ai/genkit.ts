import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
console.log(' Genkit Initialization');
console.log(' API Key Present:', !!apiKey);
if (apiKey) console.log(' API Key length:', apiKey.length);
if (!apiKey) console.error(' CRITICAL: GOOGLE_GENAI_API_KEY is missing!');

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
