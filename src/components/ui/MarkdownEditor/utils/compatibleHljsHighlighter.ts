import { Highlighter, Tag, tags } from '@lezer/highlight'

export const compatibleHljsHighlighter: Highlighter = {
  style(tags_) {
    if (!tags_.length) return null

    const classes: string[] = []

    const maths: { includes: Tag; className: string }[] = [
      { includes: tags.comment, className: 'hljs-comment' },
      { includes: tags.lineComment, className: 'hljs-comment' },
      { includes: tags.blockComment, className: 'hljs-comment' },
      { includes: tags.docComment, className: 'hljs-doctag' },
      { includes: tags.keyword, className: 'hljs-keyword' },
      { includes: tags.controlKeyword, className: 'hljs-keyword' },
      { includes: tags.operatorKeyword, className: 'hljs-keyword' },
      { includes: tags.definitionKeyword, className: 'hljs-keyword' },
      { includes: tags.string, className: 'hljs-string' },
      { includes: tags.docString, className: 'hljs-string' },
      { includes: tags.character, className: 'hljs-string' },
      { includes: tags.attributeValue, className: 'hljs-attribute' },
      { includes: tags.number, className: 'hljs-number' },
      { includes: tags.integer, className: 'hljs-number' },
      { includes: tags.float, className: 'hljs-number' },
      { includes: tags.literal, className: 'hljs-literal' },
      { includes: tags.bool, className: 'hljs-literal' },
      { includes: tags.null, className: 'hljs-literal' },
      { includes: tags.atom, className: 'hljs-literal' },
      { includes: tags.name, className: 'hljs-name' },
      { includes: tags.variableName, className: 'hljs-variable' },
      { includes: tags.typeName, className: 'hljs-type' },
      { includes: tags.tagName, className: 'hljs-tag' },
      { includes: tags.propertyName, className: 'hljs-property' },
      { includes: tags.attributeName, className: 'hljs-attr' },
      { includes: tags.className, className: 'hljs-class' },
      { includes: tags.labelName, className: 'hljs-symbol' },
      { includes: tags.regexp, className: 'hljs-regexp' },
      { includes: tags.escape, className: 'hljs-escape' },
      { includes: tags.url, className: 'hljs-link' },
      { includes: tags.link, className: 'hljs-link' },
      { includes: tags.operator, className: 'hljs-operator' },
      { includes: tags.derefOperator, className: 'hljs-operator' },
      { includes: tags.arithmeticOperator, className: 'hljs-operator' },
      { includes: tags.logicOperator, className: 'hljs-operator' },
      { includes: tags.bitwiseOperator, className: 'hljs-operator' },
      { includes: tags.compareOperator, className: 'hljs-operator' },
      { includes: tags.updateOperator, className: 'hljs-operator' },
      { includes: tags.punctuation, className: 'hljs-punctuation' },
      { includes: tags.separator, className: 'hljs-punctuation' },
      { includes: tags.bracket, className: 'hljs-punctuation' },
      { includes: tags.angleBracket, className: 'hljs-punctuation' },
      { includes: tags.squareBracket, className: 'hljs-punctuation' },
      { includes: tags.paren, className: 'hljs-punctuation' },
      { includes: tags.brace, className: 'hljs-punctuation' },
      { includes: tags.meta, className: 'hljs-meta' },
      { includes: tags.documentMeta, className: 'hljs-meta' },
      { includes: tags.annotation, className: 'hljs-meta' },
      { includes: tags.invalid, className: 'hljs-deletion' },
      { includes: tags.inserted, className: 'hljs-addition' },
      { includes: tags.changed, className: 'hljs-changed' },
      { includes: tags.heading, className: 'heading' },
      { includes: tags.heading1, className: 'heading1 heading' },
      { includes: tags.heading2, className: 'heading2 heading' },
      { includes: tags.heading3, className: 'heading3 heading' },
      { includes: tags.heading4, className: 'heading4 heading' },
      { includes: tags.heading5, className: 'heading5 heading' },
      { includes: tags.heading6, className: 'heading6 heading' },
      { includes: tags.heading6, className: 'heading6 heading' },
      { includes: tags.monospace, className: 'code' },
      { includes: tags.list, className: 'list' },
      { includes: tags.quote, className: 'quote' },
      { includes: tags.strong, className: 'strong' },
    ]

    for (let i = 0; i < maths.length; i++) {
      const mi = maths[i]
      if (tags_.includes(mi.includes)) {
        classes.push(mi.className)
      }
    }

    return classes.length ? classes.join(' ') : tags_.map((e) => `tag-${e.toString()}`).join(' ')
  },
}
