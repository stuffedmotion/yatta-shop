import React from 'react'

import { ShopifyProductConnection } from '@typings/storefront'
import styles from './styles.module.scss'
import { ProductCard } from '../ProductCard'
import posed from 'react-pose'

interface ProductGridProps {
  products: ShopifyProductConnection
}

const Transition = posed.div({
  enter: {
    opacity: 1,
    y: `0px`,
    transition: {
      ease: 'anticipate',
      duration: 400,
      // delay: 100,
    },
  },
  exit: {
    opacity: 0,
    y: `40px`,
    transition: {
      ease: 'anticipate',
      duration: 400,
    },
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
      {newArray.map(({ node }, idx) => (
        <ProductCard key={idx} product={node} />
      ))}
    </Transition>
  )
}

export default ProductGrid
