import 'server-only'

const platforms = {
  juejin_id: process.env['PLATFORM_JUEJIN_ID'],
  github_username: process.env['PLATFORM_GITHUB_USERNAME'],
}

const index = {
  platforms,
}

export default index as DeepReadonly<typeof index>
