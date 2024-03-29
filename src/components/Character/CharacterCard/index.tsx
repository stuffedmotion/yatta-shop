import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { formatCollectionTitle } from '@utils/helpers'
import { ShopifyCollection } from '@typings/storefront'
import styles from './styles.module.scss'

interface CharacterCardProps {
  collection: ShopifyCollection
}

export const CharacterCard = ({ collection }: CharacterCardProps) => {
  const { handle, image } = collection
  const { title } = formatCollectionTitle(collection.title)

  return (
    <div className={styles.card}>
      <Link to={`/character/${handle}/`} key={handle}>
        {image && image.localFile && (
          <div className={styles.imgWrapper}>
            <Image fluid={image.localFile.childImageSharp.fluid} alt={handle} />
          </div>
        )}

        <div className={styles.title}>{title}</div>
      </Link>
    </div>
  )
}
