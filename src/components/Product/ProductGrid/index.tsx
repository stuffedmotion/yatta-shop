import React from 'react'

import { ShopifyProductConnection, ShopifyProduct } from '@typings/storefront'
import posed from 'react-pose'
import { ProductCard } from '@components/Product/ProductCard'
import styles from './styles.module.scss'

interface ProductGridProps {
  products: ShopifyProduct[]
  title?: string
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <div className={styles.gridWrapper}>
      {title && <div className={styles.gridTitle}>{title}</div>}
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
