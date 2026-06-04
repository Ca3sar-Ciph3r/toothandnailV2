import { createClient } from '@supabase/supabase-js';

// Initialize with environment variables or fallbacks for development testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadReferenceImage(file) {
  try {
    // In a real production scenario without NEXT_PUBLIC variables set, we bypass upload
    if (supabaseUrl.includes('placeholder')) {
      console.warn("Supabase URL not configured, simulating successful upload.");
      return `https://simulated-storage.url/${file.name}`;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `references/${fileName}`;

    const { data, error } = await supabase.storage
      .from('inquiries')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('inquiries')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Supabase upload error:', error);
    return null; // Graceful degradation
  }
}
