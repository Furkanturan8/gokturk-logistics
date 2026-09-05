import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

interface RevealOptions {
  type?: 'lines' | 'words' | 'chars'
  stagger?: number
  start?: string
  delay?: number
}

export function useRevealText() {
  const nuxtApp = useNuxtApp()
  const { locale } = useI18n()

  const reveal = (el: HTMLElement | null | undefined, options: RevealOptions = {}) => {
    if (!el || !nuxtApp.$gsap) return

    const { type = 'lines', stagger = 0.08, start = 'top 85%', delay = 0 } = options

    const split = new SplitText(el, {
      type,
      mask: type,
      linesClass: 'split-line-inner',
    })

    const targets = type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars

    gsap.set(targets, { yPercent: 110, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger,
          delay,
        })
      },
    })

    // The split wraps the headline's text node in nested spans and detaches it
    // from Vue's vnode, so a later locale switch can't patch the text back in
    // through normal reactivity. The element is force-remounted via `:key="locale"`
    // in the template instead — kill this trigger and split so the (now emptied)
    // target list can't fire a stray tween if the section is scrolled to afterwards.
    const stopWatch = watch(locale, () => {
      trigger.kill()
      split.revert()
      stopWatch()
    }, { flush: 'sync' })

    return split
  }

  return { reveal }
}
