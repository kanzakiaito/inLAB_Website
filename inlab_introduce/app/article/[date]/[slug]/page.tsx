import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

interface Props {
  params: Promise<{ date: string; slug: string }>
}

async function getArticle(slug: string) {
  try {
    // Fetch from API - in production this uses the deployed URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://inlab-outreach.vercel.app'
    const response = await fetch(`${baseUrl}/api/article`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const article = data.articles.find((a: any) => a.id === slug)
    return article
  } catch (error) {
    console.error('Error fetching article for metadata:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)

  if (!article) {
    return {
      title: 'Article Not Found - inLAB',
      description: 'The requested article could not be found.',
    }
  }

  // Strip HTML tags from description
  const plainDescription = article.description.replace(/<[^>]*>/g, '').substring(0, 200)

  // Ensure image URL is absolute
  const imageUrl = article.image?.startsWith('http')
    ? article.image
    : `https://inlab-outreach.vercel.app${article.image}`

  return {
    title: `${article.title} - inLAB`,
    description: plainDescription,
    openGraph: {
      title: article.title,
      description: plainDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      siteName: 'inLAB - Outreach Division',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: plainDescription,
      images: [imageUrl],
    },
  }
}

export default function ArticlePage({ params }: Props) {
  return <ArticleClient params={params} />
}
