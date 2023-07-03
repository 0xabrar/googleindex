import { getAllPosts, getPostBySlug } from '../../contentlayer.config.js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.js'
import Footer from '../../components/Footer.js'

export default function BlogPost({ post }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.isFallback) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [router.isFallback])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      </article>
      <Footer />
    </div>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
  ])

  return {
    props: {
      post,
    },
  }
}