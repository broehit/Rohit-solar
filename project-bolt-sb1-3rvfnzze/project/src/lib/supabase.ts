import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://loxnqcocoquchmtgqrnv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxveG5xY29jb3F1Y2htdGdxcm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0OTU5NzQsImV4cCI6MjEwNjA3MTk3NH0.rgTyHkfn8K-E-TNuV18NNy_q_1gENM57h5sQS7rNZvw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Installation {
  id: string;
  title: string;
  location: string;
  system_size: number | null;
  panels_used: string | null;
  inverter_used: string | null;
  monthly_savings: number | null;
  images: string[];
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  review: string;
  photo_url: string;
  created_at: string;
}

export interface Equipment {
  id: string;
  type: 'panel' | 'inverter' | 'mounting';
  brand: string;
  model: string;
  efficiency: string;
  warranty: string;
  image_url: string;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  monthly_bill: number;
  message: string;
  created_at: string;
}
