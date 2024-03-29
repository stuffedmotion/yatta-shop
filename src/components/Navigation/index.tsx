/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import { AnimationConfig } from 'lottie-web'
import React, { useContext, useState, useEffect } from 'react'

import cart from '@assets/images/cart.svg'
import headerDesktopAnim from '@assets/lottie/header_desktop.json'
import headerMobileAnim from '@assets/lottie/header_mobile.json'
import mobileMenuAnim from '@assets/lottie/mobile_menu.json'
import logo from '@assets/images/teehouse_logo.svg'
import whale from '@assets/images/whale.svg'
import Cart from '@components/Cart'
import StoreContext from '@context/StoreContext'
import useLottie from '@utils/useLottie'
import styles from './styles.module.scss'

const useQuantity = (): [boolean, number] => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

// Lottie animation setup
const headerDesktopConfig = {
  animationData: headerDesktopAnim,
  name: `headerDesktop`,
} as Partial<AnimationConfig>

const headerMobileConfig = {
  animationData: headerMobileAnim,
  name: `headerDesktopLottie`,
} as Partial<AnimationConfig>

const mobileMenuConfig = {
  animationData: mobileMenuAnim,
  name: `headerMobileLottie`,
  autoplay: false,
  loop: false,
} as Partial<AnimationConfig>

const Header = () => {
  const [state, setState] = useState({ mobileOpen: false })

  const { openCart } = useContext(StoreContext)

  // Lottie initialization
  const { Lottie: HeaderDesktopLottie } = useLottie(headerDesktopConfig, {
    className: styles.headerDesktopLottie,
  })

  const { Lottie: HeaderMobileLottie, anim: animHeaderMobile } = useLottie(
    headerMobileConfig,
    {
      className: styles.headerMobileLottie,
    }
  )
  if (animHeaderMobile) animHeaderMobile.setSpeed(3)

  const { Lottie: MobileMenuLottie, anim: animMobileMenu } = useLottie(
    mobileMenuConfig,
    {
      className: styles.mobileMenuLottie,
      onClick: e => {
        e.stopPropagation()
        e.preventDefault()
        toggleMobileMenu()
      },
    }
  )

  // Toggle or force mobile menu to a specific state
  const toggleMobileMenu = (isOpen?: boolean) => {
    setState(prevState => {
      const { mobileOpen: prevMobileOpen } = prevState

      const mobileOpen = isOpen !== undefined ? isOpen : !prevMobileOpen

      if (prevMobileOpen || isOpen === undefined) {
        animMobileMenu.setSpeed(2.5)
        animMobileMenu.setDirection(mobileOpen ? 1 : -1)
        animMobileMenu.goToAndPlay(mobileOpen ? 30 : 64, true)
      }

      return {
        ...prevState,
        mobileOpen,
      }
    })
  }

  return (
    <>
      <MobileMenu
        isOpen={state.mobileOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <Cart />
      <div className={styles.header}>
        {HeaderDesktopLottie}
        {HeaderMobileLottie}

        <div className={styles.wrapper}>
          {MobileMenuLottie}

          <Link
            className={styles.logo}
            to="/"
            onClick={() => toggleMobileMenu(false)}
          >
            <img alt="teehouse logo" src={logo} />
          </Link>

          <div className={styles.navWrapper}>
            <Navigation className={styles.navigation} />
            <CartButton onClick={openCart} />
          </div>
        </div>
      </div>
      <CartButton onClick={openCart} className={styles.fixedCart} />
    </>
  )
}

const Navigation = ({
  className,
  toggleMobileMenu,
}: {
  className: string
  toggleMobileMenu?: (isOpen?: boolean) => void
}) => (
  <nav role="main" className={className}>
    <Link
      onClick={() => toggleMobileMenu(false)}
      activeClassName={styles.active}
      to="/"
    >
      shop
    </Link>
    <Link activeClassName={styles.active} to="/about">
      about
    </Link>
    <Link activeClassName={styles.active} to="/contact">
      contact
    </Link>
  </nav>
)

const CartButton = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <div role="button" onClick={onClick} className={cx(styles.cart, className)}>
      <img alt="cart" src={cart} />
      {hasItems && <div className={styles.quantity}>{quantity}</div>}
    </div>
  )
}

const MobileMenu = ({
  isOpen,
  toggleMobileMenu,
}: {
  isOpen: boolean
  toggleMobileMenu?: (isOpen?: boolean) => void
}) => (
  <div
    className={cx(styles.mobileMenu, {
      [styles.active]: isOpen,
    })}
  >
    <div className={styles.mobileMenuWrapper}>
      <Navigation
        toggleMobileMenu={toggleMobileMenu}
        className={styles.navigationMobile}
      />
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.img
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
          className={styles.whale}
          src={whale}
          alt="cute whale"
        />
      )}
    </AnimatePresence>
  </div>
)

export default Header
