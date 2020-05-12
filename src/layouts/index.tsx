import React from 'react'
import { ContextProvider } from '@context/StoreContext'
import Navigation from '@components/Navigation'
import Transition from '@components/Transition'
import '@assets/scss/main.scss'
import styles from './styles.module.scss'

const Layout = ({ children, location }: any) => (
  <ContextProvider>
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.contentWrapper}>
        <Transition location={location}>{children}</Transition>
      </div>
    </div>
  </ContextProvider>
)

export default Layout
