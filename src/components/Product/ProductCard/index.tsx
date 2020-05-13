import React from 'react'
import { getMetafield } from '@utils/getMetafield'
import { ShopifyProduct } from '@typings/storefront'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { getPrice } from '@utils/helpers'
import styles from './styles.module.scss'

interface ProductCardProps {
  product: ShopifyProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    handle,
    title,
    images: [firstImage],
    variants: [firstVariant],
    metafields,
  } = product

  return (
    <Link className={styles.card} to={`/product/${handle}/`} key={handle}>
      {firstImage && firstImage.localFile && (
        <Image
          className={styles.image}
          fluid={firstImage.localFile.childImageSharp.fluid}
          alt={handle}
        />
      )}

      <div className={styles.title}>
        {title}
        {firstVariant.compareAtPrice && <div className={styles.sale}>sale</div>}
      </div>
      <div className={styles.priceWrapper}>
        {firstVariant.compareAtPrice && (
          <div className={styles.compareAtPrice}>
            {getPrice(firstVariant.compareAtPrice)}
          </div>
        )}
        <div className={styles.price}>{getPrice(firstVariant.price)}</div>
      </div>
    </Link>
  )
}
