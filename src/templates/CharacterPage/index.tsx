import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import SEO from '@components/seo'
import { ShopifyCollection } from '@typings/storefront'
import posed from 'react-pose'
import { formatCharacterTitle } from '@utils/helpers'

interface CharacterPageProps {
  data: {
    shopifyCollection: ShopifyCollection
  }
}

const Transition = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: `spring`, stiffness: 400, damping: 15 },
      opacity: { ease: `easeOut`, duration: 800 },
      default: { duration: 300 },
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0 },
  },
})

const CharacterPage = ({ data }: CharacterPageProps) => {
  const { description, descriptionHtml, image } = data.shopifyCollection
  const title = formatCharacterTitle(data.shopifyCollection.title)

  return (
    <Transition>
      <SEO title={title} description={description} />
      <div>
        <Image
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={title}
          style={{ height: `200px` }}
        />
        {title}
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </Transition>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      ...CollectionDetails
    }
  }
`

export default CharacterPage
