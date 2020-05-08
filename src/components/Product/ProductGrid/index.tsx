import React from 'react'

import { ShopifyProductConnection } from '@typings/storefront'
import styles from './styles.module.scss'
import { ProductCard } from '../ProductCard'

interface ProductGridProps {
  products: ShopifyProductConnection
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className={styles.grid}>
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
      {products.edges ? (
        products.edges.map(({ node }) => (
          <>
            <ProductCard product={node} />
          </>
        ))
      ) : (
        <p>No Products found!</p>
      )}
    </div>
  )
}

export default ProductGrid
