/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import { Link } from 'gatsby'
import reduce from 'lodash/reduce'
import { AnimationConfig } from 'lottie-web'
import React, { useContext, useState, useEffect } from 'react'
import posed from 'react-pose'
import { useScrollPosition } from 'react-use-scroll-position'

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
  const { y: scrollY } = useScrollPosition()

  const { openCart } = useContext(StoreContext)

  useEffect(() => {
    if (scrollY > 70) document.body.classList.add(`scrolled`)
    else document.body.classList.remove(`scrolled`)
  }, [scrollY])

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

  const toggleMobileMenu = () => {
    setState(prevState => {
      const { mobileOpen } = prevState

      animMobileMenu.setSpeed(2.5)
      if (!mobileOpen) {
        animMobileMenu.setDirection(1)
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
  console.log('nav')

  return (
    <>
      <MobileMenu isOpen={state.mobileOpen} />
      <Cart />
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
            <CartButton onClick={openCart} />
          </div>
        </div>
      </div>
      <CartButton onClick={openCart} className={styles.fixedCart} />
    </>
  )
}

const Navigation = ({ className }: { className: string }) => (
  <nav role="main" className={className}>
    <Link activeClassName={styles.active} to="/product/salt/">
      shop
    </Link>
    <Link activeClassName={styles.active} to="/product/unicorn-t-shirt/">
      about
    </Link>
    <Link activeClassName={styles.active} to="/">
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

const Transition = posed.img({
  visible: {
    opacity: 1,
    y: 0,
    delay: 200,
    transition: {
      y: { type: 'spring', stiffness: 200, damping: 15 },
      opacity: { ease: 'easeOut', duration: 300 },
      default: { duration: 300 },
    },
  },
  hidden: {
    opacity: 0,
    y: 200,
    transition: { duration: 400 },
  },
})

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => (
  <div
    className={cx(styles.mobileMenu, {
      [styles.active]: isOpen,
    })}
  >
    <div className={styles.mobileMenuWrapper}>
      <Navigation className={styles.navigationMobile} />
    </div>
    <Transition
      pose={isOpen ? 'visible' : 'hidden'}
      className={styles.whale}
      src={whale}
      alt="cute whale"
    />
  </div>
)

export default Header
