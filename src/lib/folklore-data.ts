import { supabase } from './supabase';

export interface Location {
  id: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  short_description: string;
  historical_summary: string;
  category: string;
  era: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface HistoricalLore {
  id: string;
  location_id: string;
  title: string;
  content: string;
  lore_type: 'historical' | 'folklore' | 'legend' | 'theory';
  source: string;
  source_url: string;
  credibility_note: string;
  created_at: string;
}

export interface UserComment {
  id: string;
  location_id: string;
  user_id?: string;
  username: string;
  comment: string;
  theory_type: 'theory' | 'personal_experience' | 'additional_information' | 'question';
  created_at: string;
  updated_at: string;
}

export const folkloreService = {
  async getLocations(): Promise<Location[]> {
    const { data, error } = await supabase.from('locations').select('*').order('name');
    if (error) throw error;
    return data;
  },

  async getLocationBySlug(slug: string): Promise<Location | null> {
    const { data, error } = await supabase.from('locations').select('*').eq('slug', slug).single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return data || null;
  },

  async getLoreForLocation(locationId: string): Promise<HistoricalLore[]> {
    const { data, error } = await supabase.from('historical_lore').select('*').eq('location_id', locationId).order('created_at');
    if (error) throw error;
    return data;
  },

  async getCommentsForLocation(locationId: string): Promise<UserComment[]> {
    const { data, error } = await supabase.from('user_comments').select('*').eq('location_id', locationId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addComment(comment: Partial<UserComment>): Promise<UserComment> {
    const { data, error } = await supabase.from('user_comments').insert([comment]).select().single();
    if (error) throw error;
    return data;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }
};
