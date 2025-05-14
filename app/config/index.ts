const platforms = {
  juejin_id: process.env.PLATFORM_JUEJIN_ID,
  github_username: process.env.PLATFORM_GITHUB_USERNAME,
}

const config = {
  platforms,
  supabase: {
    url: process.env.SUPABASE_URL as string,
  },
}

export default config as DeepReadonly<typeof config>
