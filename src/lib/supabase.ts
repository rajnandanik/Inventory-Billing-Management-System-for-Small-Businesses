
import { createClient } from '@supabase/supabase-js';

// Replace these placeholder values with your actual Supabase URL and anon key
// These must be complete, valid URLs and keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Ensure the URL is valid before creating the client
if (!supabaseUrl.startsWith('http')) {
  console.error('Invalid Supabase URL. Please check your configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  sku: string;
  barcode?: string;
  cost_price: number;
  selling_price: number;
  stock: number;
  reorder_level: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  created_at: string;
}
