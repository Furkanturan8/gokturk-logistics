<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()

const headlineEl = ref<HTMLElement | null>(null)
const mediaEl = ref<HTMLElement | null>(null)
const sectionEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'words', stagger: 0.04 })
  fadeIn(document.querySelectorAll('.brand-fade'), { y: 24 })

  if (mediaEl.value && sectionEl.value) {
    gsap.fromTo(
      mediaEl.value,
      { scale: 1.25 },
      {
        scale: 1,
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
  <section ref="sectionEl" class="relative bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-5">
        <p class="brand-fade eyebrow mb-6">{{ t('brand.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('brand.headline') }}
        </h2>
        <p class="brand-fade mt-8 max-w-md text-sm leading-relaxed text-bone-300 md:text-base">
          {{ t('brand.body') }}
        </p>
        <div class="brand-fade mt-10 line-hair max-w-md" />
        <p class="brand-fade mt-6 max-w-md text-xs uppercase tracking-widest2 text-steel-300">
          {{ t('brand.tagline') }}
        </p>
      </div>

      <div class="lg:col-span-7">
        <div class="brand-fade relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
          <video
            ref="mediaEl"
            class="h-full w-full scale-125 object-cover"
            autoplay
            muted
            loop
            playsinline
            poster="/media/images/truck-side-profile.jpeg"
          >
            <source src="/media/video/truck-and-girl.mp4" type="video/mp4">
          </video>
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  </section>
</template>
