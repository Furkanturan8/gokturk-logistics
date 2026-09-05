<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()

const headlineEl = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)
const sectionEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.cta-fade'), { y: 24, delay: 0.3 })

  if (bgEl.value) {
    gsap.fromTo(
      bgEl.value,
      { scale: 1 },
      {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    )
  }
})
</script>

<template>
  <section id="teklif" ref="sectionEl" class="relative flex h-[92svh] min-h-[560px] w-full items-center overflow-hidden bg-ink-900">
    <div ref="bgEl" class="absolute inset-0 h-full w-full">
      <img :src="useBaseUrl('/media/images/hero-highway-sunset.jpeg')" alt="" class="h-full w-full object-cover">
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/40" />
    <div class="noise-overlay" />

    <div class="relative z-10 w-full section-pad container-edge">
      <h2 :key="locale" ref="headlineEl" class="font-display text-display-1 font-extrabold uppercase text-bone-100">
        <span class="split-line">{{ t('finalCta.headline1') }}</span>
        <span class="split-line text-rust-500">{{ t('finalCta.headline2') }}</span>
      </h2>

      <p class="cta-fade mt-8 max-w-md text-sm leading-relaxed text-bone-300 opacity-0 md:text-base">
        {{ t('finalCta.body') }}
      </p>

      <div class="cta-fade mt-10 flex flex-wrap gap-4 opacity-0">
        <a href="mailto:info@gokturklojistik.com.tr" class="btn-solid">{{ t('finalCta.ctaPrimary') }}</a>
        <a href="#footer" class="btn-ghost">{{ t('finalCta.ctaSecondary') }}</a>
      </div>
    </div>
  </section>
</template>
