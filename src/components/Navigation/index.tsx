import cx from 'classnames'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import { AnimationConfig } from 'lottie-web'
import React, { useContext, useState, useEffect } from 'react'
import { useScrollPosition } from 'react-use-scroll-position'

import cart from '@assets/images/cart.svg'
import headerDesktopAnim from '@assets/lottie/header_desktop.json'
import headerMobileAnim from '@assets/lottie/header_mobile.json'
import mobileMenuAnim from '@assets/lottie/mobile_menu.json'
import logo from '@assets/images/teehouse_logo.svg'
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
  const [state, setstate] = useState({ mobileOpen: false, cartOpen: false })
  const { y: scrollY } = useScrollPosition()

  useEffect(() => {
    if (scrollY > 70) document.body.classList.add(`scrolled`)
    else document.body.classList.remove(`scrolled`)
  }, [scrollY])

  const { Lottie: HeaderDesktopLottie } = useLottie(headerDesktopConfig, {
    className: styles.headerDesktopLottie,
  })

  const { Lottie: HeaderMobileLottie } = useLottie(headerMobileConfig, {
    className: styles.headerMobileLottie,
  })

  const { Lottie: MobileMenuLottie, anim: animMobileMenu } = useLottie(
    mobileMenuConfig,
    {
      className: styles.mobileMenuLottie,
      onClick: () => {
        toggleMobileMenu()
      },
    }
  )

  const toggleMobileMenu = () => {
    setstate(prevState => {
      const { mobileOpen } = prevState

      if (!mobileOpen) {
        animMobileMenu.setDirection(1)
        animMobileMenu.setSpeed(2.5)
        animMobileMenu.goToAndPlay(30, true)
      } else {
        animMobileMenu.setDirection(-1)
        animMobileMenu.goToAndPlay(64, true)
      }
      return {
        ...prevState,
        mobileOpen: !mobileOpen,
      }
    })
  }

  return (
    <>
      <div className={styles.header}>
        {HeaderDesktopLottie}
        {HeaderMobileLottie}
        <div className={styles.wrapper}>
          {MobileMenuLottie}
          <Link className={styles.logo} to="/">
            <img alt="teehouse logo" src={logo} />
          </Link>
          <div className={styles.navWrapper}>
            <Navigation className={styles.navigation} />
            <CartButton />
          </div>
        </div>
      </div>
      <CartButton className={styles.fixedCart} />
    </>
  )
}

const Navigation = ({ className }: { className: string }) => {
  return (
    <nav role="main" className={className}>
      <Link activeClassName={styles.active} to="/">
        shop
      </Link>
      <Link to="/">about</Link>
      <Link to="/">contact</Link>
    </nav>
  )
}

const CartButton = ({ className }: { className?: string }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <div className={cx(styles.cart, className)}>
      <img alt="cart" src={cart} />
      {hasItems && <div className={styles.quantity}>{quantity}</div>}
    </div>
  )
}

export default Header
