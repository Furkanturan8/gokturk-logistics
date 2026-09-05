<script setup lang="ts">
import { gsap } from 'gsap'
import { mockShipments, defaultTrackingCode } from '~/data/shipments'
import type { Shipment } from '~/types/logistics'

const { t, dl, tp, locale } = useLocalizedData()

const query = ref('')
const activeShipment = ref<Shipment | null>(null)
const errorMessage = ref('')
const headlineEl = ref<HTMLElement | null>(null)
const timelineEl = ref<HTMLElement | null>(null)

const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const exampleCodes = Object.keys(mockShipments)

function submitQuery() {
  const code = query.value.trim().toUpperCase()
  if (!code) {
    errorMessage.value = t('tracker.errorEmpty')
    activeShipment.value = null
    return
  }

  const shipment = mockShipments[code]
  if (!shipment) {
    errorMessage.value = t('tracker.errorNotFound', { code, example: defaultTrackingCode })
    activeShipment.value = null
    return
  }

  errorMessage.value = ''
  activeShipment.value = shipment
  nextTick(animateTimeline)
}

function useExample(code: string) {
  query.value = code
  submitQuery()
}

function animateTimeline() {
  if (!timelineEl.value) return
  const items = timelineEl.value.querySelectorAll('.timeline-item')
  gsap.fromTo(items, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'expo.out' })
}

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.tracker-fade'), { y: 24 })
})
</script>

<template>
  <section id="takip" class="relative bg-ink-800/40 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="mb-14 max-w-2xl">
        <p class="tracker-fade eyebrow mb-6">{{ t('tracker.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('tracker.headline1') }}<br>{{ t('tracker.headline2') }}
        </h2>
      </div>

      <div class="tracker-fade grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <form class="flex flex-col gap-4 sm:flex-row" @submit.prevent="submitQuery">
            <label class="sr-only" for="tracking-input">{{ t('tracker.inputLabel') }}</label>
            <input
              id="tracking-input"
              v-model="query"
              type="text"
              placeholder="GKT-284921"
              class="w-full border border-white/15 bg-transparent px-5 py-4 text-sm uppercase tracking-wider text-bone-100 placeholder:text-steel-500 focus:border-rust-500 focus:outline-none"
            >
            <button type="submit" class="btn-solid whitespace-nowrap">
              {{ t('tracker.submit') }}
            </button>
          </form>

          <p v-if="errorMessage" class="mt-4 text-sm text-rust-400" role="alert">{{ errorMessage }}</p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span class="text-[0.62rem] uppercase tracking-widest2 text-steel-400">{{ t('tracker.example') }}</span>
            <button
              v-for="code in exampleCodes"
              :key="code"
              class="text-[0.62rem] uppercase tracking-widest2 text-bone-300 underline decoration-steel-500 underline-offset-4 transition-colors hover:text-rust-400"
              @click="useExample(code)"
            >
              {{ code }}
            </button>
          </div>

          <Transition
            enter-active-class="transition-all duration-500 ease-cinematic"
            enter-from-class="opacity-0 translate-y-4"
          >
            <div v-if="activeShipment" class="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <p class="font-display text-xl font-bold text-bone-100 num-tabular">{{ activeShipment.distanceKm.toLocaleString('tr-TR') }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('tracker.distanceLabel') }}</p>
              </div>
              <div>
                <p class="font-display text-xl font-bold text-bone-100">{{ dl(`data.shipments.${activeShipment.trackingCode}.duration`, activeShipment.durationEstimate) }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('tracker.durationLabel') }}</p>
              </div>
              <div>
                <p class="font-display text-sm font-bold text-bone-100">{{ dl(`data.shipments.${activeShipment.trackingCode}.cargoType`, activeShipment.cargoType) }}</p>
                <p class="mt-1 text-[0.6rem] uppercase tracking-widest2 text-steel-300">{{ t('tracker.cargoLabel') }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <div class="lg:col-span-7">
          <div v-if="!activeShipment" class="flex h-full min-h-[280px] items-center justify-center border border-dashed border-white/10 text-center">
            <p class="max-w-xs text-sm text-steel-400">{{ t('tracker.emptyState') }}</p>
          </div>

          <div v-else ref="timelineEl" class="space-y-0">
            <div
              v-for="stop in activeShipment.stops"
              :key="stop.location"
              class="timeline-item relative flex gap-5 border-l border-white/10 pb-10 pl-6 last:pb-0"
            >
              <span
                class="absolute -left-[5px] top-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                :class="{
                  'bg-bone-100': stop.state === 'done',
                  'bg-rust-500 ring-4 ring-rust-500/25': stop.state === 'active',
                  'border border-steel-500 bg-transparent': stop.state === 'pending',
                }"
              />
              <div>
                <p class="font-display text-lg font-bold uppercase text-bone-100">{{ tp(stop.location) }}</p>
                <p
                  class="mt-1 text-xs uppercase tracking-widest2"
                  :class="stop.state === 'active' ? 'text-rust-400' : 'text-steel-400'"
                >
                  {{ dl(`data.stopStatus.${stop.status}`, stop.status) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
