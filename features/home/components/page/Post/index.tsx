import type { Post } from 'lib/sanity.queries'

import { Card } from './Card'

type PostProps = {
  posts: Post[]
}

export function PostSection({ posts }: PostProps) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-start items-center gap-4">
        <div className="w-2 h-9 bg-primary-5 rounded-tr-[5px] rounded-br-[5px]"></div>
        <div className="text-center text-primary-5 text-2xl font-extrabold leading-loose">
          Matérias
        </div>
      </div>
      <div className="grid w-full md:grid-cols-3 [&>*:first-child]:sm:col-span-2 sm:grid-cols-2 grid-cols-1 [&>*:first-child]:md:row-span-2 gap-6">
        {posts.map((post, index) => (
          <Card
            key={post._id}
            slug={post.slug}
            title={post.title}
            subtitle={post.excerpt}
            picture={post.coverImage}
            coverGame={post.category?.cover}
            size={index == 0 ? 'big' : 'small'}
          />
        ))}
      </div>
    </section>
  )
}
