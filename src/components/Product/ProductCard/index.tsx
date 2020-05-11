import React from 'react'
import { getMetafield } from '@utils/getMetafield'
import { ShopifyProduct } from '@typings/storefront'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import { getPrice } from '@utils/helpers'
import styles from './styles.module.scss'
import posed from 'react-pose'

interface ProductCardProps {
  product: ShopifyProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    handle,
    title,
    images: [firstImage],
    variants: [firstVariant],
    metafields,
  } = product
  return (
    <div className={styles.card}>
      <Link to={`/product/${handle}/`} key={id}>
        {firstImage && firstImage.localFile && (
          <div className={styles.imgWrapper}>
            <Image
              fluid={firstImage.localFile.childImageSharp.fluid}
              alt={handle}
            />
          </div>
        )}

        <div className={styles.title}>{title}</div>
        <div className={styles.price}>{getPrice(firstVariant.price)}</div>
      </Link>
    </div>
  )
}
