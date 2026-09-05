<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journeyStages } from '~/data/statistics'

const { t, dl, tm, rt, locale } = useLocalizedData()

const heritageChain = computed<string[]>(() => (tm('journey.heritageChain') as unknown as unknown[]).map(item => rt(item as any)))

const pinEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const truckMarkerEl = ref<HTMLElement | null>(null)
const headlineEl = ref<HTMLElement | null>(null)
const heritageEl = ref<HTMLElement | null>(null)
const heritageWipeEl = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })

  if (heritageEl.value && heritageWipeEl.value) {
    gsap.set(heritageWipeEl.value, { clipPath: 'inset(0 0 0 100%)' })
    gsap.to(heritageWipeEl.value, {
      clipPath: 'inset(0 0 0 0%)',
      ease: 'none',
      scrollTrigger: {
        trigger: heritageEl.value,
        start: 'top 70%',
        end: 'bottom top',
        scrub: 1.2,
      },
    })
    gsap.fromTo(
      '.heritage-caption',
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: heritageEl.value, start: 'top 60%', once: true },
      },
    )
    gsap.fromTo(
      '.heritage-mark',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: heritageEl.value, start: 'top 60%', once: true },
      },
    )
    gsap.fromTo(
      '.heritage-chain-word',
      { opacity: 0, x: -8 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: heritageEl.value, start: 'top 65%', once: true },
      },
    )
  }

  if (pinEl.value && trackEl.value) {
    const stages = journeyStages.length
    const scrollDistance = () => (trackEl.value?.scrollWidth ?? 0) - window.innerWidth

    gsap.to(trackEl.value, {
      x: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pinEl.value,
        start: 'top top',
        end: () => `+=${scrollDistance()}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          activeIndex.value = Math.min(stages - 1, Math.round(self.progress * (stages - 1)))
          if (truckMarkerEl.value) {
            gsap.set(truckMarkerEl.value, { left: `${self.progress * 100}%` })
          }
        },
      },
    })
  }
})
</script>

<template>
  <section class="relative bg-ink-900">
    <div class="section-pad container-edge pt-28 md:pt-36">
      <div class="mb-14 max-w-2xl">
        <p class="eyebrow mb-6">{{ t('journey.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('journey.headline1') }}<br>{{ t('journey.headline2') }}
        </h2>
      </div>

      <!-- Brand heritage motif: horse → truck -->
      <div ref="heritageEl" class="relative mb-20 aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
        <img :src="useBaseUrl('/media/images/horse-galloping.jpeg')" alt="" class="absolute inset-0 h-full w-full object-cover grayscale" />
        <div class="absolute inset-0 bg-rust-600/20" />
        <div ref="heritageWipeEl" class="absolute inset-0">
          <img :src="useBaseUrl('/media/images/hero-highway-sunset.jpeg')" alt="" class="absolute inset-0 h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-ink-900/40 to-transparent" />
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/15 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-ink-900/50 via-transparent to-transparent" />

        <div class="absolute inset-x-0 bottom-0 p-8 md:p-12">
          <p class="eyebrow mb-4 text-rust-400">{{ t('journey.heritageLabel') }}</p>

          <div class="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <template v-for="(word, i) in heritageChain" :key="word">
              <span class="heritage-chain-word text-[0.68rem] font-semibold uppercase tracking-widest2 text-bone-200 opacity-0">{{ word }}</span>
              <span v-if="i < heritageChain.length - 1" class="heritage-chain-word text-[0.68rem] text-rust-400 opacity-0">→</span>
            </template>
          </div>

          <h3 class="heritage-caption font-display text-2xl font-extrabold uppercase text-bone-100 opacity-0 md:text-4xl">
            {{ t('journey.heritageHeadline1') }} <span class="text-rust-400">{{ t('journey.heritageHeadline2') }}</span>
          </h3>
          <p class="heritage-caption mt-4 max-w-lg text-sm leading-relaxed text-bone-300 opacity-0 md:text-base">
            {{ t('journey.heritageBody') }}
          </p>

          <div class="mt-6 flex items-center gap-3">
            <span
              v-for="i in 10"
              :key="i"
              class="heritage-mark h-1.5 bg-bone-100/40"
              :class="i % 2 === 0 ? 'w-6 rounded-full' : 'w-3 rounded-sm'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Pinned horizontal storytelling -->
    <div ref="pinEl" class="relative h-[100svh] w-full overflow-hidden">
      <div class="absolute inset-x-0 top-6 z-20 px-6 md:top-10 md:px-16">
        <div class="relative h-px w-full bg-white/10">
          <div ref="truckMarkerEl" class="absolute -top-[5px] flex -translate-x-1/2 flex-col items-center gap-2" style="left: 0%">
            <span class="h-2.5 w-2.5 rounded-full bg-rust-500 ring-4 ring-rust-500/25" />
          </div>
        </div>
        <div class="mt-4 hidden justify-between md:flex">
          <span
            v-for="(stage, i) in journeyStages"
            :key="stage.id"
            class="text-[0.62rem] font-semibold uppercase tracking-widest2 transition-colors duration-300"
            :class="i === activeIndex ? 'text-rust-400' : 'text-steel-500'"
          >
            {{ dl(`data.journey.${stage.id}.title`, stage.title) }}
          </span>
        </div>
      </div>

      <div ref="trackEl" class="flex h-full w-max will-change-transform">
        <div
          v-for="stage in journeyStages"
          :key="stage.id"
          class="relative h-full w-screen shrink-0 overflow-hidden"
        >
          <img :src="useBaseUrl(stage.image)" :alt="dl(`data.journey.${stage.id}.title`, stage.title)" class="absolute inset-0 h-full w-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/20" />

          <div class="section-pad container-edge absolute inset-x-0 bottom-16 md:bottom-20">
            <p class="font-display text-4xl font-black text-white/15 md:text-6xl">{{ stage.label }}</p>
            <h3 class="mt-2 font-display text-2xl font-extrabold uppercase text-bone-100 md:text-5xl">{{ dl(`data.journey.${stage.id}.title`, stage.title) }}</h3>
            <p class="mt-4 max-w-md text-sm leading-relaxed text-bone-300">{{ dl(`data.journey.${stage.id}.description`, stage.description) }}</p>
            <div class="mt-6 inline-flex flex-col border-l-2 border-rust-500 pl-4">
              <span class="font-display text-xl font-bold text-bone-100">{{ dl(`data.journey.${stage.id}.statValue`, stage.stat.value) }}</span>
              <span class="text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ dl(`data.journey.${stage.id}.statLabel`, stage.stat.label) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
