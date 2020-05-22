import cx from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import React, { useContext, useState, memo } from 'react'

import minus from '@assets/images/minus.svg'
import plus from '@assets/images/plus.svg'
import StoreContext from '@context/StoreContext'
import { Query, ShopifyProduct } from '@typings/storefront'
import { getPrice } from '@utils/helpers'

import styles from './styles.module.scss'

interface LineItemProps {
  lineItem?: any
  addonProduct?: ShopifyProduct
}
const LineItem = (props: LineItemProps) => {
  const { lineItem, addonProduct } = props

  const { updateLineItem, removeLineItem, addVariantToCart } = useContext(
    StoreContext
  )
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

  // set product and variant ids based on lineitem or addon item
  const productId = lineItem?.variant?.product?.id || addonProduct?.shopifyId
  const variantId = lineItem?.variant?.id || addonProduct?.variants[0].shopifyId

  // Derive product
  const productNode = allShopifyProduct.edges.find(
    ({ node }) => node.shopifyId === productId
  )

  // remove if product not found
  if (!productNode) {
    if (lineItem.id) removeLineItem(lineItem.id)
    console.error(
      `Coudn't find product in line item staticQuery`,
      lineItem.variant.product.id
    )
    return
  }

  const { node: product } = productNode

  // Derive variant
  const variant = product.variants.find(
    ({ shopifyId }) => shopifyId === variantId
  )

  // remove if variant not found
  if (!variant) {
    if (lineItem.id) removeLineItem(lineItem.id)
    console.error(
      `Coudn't find variant in line item search`,
      lineItem.variant.id
    )
    return
  }

  // derive image to use with Gatsby image
  const image =
    product.images.find(image => image.id === variant.image.id) ||
    product.images[0]

  const variantImage = (
    <Image
      className={styles.image}
      fluid={image.localFile.childImageSharp.fluid}
      key={image.id}
      alt={product.title}
    />
  )

  // Update quantity
  const updateQuantity = async (increase = true) => {
    if (isAdding) return

    setIsAdding(true)
    const newQuantity = lineItem.quantity + (increase ? 1 : -1)
    if (newQuantity <= 0) return removeLineItem(lineItem.id)

    await updateLineItem(lineItem.id, `${newQuantity}`)
    setIsAdding(false)
  }

  // Insert addon to cart
  const addAddon = async () => {
    if (isAdding) return

    setIsAdding(true)
    await addVariantToCart(variantId, `1`)
    setIsAdding(false)
  }

  // render quantity controls
  const Quantity = () => (
    <div className={styles.quantity}>
      <button
        onClick={() => updateQuantity(false)}
        className={cx(styles.button, {
          [styles.disabled]: isAdding,
        })}
        type="button"
      >
        <img src={minus} alt="decrease quantity" />
      </button>
      <div className={styles.number}>{lineItem.quantity}</div>
      <button
        onClick={() => updateQuantity()}
        className={cx(styles.button, {
          [styles.disabled]: isAdding,
        })}
        type="button"
      >
        <img src={plus} alt="decrease quantity" />
      </button>
    </div>
  )

  return (
    <div className={styles.lineItem}>
      {variantImage}
      <div className={styles.details}>
        <div className={styles.title}>{product.title}</div>
        {variant.title !== `Default Title` && (
          <div className={styles.variantTitle}>{variant.title}</div>
        )}
        {lineItem && <Quantity />}
      </div>
      {lineItem ? (
        <div className={styles.price}>{getPrice(variant.price)}</div>
      ) : (
        <button
          onClick={() => addAddon()}
          className={cx(styles.button, styles.addButton, {
            [styles.disabled]: isAdding,
          })}
          type="button"
        >
          add
        </button>
      )}
    </div>
  )
}

export default memo(LineItem)
