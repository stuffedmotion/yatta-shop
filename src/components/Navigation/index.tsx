import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import React, { useContext } from 'react'
import Lottie from 'react-lottie'

import animationData from '@assets/lottie/header_desktop.json'
import logo from '@assets/images/teehouse_logo.svg'
import StoreContext from '@context/StoreContext'
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
}

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.lottie}>
        <Lottie isClickToPauseDisabled options={lottieOptions} />
      </div>
      <Link className={styles.logo} to="/">
        <img alt="teehouse logo" src={logo} />
      </Link>
      <Navigation />
    </div>
  )
}

const Navigation = () => {
  const [hasItems, quantity] = useQuantity()

  return (
    <div className={styles.navigation}>
      <Link to="/">teehouse</Link>
      <Link to="/cart">
        {hasItems && <div>{quantity}</div>}
        Cart 🛍
      </Link>
    </div>
  )
}

export default Header
