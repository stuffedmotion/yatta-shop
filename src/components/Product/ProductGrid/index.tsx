import React from 'react'

import { ShopifyProductConnection } from '@typings/storefront'
import posed from 'react-pose'
import { ProductCard } from '@components/Product/ProductCard'
import styles from './styles.module.scss'

interface ProductGridProps {
  products: ShopifyProductConnection
}

const Transition = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      opacity: { ease: 'easeOut', duration: 800 },
      default: { duration: 200 },
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0 },
  },
})

const ProductGrid = ({ products }: ProductGridProps) => {
  const newArray = products.edges
    ? [
        products.edges[0],
        products.edges[1],
        products.edges[0],
        products.edges[1],
        products.edges[0],
        products.edges[1],
        products.edges[0],
        products.edges[1],
        products.edges[0],
        products.edges[1],
        products.edges[0],
        products.edges[1],
      ]
    : []
  return (
    <Transition className={styles.grid}>
      {newArray.map(({ node }) => (
        <ProductCard key={node.handle} product={node} />
      ))}
    </Transition>
  )
}

export default ProductGrid
