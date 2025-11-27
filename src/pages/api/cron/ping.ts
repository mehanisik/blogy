import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async () => {
  try {
    console.log('Ping API called');
    // Check if supabase client is working
    if (!supabase) {
      console.error('Supabase client is undefined');
      throw new Error('Supabase client is undefined');
    }

    console.log('Querying Supabase...');
    const { data, error } = await supabase.from('writings').select('*').limit(1);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('Supabase success:', data);
    return new Response(JSON.stringify({ message: 'Pong', data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    console.error('Unexpected error in Ping API:', err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
