<script setup lang="ts">
import { gsap } from 'gsap'
import { heroStatistics } from '~/data/statistics'

const { t, locale } = useI18n()

const videoEl = ref<HTMLVideoElement | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const headlineEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  if (videoEl.value) {
    gsap.set(videoEl.value, { scale: 1.18 })
    tl.to(videoEl.value, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
  }

  tl.fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)

  if (headlineEl.value) {
    reveal(headlineEl.value, { type: 'lines', stagger: 0.12, start: 'top 100%' })
  }

  tl.fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 1.1)
  tl.fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 1.3)
  tl.fromTo('.hero-stat', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1.5)
  tl.fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.8)
  tl.fromTo('.hoofprint-mark', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' }, 1.6)

  gsap.to('.route-grid-line', {
    strokeDashoffset: -400,
    duration: 18,
    ease: 'none',
    repeat: -1,
  })
})
</script>

<template>
  <section id="hero" ref="rootEl" class="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-ink-900">
    <video
      ref="videoEl"
      class="absolute inset-0 h-full w-full object-cover"
      autoplay
      muted
      loop
      playsinline
      poster="/media/images/hero-highway-sunset.jpeg"
    >
      <source src="/media/video/nature-with-truck.mp4" type="video/mp4">
    </video>

    <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/20" />
    <div class="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-transparent to-ink-900/40" />
    <div class="noise-overlay" />

    <svg class="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30" viewBox="0 0 400 800" preserveAspectRatio="none">
      <line class="route-grid-line" x1="400" y1="0" x2="0" y2="800" stroke="#f3efe9" stroke-width="1" stroke-dasharray="6 10" />
      <line class="route-grid-line" x1="440" y1="0" x2="40" y2="800" stroke="#f3efe9" stroke-width="1" stroke-dasharray="6 10" />
      <line class="route-grid-line" x1="480" y1="0" x2="80" y2="800" stroke="#f3efe9" stroke-width="1" stroke-dasharray="6 10" />
    </svg>

    <div class="relative z-10 w-full section-pad container-edge pb-16 pt-32 md:pb-20">
      <p class="hero-eyebrow eyebrow mb-6 opacity-0">{{ t('hero.eyebrow') }}</p>

      <h1 :key="locale" ref="headlineEl" class="font-display text-display-1 font-extrabold uppercase text-bone-100">
        <span class="split-line">{{ t('hero.headline1') }}</span>
        <span class="split-line text-rust-500">{{ t('hero.headline2') }}</span>
      </h1>

      <div class="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <p class="hero-sub max-w-md text-sm leading-relaxed text-bone-300 opacity-0 md:text-base">
          {{ t('hero.sub') }}
        </p>

        <div class="flex flex-wrap gap-4">
          <a href="#teklif" class="hero-cta btn-solid opacity-0" @click.prevent="scrollTo('#teklif')">{{ t('hero.ctaPrimary') }}</a>
          <a href="#ag" class="hero-cta btn-ghost opacity-0" @click.prevent="scrollTo('#ag')">{{ t('hero.ctaSecondary') }}</a>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 md:max-w-xl">
        <div v-for="stat in heroStatistics" :key="stat.key" class="hero-stat opacity-0">
          <p class="font-display text-2xl font-bold text-bone-100 num-tabular md:text-3xl">{{ stat.value.toLocaleString('tr-TR') }}{{ stat.suffix }}</p>
          <p class="mt-1 text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t(`hero.stats.${stat.key}`) }}</p>
        </div>
      </div>

      <!-- Hoofprint → road marking motif -->
      <div class="mt-10 hidden items-center gap-3 md:flex">
        <span
          v-for="i in 8"
          :key="i"
          class="hoofprint-mark h-1.5 bg-bone-100/25"
          :class="i % 2 === 0 ? 'w-6 rounded-full' : 'w-3 rounded-sm'"
        />
      </div>
    </div>

    <div class="hero-scroll-indicator absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3 opacity-0 md:right-16">
      <span class="text-[0.6rem] uppercase tracking-widest2 text-bone-300 [writing-mode:vertical-rl]">{{ t('hero.scrollHint') }}</span>
      <span class="relative h-14 w-px overflow-hidden bg-white/15">
        <span class="absolute inset-x-0 top-0 h-4 w-px animate-[scrollLine_2s_ease-in-out_infinite] bg-rust-400" />
      </span>
    </div>
  </section>
</template>

<style scoped>
@keyframes scrollLine {
  0% { transform: translateY(-100%); }
  60% { transform: translateY(200%); }
  100% { transform: translateY(200%); }
}
</style>
