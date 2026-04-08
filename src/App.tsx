import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { StudyPage } from './pages/StudyPage'

const PageTransition = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/study" element={<PageTransition><StudyPage /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
