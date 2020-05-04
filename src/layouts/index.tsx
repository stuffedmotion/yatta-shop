import React from 'react'
import { ContextProvider } from '@context/StoreContext'
import Navigation from '@components/Navigation'
import '@assets/scss/main.scss'

const Layout = ({ children }: any) => (
  <ContextProvider>
    <Navigation />
    <div>
      {children}
      <footer>© {new Date().getFullYear()}, teehouse shop</footer>
    </div>
    />
  </ContextProvider>
)

export default Layout
