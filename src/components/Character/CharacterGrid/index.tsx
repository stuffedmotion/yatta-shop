import React from 'react'

import { ShopifyCollectionConnection } from '@typings/storefront'
import posed from 'react-pose'
import styles from './styles.module.scss'
import { CharacterCard } from '../CharacterCard'

interface CharacterGridProps {
  collections: ShopifyCollectionConnection
}

const Transition = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: `spring`, stiffness: 500, damping: 15 },
      opacity: { ease: `easeOut`, duration: 800 },
      default: { duration: 200 },
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0 },
  },
})

const CharacterGrid = ({ collections }: CharacterGridProps) => {
  const newArray = collections.edges
    ? [
        collections.edges[0],
        collections.edges[1],
        collections.edges[0],
        collections.edges[1],
        collections.edges[0],
        collections.edges[1],
        collections.edges[0],
        collections.edges[1],
        collections.edges[0],
        collections.edges[1],
        collections.edges[0],
        collections.edges[1],
      ]
    : []
  return (
    <Transition className={styles.grid}>
      {newArray.map(({ node }) => (
        <CharacterCard key={node.handle} collection={node} />
      ))}
    </Transition>
  )
}

export default CharacterGrid
