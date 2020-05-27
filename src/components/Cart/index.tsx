import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import cx from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import React, { useContext, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import happy from '@assets/images/happy.svg'
import close from '@assets/images/close.svg'
import lock from '@assets/images/lock.svg'
import StoreContext from '@context/StoreContext'
import { Query, ShopifyProduct } from '@typings/storefront'
import LineItem from './LineItem'
import styles from './styles.module.scss'
import { getPrice } from '@utils/helpers'

const Cart = () => {
  const {
    store: { checkout, cartOpen },
    closeCart,
  } = useContext(StoreContext)

  const scrollableRef = useRef(null)

  useEffect(() => {
    if (!scrollableRef?.current) return
    if (cartOpen) disableBodyScroll(scrollableRef.current)
    else enableBodyScroll(scrollableRef.current)
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [cartOpen])

  const { shopifyCollection }: Query = useStaticQuery(
    graphql`
      query {
        shopifyCollection(handle: { eq: "add-ons" }) {
          ...CollectionDetails
        }
      }
    `
  )

  const addonProducts = shopifyCollection.products.filter(product => {
    const inCart = checkout.lineItems.find(
      (item: any) => item.variant.product.id === product.shopifyId
    )
    return !inCart
  })

  const handleCheckout = () => {
    window.location = checkout.webUrl
  }

  const lineItems = (
    <AnimatePresence>
      {checkout.lineItems.length > 0 && (
        <motion.div
          positionTransition
          key="lineItems"
          className={styles.lineItems}
        >
          {checkout.lineItems.map((lineItem: any) => (
            <motion.div
              className={styles.lineItem}
              positionTransition
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              key={lineItem.id}
            >
              <LineItem lineItem={lineItem} />
            </motion.div>
          ))}
        </motion.div>
      )}
      {addonProducts.length > 0 && (
        <motion.div
          positionTransition
          key="addonItems"
          className={styles.addonItems}
        >
          {addonProducts.map((product: ShopifyProduct) => (
            <motion.div
              positionTransition
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0 } }}
              key={product.shopifyId}
            >
              <LineItem addonProduct={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div
      className={cx(styles.cart, {
        [styles.active]: cartOpen,
      })}
    >
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <img className={styles.happy} src={happy} alt=":)" />
          <div className={styles.title}>your shopping cart</div>
          <button onClick={closeCart} type="button">
            <img className={styles.close} src={close} alt="close cart" />
          </button>
        </div>
        <div className={styles.headerBottom}>save 15% on orders over $40</div>
      </div>
      <div ref={scrollableRef} className={styles.scrollable}>
        {lineItems}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerInfoRow}>
          <span className={styles.left}>subtotal</span>
          <span className={styles.right}>
            {getPrice(checkout.subtotalPrice)}
            {checkout?.discountApplications?.length > 0 && (
              <span>&nbsp;({checkout.discountApplications[0].title})</span>
            )}
          </span>
        </div>
        <div className={styles.footerInfoRow}>
          <span className={styles.left}>shipping</span>
          <span className={styles.right}>free</span>
        </div>
        <button
          onClick={handleCheckout}
          className={styles.checkout}
          type="button"
        >
          <img src={lock} alt="secure checkout" />
          <span>checkout</span>
        </button>
      </div>
    </div>
  )
}

export default Cart
