import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="layout-main">
        {children}
      </main>
      <Footer />
    </>
  )
}