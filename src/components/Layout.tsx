import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { usePortfolioStore } from '../store/usePortfolioStore'
import { applyJutsuTheme, destroyActiveJutsuTheme } from '../animations/jutsuEffects'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { themeMode } = usePortfolioStore()

  useEffect(() => {
    document.body.dataset.theme = themeMode
  }, [themeMode])

  useEffect(() => {
    applyJutsuTheme('chakra_pulse')
    return () => {
      destroyActiveJutsuTheme()
    }
  }, [])

  return (
    <>
      <div id="chakra-animation-stage" aria-hidden="true" className="chakra-stage" />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="layout-main">
        {children}
      </main>
    </>
  )
}

