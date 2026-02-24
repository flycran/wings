import { Database } from '~/types/supabase'

export type JsonAdditional = {
  slot: SlotItem
}

export type SlotItem = {
  title: string
  cover: string
  link?: string
}

export type CarouselItem = {
  id: string
  title: string
  cover: string
  color: string
  link?: string
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

export type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type FunctionArgs = {
  [K in keyof DefaultSchema['Functions']]: DefaultSchema['Functions'][K]['Args']
}

export type FunctionReturns = {
  [K in keyof DefaultSchema['Functions']]: DefaultSchema['Functions'][K]['Returns']
}
