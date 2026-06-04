import { NextResponse } from 'next/server';
import { routeInquiry } from '@/lib/ai/router';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // The data payload from PricingFunnel.jsx includes:
    // - placement (e.g. "placement_left_ribs")
    // - dimensions (approximate area coverage)
    // - styleComplexity (e.g. "American Traditional", "Hyper-Realism")
    // - referenceUrls (Array of uploaded image URLs from Supabase/S3)
    // - description (User's text description)

    // Call the intelligent router to determine model tier and process the inquiry
    const result = await routeInquiry(data);

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
