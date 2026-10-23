import type { GetStaticPaths } from 'astro'
import { baseLocale, locales } from '@/paraglide/runtime'

const langsPaths = locales
  .filter((locale) => locale !== baseLocale)
  .map((locale) => ({ params: { locale } })) satisfies ReturnType<GetStaticPaths>

export const getLangsPaths = () => [...langsPaths]
