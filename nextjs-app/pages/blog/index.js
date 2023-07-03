```javascript
import { getAllPosts } from '../../contentlayer.config.js'
import Link from 'next/link'

export default function BlogIndex({ posts }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      {posts.map((post) => (
        <div key={post.slug} className="mb-4">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-xl font-bold">{post.title}</a>
          </Link>
          <p className="mt-1">{post.excerpt}</p>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
```