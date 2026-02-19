import { User } from '@supabase/auth-js/dist/module/lib/types'
import { atom } from 'jotai'

export const userAtom = atom<User | null>(null)
