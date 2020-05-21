import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import SEO from '@components/seo'
import { ShopifyCollection } from '@typings/storefront'
import { formatCollectionTitle } from '@utils/helpers'
import ProductGrid from '@components/Product/ProductGrid'
import styles from './styles.module.scss'

interface CharacterPageProps {
  data: {
    shopifyCollection: ShopifyCollection
  }
}

const CharacterPage = ({ data }: CharacterPageProps) => {
  const { description, image, products } = data.shopifyCollection
  const { title, subtitle } = formatCollectionTitle(
    data.shopifyCollection.title
  )

  return (
    <div>
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
    </div>
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
