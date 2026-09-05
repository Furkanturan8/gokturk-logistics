import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin)
  gsap.defaults({ ease: 'expo.out' })

  return {
    provide: {
      gsap,
    },
  }
})
