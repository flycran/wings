import type { MessagePart } from '@/paraglide/runtime'

export interface MarkedSegment {
  text: string
  /** mark 标签的 variant 属性（如 orange）；未被标签包裹时为 undefined */
  variant?: string
}

/** 把 paraglide markup 的 parts 流转成文本片段，{#mark} 标签的 variant 属性标注到片段上 */
export function partsToSegments(parts: readonly MessagePart[]): MarkedSegment[] {
  const segments: MarkedSegment[] = []
  let variant: string | undefined

  for (const part of parts) {
    if (part.type === 'text') {
      segments.push({ text: part.value, variant })
    } else if (part.type === 'markup-start') {
      const value = part.attributes.variant
      variant = typeof value === 'string' ? value : 'blue'
    } else if (part.type === 'markup-end') {
      variant = undefined
    }
  }

  return segments
}
