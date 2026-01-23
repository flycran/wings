import { createClient } from '@supabase/supabase-js'
import { Database } from '~/../types/supabase'
import webConfig from '~/config/web'

export const supabaseClient = createClient<Database>(webConfig.supabase.url, webConfig.supabase.key)
