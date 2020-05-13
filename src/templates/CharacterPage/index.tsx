import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import SEO from '@components/seo'
import { ShopifyCollection } from '@typings/storefront'
import posed from 'react-pose'
import { formatCollectionTitle } from '@utils/helpers'
import ProductGrid from '@components/Product/ProductGrid'
import styles from './styles.module.scss'

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
  const { description, image, products } = data.shopifyCollection
  const { title, subtitle } = formatCollectionTitle(
    data.shopifyCollection.title
  )

  return (
    <Transition>
      <SEO title={title} description={description} />

      <div className={styles.bioWrapper}>
        <div className={styles.bio}>
          <div className={styles.bioFlex}>
            <Image
              className={styles.bioImage}
              fluid={image.localFile.childImageSharp.fluid}
              key={image.id}
              alt={title}
            />

            <div className={styles.bioInfo}>
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
              <div className={styles.desc}>{description}</div>
            </div>
          </div>
          <div className={styles.descMobile}>{description}</div>
        </div>
      </div>

      <ProductGrid title="what's available" products={products} />
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
