```javascript
import { makeSource } from '@contentlayer/core'
import { mdx } from '@contentlayer/source-files'

export default makeSource({
  name: 'contentlayer',
  schema: {
    documentTypes: {
      BlogPost: {
        isSingleton: false,
        filePathPattern: 'blog/**/*.mdx',
        bodyType: 'mdx',
        fields: {
          title: { type: 'string' },
          date: { type: 'date' },
          slug: { type: 'string' },
          author: { type: 'string' },
          excerpt: { type: 'string' },
          coverImage: { type: 'string' },
        },
      },
    },
  },
  extensions: {
    mdx: mdx(),
  },
})
```