import { HomePage } from 'features/home'
import PreviewIndexPage from 'features/preview/components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getClient, getIndexInfo } from 'lib/sanity.client'
import { Category, Post, Review, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  specialPosts: Post[]
  defaultPosts: Post[]
  news: Post[]
  reviews: Post[]
  newsDrop: Post[]
  top: Review[]
  settings: Settings
  category: Category[]
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const {
    defaultPosts,
    specialPosts,
    reviews,
    news,
    settings,
    draftMode,
    newsDrop,
    top,
    category,
  } = props

  const posts = [...specialPosts, ...defaultPosts]

  if (draftMode) {
    return (
      <PreviewIndexPage
        specialPosts={specialPosts}
        defaultPosts={defaultPosts}
        reviews={reviews}
        news={news}
        settings={settings}
        newsDrop={newsDrop}
        top={top}
        category={category}
      />
    )
  }

  return (
    <HomePage
      posts={posts}
      reviews={reviews}
      news={specialPosts}
      settings={settings}
      newsDrop={newsDrop}
      topGames={top}
      category={category}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [
    {
      newsDrop = [],
      news = [],
      reviews = [],
      defaultPosts = [],
      specialPosts = [],
      settings,
      category,
      top,
    },
  ] = await Promise.all([getIndexInfo(client, 0, 6)])

  return {
    props: {
      specialPosts,
      defaultPosts,
      news,
      newsDrop,
      reviews,
      settings,
      draftMode,
      top,
      category,
      token: draftMode ? readToken : '',
    },
  }
}
