import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useCountUp(target: Ref<HTMLElement | null>, value: number, options: { duration?: number; decimals?: number } = {}) {
  const display = ref(options.decimals ? (0).toFixed(options.decimals) : '0')

  onMounted(() => {
    if (!target.value) return
    const counter = { n: 0 }

    ScrollTrigger.create({
      trigger: target.value,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: value,
          duration: options.duration ?? 2,
          ease: 'expo.out',
          onUpdate: () => {
            display.value = options.decimals
              ? counter.n.toFixed(options.decimals)
              : Math.round(counter.n).toLocaleString('tr-TR')
          },
        })
      },
    })
  })

  return { display }
}
