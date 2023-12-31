/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'
import { EmbedImage } from 'components/EmbedImage'
import { SanityImage } from 'components/SanityImage'
import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import styles from './PostBody.module.css'
import { SpoilerButton } from './SpoilerButton'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    html: ({ value }) => {
      return (
        <div
          className={`${styles.bodyHtml}`}
          dangerouslySetInnerHTML={{ __html: value.code }}
        ></div>
      )
    },
    spoilerContent: ({ value }) => {
      return (
        <SpoilerButton>
          <PortableText
            value={value.content}
            components={myPortableTextComponents}
          />
        </SpoilerButton>
      )
    },
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
    imageEmbed: ({ value }) => {
      return <EmbedImage {...value} />
    },
    youtube: ({ value }) => {
      const { url } = value
      const id = getYouTubeId(url)
      return <LiteYouTubeEmbed title={url} id={id} />
    },
    twitter: ({ value }) => {
      const { id } = value || {}

      if (!id) {
        return (
          <div>
            <p>Tweet-ID mangler</p>
          </div>
        )
      }

      return (
        <div>
          <TwitterTweetEmbed options={{ align: 'center' }} tweetId={id} />
        </div>
      )
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className={`${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
