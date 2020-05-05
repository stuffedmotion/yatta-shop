import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import React, { useContext } from 'react'

import animationData from '@assets/lottie/header_desktop.json'
import logo from '@assets/images/teehouse_logo.svg'
import StoreContext from '@context/StoreContext'
import useLottie, { UseLottieConfig } from '@utils/useLottie'
import styles from './styles.module.scss'

const useQuantity = (): [boolean, number] => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: `xMinYMin slice`,
  },
  name: `header_bg`,
} as UseLottieConfig

const Mast = () => {
  const { Lottie, anim } = useLottie(lottieOptions, {
    className: styles.lottie,
  })

  return (
    <div className={styles.mast}>
      {Lottie}
      <div className={styles.wrapper}>
        <Link className={styles.logo} to="/">
          <img alt="teehouse logo" src={logo} />
        </Link>
        <Navigation />
      </div>
    </div>
  )
}

const Navigation = () => {
  return (
    <nav role="main" className={styles.navigation}>
      <ul>
        <Link activeClassName={styles.active} to="/">
          shop
        </Link>
        <Link to="/">about</Link>
        <Link to="/">contact</Link>
      </ul>
    </nav>
  )
}

const Header = () => {
  return <Mast />
}

const CartButton = () => {
  const [hasItems, quantity] = useQuantity()

  return (
    <div className={styles.cartButton}>
      <Link to="/cart">
        {hasItems && <div>{quantity}</div>}
        Cart 🛍
      </Link>
    </div>
  )
}

export default Header
