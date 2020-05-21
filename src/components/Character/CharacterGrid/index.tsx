import React from 'react'

import { ShopifyCollectionConnection } from '@typings/storefront'
import styles from './styles.module.scss'
import { CharacterCard } from '../CharacterCard'

interface CharacterGridProps {
  collections: ShopifyCollectionConnection
}

const CharacterGrid = ({ collections }: CharacterGridProps) => {
  return (
    <div className={styles.grid}>
      {collections.edges.map(({ node }) => (
        <CharacterCard key={node.handle} collection={node} />
      ))}
    </div>
  )
}

export default CharacterGrid
