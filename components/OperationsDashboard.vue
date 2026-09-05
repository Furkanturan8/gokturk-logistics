<script setup lang="ts">
import { operationsStatistics, liveShipments } from '~/data/statistics'
import type { LiveShipmentStatus } from '~/types/logistics'

const { t, tp, locale } = useLocalizedData()

const headlineEl = ref<HTMLElement | null>(null)
const { reveal } = useRevealText()
const { fadeIn } = useScrollFade()

const statRefs = operationsStatistics.map(() => ref<HTMLElement | null>(null))
const counters = operationsStatistics.map((stat, i) => useCountUp(statRefs[i], stat.value, { duration: 1.8 }))

const statusClass: Record<LiveShipmentStatus, string> = {
  transit: 'text-bone-300 border-white/15',
  sinirda: 'text-rust-400 border-rust-500/40',
  teslim: 'text-steel-400 border-white/10',
}

onMounted(() => {
  if (headlineEl.value) reveal(headlineEl.value, { type: 'lines' })
  fadeIn(document.querySelectorAll('.ops-fade'), { y: 24 })
})
</script>

<template>
  <section class="relative bg-ink-900 py-28 md:py-36">
    <div class="section-pad container-edge">
      <div class="ops-fade mb-14 max-w-2xl">
        <p class="eyebrow mb-6">{{ t('ops.eyebrow') }}</p>
        <h2 :key="locale" ref="headlineEl" class="font-display text-display-2 font-extrabold uppercase text-bone-100">
          {{ t('ops.headline1') }}<br>{{ t('ops.headline2') }}
        </h2>
      </div>

      <div class="ops-fade grid gap-8 lg:grid-cols-12">
        <div class="grid grid-cols-2 gap-6 lg:col-span-5 lg:grid-cols-2">
          <div
            v-for="(stat, i) in operationsStatistics"
            :key="stat.key"
            class="border border-white/10 bg-ink-800/40 p-6"
          >
            <p :ref="(el) => { statRefs[i].value = el as HTMLElement | null }" class="font-display text-4xl font-black text-bone-100 num-tabular md:text-5xl">
              {{ counters[i].display.value }}
            </p>
            <p class="mt-2 text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t(`ops.stats.${stat.key}`) }}</p>
          </div>
        </div>

        <div class="border border-white/10 bg-ink-800/40 p-6 lg:col-span-7 md:p-8">
          <div class="mb-5 flex items-center justify-between">
            <p class="text-[0.62rem] uppercase tracking-widest2 text-steel-300">{{ t('ops.liveFleet') }}</p>
            <span class="flex items-center gap-2 text-[0.62rem] uppercase tracking-widest2 text-rust-400">
              <span class="h-1.5 w-1.5 rounded-full bg-rust-500 animate-pulse" /> {{ t('ops.live') }}
            </span>
          </div>

          <ul class="divide-y divide-white/10">
            <li v-for="shipment in liveShipments" :key="shipment.code" class="flex items-center justify-between gap-4 py-4">
              <div class="min-w-0">
                <p class="font-display text-sm font-bold text-bone-100">{{ shipment.code }}</p>
                <p class="mt-1 truncate text-xs text-steel-400">{{ tp(shipment.from) }} → {{ tp(shipment.to) }}</p>
              </div>

              <div class="hidden flex-1 items-center gap-3 sm:flex">
                <div class="h-px flex-1 bg-white/10">
                  <div class="h-px bg-rust-500" :style="{ width: `${shipment.progress * 100}%` }" />
                </div>
              </div>

              <span
                class="shrink-0 whitespace-nowrap border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-widest2"
                :class="statusClass[shipment.status]"
              >
                {{ t(`ops.status.${shipment.status}`) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
