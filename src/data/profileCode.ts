import codeaw from '../utils/localizeUrl?raw'

export const codeTabs = [
  {
    id: 'localizeUrl',
    label: 'localizeUrl.ts',
    code: codeaw,
  },
  {
    id: 'github-gravity',
    label: 'github-gravity.ts',
    code: await fetch(
      'https://raw.githubusercontent.com/flycran/github-gravity/v1.0.0/src/main.ts'
    ).then((res) => res.text()),
  },
  {
    id: 'unplugin-favicon-identity',
    label: 'favicon-identity.ts',
    code: await fetch(
      'https://raw.githubusercontent.com/flycran/unplugin-favicon-identity/v0.2.0/src/index.ts'
    ).then((res) => res.text()),
  },
]
