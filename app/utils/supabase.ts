import { createClient } from '@supabase/supabase-js'
import webConfig from '~/config/web'
import { Database } from '~/../types/supabase'

export const supabaseClient = createClient<Database>(webConfig.supabase.url, webConfig.supabase.key)
