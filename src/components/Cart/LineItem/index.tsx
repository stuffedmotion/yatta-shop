import Image from 'gatsby-image'
import React, { useContext } from 'react'

import StoreContext from '@context/StoreContext'
import styles from './styles.module.scss'
import { StaticQuery, graphql, useStaticQuery } from 'gatsby'
import { Query } from '@typings/storefront'

const LineItem = (props: any) => {
  const { line_item } = props

  const { removeLineItem } = useContext(StoreContext)

  const { shopifyProduct }: Query = useStaticQuery(
    graphql`
      query {
        shopifyProduct(handle: { eq: "unicorn-t-shirt" }) {
          ...ProductDetails
        }
      }
    `
  )
  // console.log(shopifyProduct)

  const variantImage = null

  // const variantImage = line_item.variant.image ? (
  //   <Image
  //     className={styles.image}
  //     fluid={line_item.variant.image.localFile.childImageSharp.fluid}
  //     key={line_item.variant.image.id}
  //     alt={line_item.title}
  //   />
  // ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        (option: { name: string; value: string }) =>
          `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(line_item.id)
  }

  return (
    <div>
      {variantImage}
      <p>
        {line_item.title}
        {`  `}
        {line_item.variant.title}
      </p>
      {selectedOptions}
      {line_item.quantity}
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  )
}

export default LineItem
