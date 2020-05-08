import React from 'react'
import { ContextProvider } from '@context/StoreContext'
import Navigation from '@components/Navigation'
import '@assets/scss/main.scss'
import styles from './styles.module.scss'

const Layout = ({ children }: any) => (
  <ContextProvider>
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.contentWrapper}>
        {children}
        <footer>© {new Date().getFullYear()}, teehouse shop</footer>
      </div>
    </div>
  </ContextProvider>
)

export default Layout
