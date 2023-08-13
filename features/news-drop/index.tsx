import TitleSection from 'components/TitleSection'
import { Post } from 'lib/sanity.queries'

import { Card } from './components/Card'
import Container from './components/Container'

export function NewsDrop({ news }: { news: Post[] }) {
  return (
    <Container>
      <TitleSection>TenseiDrop</TitleSection>
      <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 [&>*:first-child]:lg:col-span-2 grid-cols-1 gap-6">
        {news.map((post) => (
          <Card.Root key={post._id}>
            <Card.Cover picture={post.coverImage} title={post.title} />
            <Card.Category category={post.category.title} />
            <Card.InfoContainer>
              <Card.Title title={post.title} subtitle={post.excerpt} />
              <Card.Date dateString={post.date} />
            </Card.InfoContainer>
          </Card.Root>
        ))}
      </div>
    </Container>
  )
}