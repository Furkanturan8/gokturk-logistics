import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface FadeOptions {
  y?: number
  duration?: number
  delay?: number
  start?: string
  stagger?: number
}

export function useScrollFade() {
  const fadeIn = (targets: HTMLElement | HTMLElement[] | NodeListOf<Element> | null | undefined, options: FadeOptions = {}) => {
    if (!targets) return
    const { y = 40, duration = 1, delay = 0, start = 'top 88%', stagger = 0.12 } = options

    gsap.set(targets, { opacity: 0, y })

    ScrollTrigger.create({
      trigger: Array.isArray(targets) || targets instanceof NodeList ? (targets as any)[0] : targets,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'expo.out',
        })
      },
    })
  }

  return { fadeIn }
}
