import amaterasu from './amaterasu.js'
import chakraPulse from './chakra_pulse.js'
import chidori from './chidori.js'
import crystalStyle from './crystal_style.js'
import fireball from './fireball.js'
import mokuton from './mokuton.js'
import rasengan from './rasengan.js'
import rinnegan from './rinnegan.js'
import shadowClone from './shadow_clone.js'
import sharingan from './sharingan.js'
import summoningJutsu from './summoning_jutsu.js'
import susanoo from './susanoo.js'
import type { AnimationType } from '../types/content'

type AnimationModule = {
  init: (container: HTMLElement, config?: Record<string, unknown>) => unknown
  play: (state: unknown) => void
  destroy: (state: unknown) => void
}

const registry: Record<AnimationType, AnimationModule> = {
  amaterasu,
  chakra_pulse: chakraPulse,
  chidori,
  crystal_style: crystalStyle,
  fireball,
  mokuton,
  rasengan,
  rinnegan,
  shadow_clone: shadowClone,
  sharingan,
  summoning_jutsu: summoningJutsu,
  susanoo,
}

let activeState: unknown = null
let activeType: AnimationType | null = null

const getContainer = () => document.getElementById('chakra-animation-stage') as HTMLElement | null

export const getAnimationTypes = () => Object.keys(registry) as AnimationType[]

export const applyJutsuTheme = (type: AnimationType) => {
  const stage = getContainer()
  if (!stage) return

  const module = registry[type]
  if (!module) return

  if (activeState && activeType) {
    registry[activeType].destroy(activeState)
    activeState = null
  }

  const state = module.init(stage, { intensity: 0.9, speed: 1 })
  module.play(state)
  activeState = state
  activeType = type
  document.body.dataset.animation = type
}

export const destroyActiveJutsuTheme = () => {
  if (activeState && activeType) {
    registry[activeType].destroy(activeState)
    activeState = null
    activeType = null
  }
}
