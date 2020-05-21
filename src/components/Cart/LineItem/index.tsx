import cx from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import React, { useContext, useState } from 'react'

import minus from '@assets/images/minus.svg'
import plus from '@assets/images/plus.svg'
import StoreContext from '@context/StoreContext'
import { Query } from '@typings/storefront'
import styles from './styles.module.scss'
import { getPrice } from '@utils/helpers'

const LineItem = (props: any) => {
  const { line_item } = props
  const { updateLineItem, removeLineItem } = useContext(StoreContext)

  const [isAdding, setIsAdding] = useState(false)

  const { allShopifyProduct }: Query = useStaticQuery(
    graphql`
      query {
        allShopifyProduct {
          ...ProductDetailsAll
        }
      }
    `
  )

  // Derive both product and variant
  const productNode = allShopifyProduct.edges.find(
    edge => edge.node.shopifyId === line_item.variant.product.id
  )

  if (!productNode) {
    if (line_item.id) removeLineItem(line_item.id)
    console.error(
      `Coudn't find product in line item staticQuery`,
      line_item.variant.product.id
    )
    return
  }

  const { node: product } = productNode

  const variant = product.variants.find(
    variant => variant.shopifyId === line_item.variant.id
  )
  if (!variant) {
    if (line_item.id) removeLineItem(line_item.id)
    console.error(
      `Coudn't find variant in line item search`,
      line_item.variant.id
    )
    return
  }

  const image =
    product.images.find(image => image.id === variant.image.id) ||
    product.images[0]

  const variantImage = line_item.variant.image ? (
    <Image
      className={styles.image}
      fluid={image.localFile.childImageSharp.fluid}
      key={image.id}
      alt={product.title}
    />
  ) : (
    <div className={styles.image} />
  )

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        (option: { name: string; value: string }) =>
          `${option.name}: ${option.value} `
      )
    : null

  const updateQuantity = async (increase = true) => {
    if (isAdding) return
    setIsAdding(true)
    const newQuantity = line_item.quantity + (increase ? 1 : -1)
    if (newQuantity <= 0) return removeLineItem(line_item.id)

    await updateLineItem(line_item.id, `${newQuantity}`)
    setIsAdding(false)
  }

  return (
    <div className={styles.lineItem}>
      {variantImage}
      <div className={styles.details}>
        <div className={styles.title}>{product.title}</div>
        {variant.title !== `Default Title` && (
          <div className={styles.variantTitle}>{variant.title}</div>
        )}
        <div className={styles.quantity}>
          <button
            onClick={() => updateQuantity(false)}
            className={cx(styles.button, { [styles.disabled]: isAdding })}
            type="button"
          >
            <img src={minus} alt="decrease quantity" />
          </button>
          <div className={styles.number}>{line_item.quantity}</div>
          <button
            onClick={() => updateQuantity()}
            className={cx(styles.button, { [styles.disabled]: isAdding })}
            type="button"
          >
            <img src={plus} alt="decrease quantity" />
          </button>
        </div>
      </div>
      <div className={styles.price}>{getPrice(variant.price)}</div>
    </div>
  )
}

export default LineItem
