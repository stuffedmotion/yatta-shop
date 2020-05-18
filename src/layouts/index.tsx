import React from 'react'
import { ContextProvider } from '@context/StoreContext'
import Helmet from 'react-helmet'
import chip_xs from '@assets/images/chip_xs.svg'
import chip_s from '@assets/images/chip_s.svg'
import chip_m from '@assets/images/chip_m.svg'
import chip_xl from '@assets/images/chip_xl.svg'
import Navigation from '@components/Navigation'
import Transition from '@components/Transition'
import '@assets/scss/main.scss'
import styles from './styles.module.scss'

const Layout = ({ children, location }: any) => (
  <ContextProvider>
    <Helmet>
      <link rel="preload" as="image" href={chip_xs} />
      <link rel="preload" as="image" href={chip_s} />
      <link rel="preload" as="image" href={chip_m} />
      <link rel="preload" as="image" href={chip_xl} />
    </Helmet>
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.contentWrapper}>
        <Transition location={location}>{children}</Transition>
      </div>
    </div>
  </ContextProvider>
)

export default Layout
