import { create } from 'zustand'
import type { ThemeMode } from '../types/content'

interface PortfolioState {
  themeMode: ThemeMode
  soundEnabled: boolean
  setThemeMode: (mode: ThemeMode) => void
  setSoundEnabled: (enabled: boolean) => void
}

const getStoredValue = <T,>(key: string, fallback: T): T => {
  const val = localStorage.getItem(key)
  return val ? (JSON.parse(val) as T) : fallback
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  themeMode: getStoredValue<ThemeMode>('portfolio_theme_mode', 'dark'),
  soundEnabled: getStoredValue<boolean>('portfolio_sound_enabled', false),
  setThemeMode: (mode) => {
    localStorage.setItem('portfolio_theme_mode', JSON.stringify(mode))
    set({ themeMode: mode })
  },
  setSoundEnabled: (enabled) => {
    localStorage.setItem('portfolio_sound_enabled', JSON.stringify(enabled))
    set({ soundEnabled: enabled })
  },
}))

