import Redis from 'ioredis';
// import { VectorSpace } from 'vectorspace'; // Assuming vector embedding logic

// Ensure we don't crash at build time if REDIS_URL is not set
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis(redisUrl, {
  lazyConnect: true, // Don't connect immediately to avoid build issues
});

export async function checkCache(description, styleComplexity) {
  try {
    // In a real implementation, we would convert description to a vector
    // and use Redis vector search to find a near-match.
    // For demonstration, we do a basic hash lookup based on the content.
    
    const hashKey = `inquiry:${Buffer.from(styleComplexity + description).toString('base64').substring(0, 32)}`;
    
    // Only attempt to get if redis is actually connected/available in prod
    if (process.env.NODE_ENV !== 'production') {
       return null; // bypass cache in dev to test routing
    }

    const cached = await redis.get(hashKey);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Redis Cache Error:', error);
    return null; // Fail gracefully if Redis is unavailable
  }
}

export async function setCache(description, styleComplexity, responseData) {
  try {
    if (process.env.NODE_ENV !== 'production') return;

    const hashKey = `inquiry:${Buffer.from(styleComplexity + description).toString('base64').substring(0, 32)}`;
    
    // Cache for 24 hours
    await redis.set(hashKey, JSON.stringify(responseData), 'EX', 86400);
  } catch (error) {
    console.error('Redis Cache Error:', error);
  }
}
