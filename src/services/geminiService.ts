import { GoogleGenerativeAI } from '@google/generative-ai';
import { Destination } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const generateTravelDestinations = async (userInput: string): Promise<Destination[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a travel expert assistant. Based on the following user travel preferences or desired destination, suggest 3-5 travel destinations that match their criteria.

User input: "${userInput}"

Respond ONLY with a valid JSON array of destinations. Each destination should have the following structure:
{
  "id": "unique-string-id",
  "name": "City/Place Name",
  "country": "Country Name",
  "description": "A brief 2-3 sentence description of why this destination matches the user's preferences",
  "latitude": numeric_latitude,
  "longitude": numeric_longitude,
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "bestTimeToVisit": "Month to Month or Season",
  "estimatedBudget": "$ (budget) / $$ (mid-range) / $$$ (luxury)"
}

Important:
- Ensure coordinates are accurate for the actual location
- Make descriptions relevant to the user's input
- Include diverse options when possible
- Only return the JSON array, no other text`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }
    
    const destinations: Destination[] = JSON.parse(jsonMatch[0]);
    
    // Validate and sanitize the response
    return destinations.map((dest, index) => ({
      id: dest.id || `dest-${index}-${Date.now()}`,
      name: dest.name || 'Unknown Destination',
      country: dest.country || 'Unknown Country',
      description: dest.description || 'No description available',
      latitude: typeof dest.latitude === 'number' ? dest.latitude : 0,
      longitude: typeof dest.longitude === 'number' ? dest.longitude : 0,
      highlights: Array.isArray(dest.highlights) ? dest.highlights : [],
      bestTimeToVisit: dest.bestTimeToVisit || 'Year-round',
      estimatedBudget: dest.estimatedBudget || '$$',
    }));
  } catch (error) {
    console.error('Error generating travel destinations:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to generate destinations: ${error.message}` 
        : 'Failed to generate travel destinations. Please try again.'
    );
  }
};
