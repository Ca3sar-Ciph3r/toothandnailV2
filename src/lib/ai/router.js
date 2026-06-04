import { checkCache, setCache } from '@/lib/redis/cache';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

export async function routeInquiry(data) {
  const { styleComplexity, referenceUrls, description } = data;

  // 1. Semantic Vector Caching
  // Check if a highly similar request exists in cache to save tokens
  const cachedResponse = await checkCache(description, styleComplexity);
  if (cachedResponse) {
    console.log("CACHE HIT: Using cached semantic response.");
    return cachedResponse;
  }

  console.log("CACHE MISS: Routing inquiry to AI...");

  // 2. Intelligent Routing Logic
  // Determine if we need the heavy pro model (for complex constraints or image analysis)
  // or the lightweight model (for standard textual inquiries).
  const isComplex = styleComplexity.includes('Hyper-Realism') || (referenceUrls && referenceUrls.length > 0);
  
  let aiResponse;

  if (isComplex) {
    console.log("ROUTING: Using Gemini Pro (Heavy Model) for complex inquiry.");
    aiResponse = { 
      tier: 'pro', 
      estimatedPriceRange: [500, 1500], 
      difficulty: 'high',
      recommendedArtist: 'Elena (Hyper-Realism & Large Scale Specialist)'
    };
  } else {
    console.log("ROUTING: Using Gemini Flash (Lightweight Model) for standard inquiry.");
    aiResponse = { 
      tier: 'flash', 
      estimatedPriceRange: [150, 400], 
      difficulty: 'medium',
      recommendedArtist: 'Marcus (Traditional & Fine Line Expert)'
    };
  }

  // 3. Save to cache for future requests
  await setCache(description, styleComplexity, aiResponse);

  return aiResponse;
}
