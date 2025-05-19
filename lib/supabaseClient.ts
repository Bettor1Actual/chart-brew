// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbavkirkqghmgxavfcnp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiYXZraXJrcWdobWd4YXZmY25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjE3MjksImV4cCI6MjA2MzEzNzcyOX0.TpxpaBhu2v9-rYtmgbuIGXHCHhJsv7pd2xrvnPajCFI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
