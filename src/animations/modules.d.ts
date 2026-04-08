declare module '*.js' {
  const value: {
    init: (container: HTMLElement, config?: Record<string, unknown>) => unknown
    play: (state: unknown) => void
    destroy: (state: unknown) => void
  }

  export default value
}
