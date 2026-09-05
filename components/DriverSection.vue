<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()

const headlineEl = ref<HTMLElement | null>(null)
const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const highlightKeys = ['safety', 'experience', 'support', 'planning']

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.driver-fade'), { y: 24, stagger: 0.1 })

  const heritageCard = document.querySelector('.driver-heritage')
  if (heritageCard) {
    gsap.fromTo(
      heritageCard,
      { opacity: 0, y: 20, rotate: 6, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        rotate: -3,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: heritageCard, start: 'top 85%', once: true },
      },
    )
  }
})
</script>

<template>
  <section id="insan" class="relative overflow-hidden bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-6">
          <p class="driver-fade eyebrow mb-6">{{ t('driver.eyebrow') }}</p>
          <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
            {{ t('driver.headline1') }}<br>{{ t('driver.headline2') }}<br>{{ t('driver.headline3') }}
          </h2>
        </div>
        <div class="lg:col-span-6">
          <p class="driver-fade max-w-md text-sm leading-relaxed text-bone-300 md:text-base lg:ml-auto lg:text-right">
            {{ t('driver.body') }}
          </p>
          <p class="driver-fade mt-4 max-w-md text-xs uppercase tracking-widest2 text-steel-400 lg:ml-auto lg:text-right">
            {{ t('driver.connectingLine') }}
          </p>
        </div>
      </div>

      <div class="driver-fade relative mt-20 aspect-[16/9] w-full overflow-hidden md:mt-14 md:aspect-[21/9]">
        <video class="h-full w-full object-cover" autoplay muted loop playsinline poster="/media/images/truck-vertical-sunset.jpeg">
          <source src="/media/video/truck-and-girl-2.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />

        <div class="driver-heritage absolute -top-8 right-4 w-24 -rotate-3 border-4 border-ink-900 shadow-xl sm:right-6 sm:w-32 md:-top-12 md:right-10 md:w-44">
          <img src="/media/images/horse-rider-steppe.jpeg" alt="Bozkırda at üzerinde bir binici" class="aspect-[3/4] w-full object-cover grayscale">
          <p class="bg-ink-900 py-1.5 text-center text-[0.55rem] font-semibold uppercase tracking-widest2 text-rust-400">{{ t('driver.heritageCaption') }}</p>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
        <div v-for="key in highlightKeys" :key="key" class="driver-fade">
          <p class="font-display text-lg font-extrabold uppercase text-bone-100">{{ t(`driver.highlights.${key}.title`) }}</p>
          <p class="mt-3 text-xs leading-relaxed text-steel-300">{{ t(`driver.highlights.${key}.description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
