<script setup lang="ts">
import { services } from '~/data/services'

const { t, dl, locale } = useLocalizedData()

const headlineEl = ref<HTMLElement | null>(null)
const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.service-row'), { y: 20, stagger: 0.08 })
})
</script>

<template>
  <section id="hizmetler" class="relative bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="mb-16 max-w-2xl">
        <p class="eyebrow mb-6">{{ t('services.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('services.headline1') }}<br>{{ t('services.headline2') }}
        </h2>
      </div>

      <div class="border-t border-white/10">
        <div
          v-for="service in services"
          :key="service.id"
          class="service-row group grid grid-cols-[3rem_1fr] items-center gap-6 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[4rem_2fr_1fr] md:gap-10 md:py-10"
        >
          <span class="font-display text-sm text-steel-500">{{ service.index }}</span>

          <h3 class="font-display text-2xl font-extrabold uppercase text-bone-100 transition-all duration-500 ease-cinematic group-hover:translate-x-3 group-hover:text-rust-400 sm:text-3xl md:text-4xl">
            {{ dl(`data.services.${service.id}.title`, service.title) }}
          </h3>

          <p class="col-span-2 mt-4 max-w-md text-sm leading-relaxed text-steel-300 transition-all duration-500 ease-cinematic md:col-span-1 md:mt-0 md:translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
            {{ dl(`data.services.${service.id}.description`, service.description) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
