'use client'
import { liteClient } from 'algoliasearch/lite'
import webConfig from '~/config/web'

export const algoliaClient = liteClient(webConfig.algolia.id, webConfig.algolia.key)
