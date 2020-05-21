import cx from 'classnames'
import { useStaticQuery } from 'gatsby'
import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import happy from '@assets/images/happy.svg'
import close from '@assets/images/close.svg'
import StoreContext from '@context/StoreContext'
import { Query, ShopifyProduct } from '@typings/storefront'
import LineItem from './LineItem'
import styles from './styles.module.scss'

const Cart = () => {
  const {
    store: { checkout, cartOpen },
    closeCart,
  } = useContext(StoreContext)

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
    const search = checkout.lineItems.find(
      (item: any) => item.variant.product.id === product.shopifyId
    )
    return !search
  })

  const handleCheckout = () => {
    window.location = checkout.webUrl
  }

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
      <div className={styles.scrollable}>
        <AnimatePresence>
          <div key="lineItems" className={styles.lineItems}>
            {checkout.lineItems.map((lineItem: any) => (
              <motion.div
                className={styles.lineItem}
                positionTransition
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                key={lineItem.id.toString()}
              >
                <LineItem lineItem={lineItem} />
              </motion.div>
            ))}
          </div>
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
                exit={{ opacity: 0, x: -50 }}
                key={product.shopifyId}
              >
                <LineItem addonProduct={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// const Cart2 = () => {
//   return (
//     <div>
//       {checkout.lineItems.map((line_item: any) => (
//         <LineItem key={line_item.id.toString()} line_item={line_item} />
//       ))}
//       <h2>Subtotal</h2>
//       <p>$ {checkout.subtotalPrice}</p>
//       <br />
//       <h2>Taxes</h2>
//       <p>$ {checkout.totalTax}</p>
//       <br />
//       <h2>Total</h2>
//       <p>$ {checkout.totalPrice}</p>
//       <br />
//       <button
//         type="button"
//         onClick={handleCheckout}
//         disabled={checkout.lineItems.length === 0}
//       >
//         Check out
//       </button>
//     </div>
//   )
// }

export default Cart
