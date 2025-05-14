export const pointIsText = (event: MouseEvent) => {
  const { target } = event
  if (!(target instanceof HTMLElement || target instanceof SVGElement)) return false
  const nodes = target.childNodes
  if (nodes.length === 0) return false
  const range = document.createRange()
  const { clientX: x, clientY: y } = event
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.nodeType === Node.TEXT_NODE) {
      range.selectNodeContents(node)
      const [rect] = range.getClientRects()
      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) return true
    }
  }
  return false
}
