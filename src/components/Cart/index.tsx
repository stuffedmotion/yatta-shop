import cx from 'classnames'
import React, { useContext } from 'react'

import happy from '@assets/images/happy.svg'
import close from '@assets/images/close.svg'
import StoreContext from '@context/StoreContext'
import LineItem from './LineItem'
import styles from './styles.module.scss'

const Cart = () => {
  console.log('cart')

  const {
    store: { checkout, cartOpen },
    closeCart,
  } = useContext(StoreContext)

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
        {checkout.lineItems.map((line_item: any) => (
          <LineItem key={line_item.id.toString()} line_item={line_item} />
        ))}
      </div>
      cart
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
