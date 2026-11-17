import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export const useRotatingHeadline = (phrases: string[], intervalMs = 3200) => {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || phrases.length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [phrases, intervalMs, reduceMotion])

  return phrases[index] ?? phrases[0]
}